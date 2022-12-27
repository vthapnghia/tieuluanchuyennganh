import { Formik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../../components/Button";
import Input from "../../../../../components/Input";
import { getProductById } from "../../Products/ProductSlice";
import "./ProductDetail.scss";
import { useRef } from "react";
import Icons from "../../../../../components/Icons";
import { addToCart, getAllCart } from "../../Cart/cartSlice";
import { useAuth } from "../../../../../until/hooks";
import PATH from "../../../../../contanst/path";
import { OPTION_GENDER } from "../../../../../contanst/global";
import ModalCommon from "../../../../../components/ModalCommon";
import moment from "moment";

function ProductDetail() {
  const { userAuth } = useAuth();
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const products = useSelector((state) => state.product.productById?.product);
  const rate = useSelector((state) => state.product.productById?.ratings);
  const { t } = useTranslation();
  const [sizeArray, setSizeArray] = useState([]);
  const [quantityOfSize, setQuanlityOfSize] = useState(0);
  const [size, setSize] = useState(null);
  const formikRef = useRef();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [buyNow, setBuyNow] = useState(false);

  const handleSelect = useCallback((selectedIndex) => {
    setIndex(selectedIndex);
  }, []);

  const handleSize = useCallback((item) => {
    setMessage(null);
    setQuanlityOfSize(item[1]);
    setSize(item[0]);
  }, []);

  const handleAddToCart = useCallback(
    async (values) => {
      const data = { ...values };
      data.product_id = id;
      data.size = Number(size);
      if (buyNow) {
        const intoMoney =
          products?.price * (1 - products?.discount / 100) * values.quantity;
        const product = [
          `${id}_${size}_${values.quantity}_${
            products.price * (1 - products.discount / 100)
          }`,
        ];
        navigate(PATH.ORDER, {
          state: { intoMoney: intoMoney, product: product, fastBuy: true },
        });
      } else {
        await dispatch(addToCart(data)).then((res) => {
          if (res.payload.status === 201 || res.payload.status === 200) {
            setModalTitle(t("action_success", { param: t("add_to_cart") }));
            setShow(!show);
            dispatch(getAllCart());
          } else {
            setModalTitle(t("action_fail", { param: t("add_to_cart") }));
            setModalBody(t("try_again"));
            setShow(!show);
          }
        });
      }
    },
    [
      size,
      id,
      dispatch,
      show,
      t,
      buyNow,
      products?.price,
      products?.discount,
      navigate,
    ]
  );

  const checkAddToCart = useCallback(() => {
    if (!userAuth) {
      navigate(PATH.LOGIN);
    } else {
      if (!size) {
        setMessage(t("MS_09", { param: t("size") }));
      } else {
        setBuyNow(false);
        formikRef.current.submitForm();
      }
    }
  }, [size, t, navigate, userAuth]);

  const getGender = useMemo(() => {
    let gender = "";
    if (products?.gender) {
      gender = OPTION_GENDER.find((itemGender) => {
        return itemGender.value === products?.gender;
      });
    }
    return gender.label;
  }, [products?.gender]);

  const handlebuyNow = useCallback(() => {
    if (!userAuth) {
      navigate(PATH.LOGIN);
    } else {
      if (!size) {
        setMessage(t("MS_09", { param: t("size") }));
      } else {
        setBuyNow(true);
        formikRef.current.submitForm();
      }
    }
  }, [userAuth, size, t, navigate]);

  const handleClose = useCallback(() => {
    setShow(!show);
  }, [show]);

  const validationSchema = useMemo(() => {
    if (size) {
      return {
        quantity: Yup.number()
          .min(1, t("MS_06", { param: t("quantity"), min: 1 }))
          .max(
            quantityOfSize,
            t("MS_07", { param: "quantity", max: quantityOfSize })
          ),
      };
    }
  }, [size, quantityOfSize, t]);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (products?.size) {
      setSizeArray(Object.entries(products?.size));
    }
  }, [products?.size]);

  return (
    <>
      <Formik
        initialValues={{ quantity: 1 }}
        enableReinitialize
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleAddToCart}
        innerRef={formikRef}
      >
        <div className="product-detail">
          <div className="product p-5 d-flex justify-content-around">
            <div className="img-slider">
              <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                interval="2000"
                slide
              >
                {products?.product_image.map((image, i) => (
                  <Carousel.Item key={i}>
                    <img
                      className="d-block w-100"
                      src={image}
                      alt="First slide"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <div className="content-detail ml-2 w-50 d-flex flex-column">
              {products?.discount > 0 && (
                <div className="discount">
                  {" "}
                  {t("discount_label", { param: products?.discount })}
                </div>
              )}
              <h2>{products?.name}</h2>

              <div className="d-flex align-items-center mt-3 mb-3">
                <div
                  style={{
                    minWidth: "max-content",
                    marginRight: "20px",
                    fontSize: "20px",
                  }}
                >
                  <b className="label">{t("price")}&#58;</b>
                </div>
                {products?.discount !== 0 ? (
                  <>
                    <div className="price-initial">
                      {products?.price} &#8363;
                    </div>
                    <div
                      className="price-discount"
                      style={{ color: "red", fontSize: "20px" }}
                    >
                      {products?.price * (1 - products?.discount / 100)} &#8363;
                    </div>
                  </>
                ) : (
                  <b style={{ color: "red", fontSize: "20px" }}>
                    {products?.price} &#8363;
                  </b>
                )}
              </div>
              <div className="d-flex align-items-center mt-3 mb-3">
                <div style={{ minWidth: "max-content", marginRight: "20px" }}>
                  <b className="label">{t("description")}&#58;</b>
                </div>
                <div>{products?.description}</div>
              </div>

              <div className="d-flex align-items-center mt-3 mb-3">
                <div style={{ minWidth: "max-content", marginRight: "20px" }}>
                  <b className="label">{t("brand")}&#58;</b>
                </div>
                <div>{products?.brand}</div>
              </div>

              <div className="d-flex align-items-center mt-3 mb-3">
                <div style={{ minWidth: "max-content", marginRight: "20px" }}>
                  <b className="label">{t("color")}&#58;</b>
                </div>
                <div>{products?.color}</div>
              </div>

              <div className="d-flex align-items-center mt-3 mb-3">
                <div style={{ minWidth: "max-content", marginRight: "20px" }}>
                  <b className="label">{t("gender")}&#58;</b>
                </div>
                <div>{getGender}</div>
              </div>

              <div className="d-flex align-items-center w-100">
                <div style={{ minWidth: "max-content", marginRight: "10px" }}>
                  <b className="label">{t("size")}&#58;</b>
                </div>
                <div className="d-flex flex-wrap option-size">
                  {sizeArray?.map((item, index) => {
                    return (
                      <input
                        label={item[0]}
                        type="radio"
                        name="size"
                        key={index}
                        onClick={() => handleSize(item)}
                        disabled={item[1] === 0 ? true : false}
                      />
                    );
                  })}
                  {message && (
                    <div className="d-flex align-items-center warning-size">
                      <Icons.Exclamation />{" "}
                      <span className="tooltiptext">{message}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="d-flex align-items-center w-50 mr-5">
                <div style={{ minWidth: "max-content", marginRight: "20px" }}>
                  <b className="label">{t("quantity")}&#58;</b>
                </div>
                <Input
                  name="quantity"
                  type="number"
                  quantity={true}
                  max={quantityOfSize}
                  disabled={size ? false : true}
                />
              </div>
              <div className="action">
                <Button className="primary add-cart" onClick={checkAddToCart}>
                  {t("add_to_cart")}
                </Button>
                <Button className="primary buy-now" onClick={handlebuyNow}>
                  {t("buy_now")}
                </Button>
              </div>
            </div>
          </div>
          <div className="comment">
            <div className="container">
              <span className="rate-product">{t("rate_product")}</span>
              <div className="list-comment">
                {rate?.map((rateItem, index) => {
                  return (
                    <div key={index} className="comment-item">
                      <div className="header-comment">
                        <div className="avatar-comment">
                          <img src={rateItem.user.avatar} alt="img" />
                        </div>
                        <div className="user-comment">
                          <div className="user-name">
                            <span>{rateItem.user.name}</span>
                          </div>
                          <div className="date-comment">
                            <span>
                              {moment(new Date(rateItem.created_at)).format(
                                "DD-MM-YYYY"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="star-comment">
                        <Icons.Star
                          color={`${rateItem.rate >= 1 ? "#ffc700" : "#ccc"}`}
                        />
                        <Icons.Star
                          color={`${rateItem.rate >= 2 ? "#ffc700" : "#ccc"}`}
                        />
                        <Icons.Star
                          color={`${rateItem.rate >= 3 ? "#ffc700" : "#ccc"}`}
                        />
                        <Icons.Star
                          color={`${rateItem.rate >= 4 ? "#ffc700" : "#ccc"}`}
                        />
                        <Icons.Star
                          color={`${rateItem.rate === 5 ? "#ffc700" : "#ccc"}`}
                        />
                      </div>
                      <div className="text-commnet">
                        <span>{rateItem.comment}</span>
                      </div>
                      <div className="list-img-commnet">
                        {rateItem.image.map((itemImg, index) => {
                          return (
                            <div key={index} className="img-item">
                              <img src={itemImg} alt="img" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <ModalCommon
            show={show}
            modalTitle={modalTitle}
            modalBody={modalBody}
            handleConfirm={handleClose}
            isButton
          />
        </div>
      </Formik>
    </>
  );
}

export default ProductDetail;
