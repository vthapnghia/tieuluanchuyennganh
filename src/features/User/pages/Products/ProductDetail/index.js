/* eslint-disable jsx-a11y/img-redundant-alt */
import { Formik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../../components/Button";
import Input from "../../../../../components/Input";
import { getProduct, getProductById } from "../../Products/ProductSlice";
import "./ProductDetail.scss";
import { useRef } from "react";
import Icons from "../../../../../components/Icons";
import { addToCart, getAllCart } from "../../Cart/cartSlice";
import { useAuth } from "../../../../../until/hooks";
import PATH from "../../../../../contanst/path";
import { OPTION_GENDER } from "../../../../../contanst/global";
import ModalCommon from "../../../../../components/ModalCommon";
import moment from "moment";
import { avatar_default } from "../../../../../assets/img";
import { currencyFormatting } from "../../../../../contanst/common";

function ProductDetail() {
  const { userAuth } = useAuth();
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const products = useSelector((state) => state.product.productById?.product);
  const listProducts = useSelector((state) => state.product.products?.product);
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
  const [chooseImage, setChooseImage] = useState("");
  const [listSimilar, setListSimilar] = useState(listProducts);

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
        console.log(product);
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

  const handleBuyNow = useCallback(() => {
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

  const handleClickImage = (url, i) => {
    setChooseImage(url);
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (products) {
      setSizeArray(Object.entries(products?.size));
    }
  }, [products, products?.size]);

  useEffect(() => {
    if (products) {
      setChooseImage(products?.product_image[0]);
    }
  }, [products, products?.product_image]);

  useEffect(() => {
    if (products) {
      dispatch(getProduct({ page: 1, pageSize: 100 }));
    }
  }, [dispatch, products]);

  useEffect(() => {
    if (products) {
      let listTemp = listProducts?.filter((item) => {
        return item.brand === products.brand && item._id !== products._id;
      });
      setListSimilar(listTemp);
    }
  }, [listProducts, products, products?._id, products?.brand]);

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
          <div className="product row">
            <div className="img-slider col-md-6">
              <img src={chooseImage} alt="product-image" className="image-display" />
              <div className="image-product-list">
                {products?.product_image.map((image, i) => {
                  if (i !== 0) {
                    <div style={{ height: "100%", width: "10px" }}></div>;
                  }
                  return (
                    <img
                      key={i}
                      id={`image-product-${i}`}
                      src={image}
                      alt="First slide"
                      onClick={() => handleClickImage(image, i)}
                    />
                  );
                })}
              </div>
            </div>
            <div className="content-detail col-md-6">
              <div className=" brand">
                {t("brand")}&#58; <a href="">{products?.brand}</a>
              </div>
              <div className="mb-3 product-name">{products?.name}</div>
              <div className="d-flex align-items-center price">
                {products?.discount !== 0 ? (
                  <div className="have-discount">
                    <div
                      className="price-discount"
                      style={{ color: "red", fontSize: "20px" }}
                    >
                      {currencyFormatting(
                        (products?.price * (1 - products?.discount / 100)
                      ).toFixed(2))}
                    </div>
                    <div className="price-initial">
                      <span>{currencyFormatting(products?.price)}</span>
                      <div className="discount">
                        {" "}
                        {t("discount_label", { param: products?.discount })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="no-discount">
                    <span>{currencyFormatting(products?.price)}</span>
                  </div>
                )}
              </div>
              <div className="d-flex align-items-start mt-3 mb-3">
                <div style={{ minWidth: "max-content", marginRight: "20px" }}>
                  <b className="label">{t("description")}&#58;</b>
                </div>
                <div>{products?.description}</div>
              </div>

              <div className="d-flex align-items-start mt-3 mb-3">
                <div style={{ minWidth: "max-content", marginRight: "20px" }}>
                  <b className="label">{t("color")}&#58;</b>
                </div>
                <div>{products?.color}</div>
              </div>

              <div className="d-flex align-items-start mt-3 mb-3">
                <div style={{ minWidth: "max-content", marginRight: "20px" }}>
                  <b className="label">{t("gender")}&#58;</b>
                </div>
                <div>{getGender}</div>
              </div>

              <div className="d-flex align-items-start mt-3 mb-3">
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

              <div className="d-flex align-items-start w-100 mt-3 mb-3">
                <div style={{ minWidth: "max-content", marginRight: "20px" }}>
                  <b className="label">{t("quantity")}&#58;</b>
                </div>
                <div style={{ width: "200px" }}>
                  <Input
                    name="quantity"
                    type="number"
                    quantity={true}
                    max={quantityOfSize}
                    disabled={size ? false : true}
                    marginNone
                  />
                </div>
              </div>
              <div className="action">
                <Button className="red add-cart" onClick={checkAddToCart}>
                  {t("add_to_cart")}
                </Button>
                <Button className="outline buy-now" onClick={handleBuyNow}>
                  {t("buy_now")}
                </Button>
              </div>
            </div>
          </div>
          <div className="similar">
            <div className="similar-title">{t("similar")}</div>
            {listSimilar && listSimilar.length > 0 ? (
              <div className="similar-list">
                {listSimilar?.map((element, index) => {
                  return (
                    <div className="product-similar" key={index} onClick={() => navigate(PATH.PRODUCT.DETAIL_PRODUCT.replace(":id", element._id))}>
                      <img src={element.product_image[0]} alt="product-image" />
                      <div className="product-similar-price">
                        {currencyFormatting(element.price)}
                      </div>
                      <div className="product-similar-name">{element.name}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no-similar">{t("no-similar")}</div>
            )}
          </div>
          <div className="comment">
            {/* <div className="container"> */}
            <div className="rate-product">{t("rate_product")}</div>
            {rate && rate.length > 0 ? (
              <div className="list-comment">
                {rate?.map((rateItem, index) => {
                  return (
                    <div key={index} className="comment-item">
                      <div className="user-comment">
                        <div className="avatar">
                          <img
                            src={rateItem.user.avatar || avatar_default}
                            alt="img"
                          />
                        </div>
                        <div className="info">
                          <div className="user-name">{rateItem.user.name}</div>
                          <div className="date-comment">
                            {t("rate-at", {
                              param: moment(
                                new Date(rateItem.created_at)
                              ).format("DD-MM-YYYY"),
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="content-comment">
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
                            color={`${
                              rateItem.rate === 5 ? "#ffc700" : "#ccc"
                            }`}
                          />
                        </div>
                        <div className="made-purchase">
                          <Icons.Check color="#00AC55" />
                          <span>{t("made-purchase")}</span>
                        </div>
                        <div className="text-comment">
                          <span>{rateItem.comment}</span>
                        </div>
                        <div className="list-img-comment">
                          {rateItem.image.map((itemImg, index) => {
                            return (
                              <div key={index} className="img-item">
                                <img src={itemImg} alt="img" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no-comment">{t("no-comment")}</div>
            )}
            {/* </div> */}
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
