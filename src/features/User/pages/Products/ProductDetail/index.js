import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../../components/Button";
import {
  getProduct,
  getProductById,
  removeStateProduct,
} from "../../Products/ProductSlice";
import "./ProductDetail.scss";
import { useRef } from "react";
import Icons from "../../../../../components/Icons";
import { addToCart, getAllCart } from "../../Cart/cartSlice";
import { useAuth } from "../../../../../until/hooks";
import PATH from "../../../../../constants/path";
import { COLOR, OPTION_GENDER } from "../../../../../constants/global";
import ModalCommon from "../../../../../components/ModalCommon";
import moment from "moment";
import { avatar_default } from "../../../../../assets/img";
import { currencyFormatting } from "../../../../../until/common";
import { Container } from "@mui/material";

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
  const [quantityOfSize, setQuantityOfSize] = useState(0);
  const [size, setSize] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [chooseImage, setChooseImage] = useState("");
  const [listSimilar, setListSimilar] = useState(listProducts);
  const [minusDisabled, setMinusDisabled] = useState(false);
  const [plusDisabled, setPlusDisabled] = useState(false);
  const ref = useRef();

  const handleSize = useCallback((item) => {
    setMessage(null);
    setQuantityOfSize(item[1]);
    setSize(item[0]);
  }, []);

  const checkAddToCart = useCallback(async () => {
    if (!userAuth) {
      navigate(PATH.LOGIN);
    } else {
      if (!size) {
        setMessage(t("MS_09", { param: t("size") }));
      } else {
        const data = {
          product_id: id,
          size: Number(size),
          quantity: ref?.current?.value,
        };

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
    }
  }, [userAuth, navigate, size, t, id, dispatch, show]);

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
        const purchase = {
          product: products,
          quantity: ref?.current?.value,
          size: Number(size),
        };
        navigate(PATH.ORDER, {
          state: { listPurchase: [purchase], fastBuy: true },
        });
      }
    }
  }, [userAuth, navigate, size, t, products]);

  const handleClose = useCallback(() => {
    setShow(!show);
  }, [show]);

  const handleClickImage = (url, i) => {
    setIndex(i);
    setChooseImage(url);
  };

  const handleQuantity = useCallback(
    (e, option) => {
      e.stopPropagation();
      if (option === -1) {
        if (Number(ref?.current?.value) - 1 >= 1) {
          let value = ref?.current?.value - 1;
          ref.current.value = value;
        }
      } else {
        if (Number(ref?.current?.value) + 1 <= quantityOfSize) {
          let value = Number(ref?.current?.value) + 1;
          ref.current.value = value;
        }
      }
    },
    [quantityOfSize]
  );

  useEffect(() => {
    dispatch(getProductById(id));

    return () => {
      dispatch(removeStateProduct());
    };
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
    dispatch(getProduct({ page: 1, pageSize: 100 }));
  }, [dispatch]);

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
      <div id="product-detail">
        <Container maxWidth="lg">
          <div className="product row">
            <div className="img-slider col-md-12 col-lg-6">
              <img src={chooseImage} alt="product" className="image-display" />
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
                      className={index === i ? "image-choose" : ""}
                      onClick={() => handleClickImage(image, i)}
                    />
                  );
                })}
              </div>
            </div>
            <div className="content-detail col-md-12 col-lg-6">
              <div className="brand">
                {t("brand")}&#58; <p>{products?.brand}</p>
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
                        (
                          products?.price *
                          (1 - products?.discount / 100)
                        ).toFixed(2)
                      )}
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
              <div className="d-flex align-items-start mt-4">
                <div style={{ minWidth: "max-content", marginRight: "20px" }}>
                  <b className="label">{t("description")}&#58;</b>
                </div>
                <div>{products?.description}</div>
              </div>

              <div className="d-flex align-items-start mt-4">
                <div style={{ minWidth: "max-content", marginRight: "20px" }}>
                  <b className="label">{t("color")}&#58;</b>
                </div>
                <div>{products?.color}</div>
              </div>

              <div className="d-flex align-items-start mt-4">
                <div style={{ minWidth: "max-content", marginRight: "20px" }}>
                  <b className="label">{t("gender")}&#58;</b>
                </div>
                <div>{getGender}</div>
              </div>

              <div className="d-flex align-items-start mt-4">
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

              <div className="d-flex align-items-start mt-4">
                <div style={{ minWidth: "max-content", marginRight: "20px" }}>
                  <b className="label">{t("quantity")}&#58;</b>
                </div>

                <div className="d-flex quantity">
                  <button
                    className="minus"
                    onClick={(e) => handleQuantity(e, -1)}
                  >
                    <Icons.Minus color={minusDisabled ? COLOR.GRAY : ""} />
                  </button>
                  <input
                    ref={ref}
                    type="text"
                    disabled
                    value={1}
                    className="w-100 text-center"
                  />
                  <button
                    className="plus"
                    onClick={(e) => handleQuantity(e, 1)}
                  >
                    <Icons.Plus color={plusDisabled ? COLOR.GRAY : ""} />
                  </button>
                </div>
              </div>
              <div className="action row">
                <div className="col-6 col-sm-6 col-lg-6">
                  <Button className="red add-cart " onClick={checkAddToCart}>
                    {t("add_to_cart")}
                  </Button>
                </div>
                <div className="col-6 col-sm-6 col-lg-6">
                  <Button className="outline buy-now " onClick={handleBuyNow}>
                    {t("buy_now")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="similar">
            <div className="similar-title">{t("similar")}</div>
            {listSimilar && listSimilar.length > 0 ? (
              <div className="similar-list">
                {listSimilar?.map((element, index) => {
                  return (
                    <div
                      className="product-similar"
                      key={index}
                      onClick={() =>
                        navigate(
                          PATH.PRODUCT.DETAIL_PRODUCT.replace(
                            ":id",
                            element._id
                          )
                        )
                      }
                    >
                      <img src={element.product_image[0]} alt="product" />
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
            <div className="rate-product">{t("rate_product")}</div>
            {rate && rate.length > 0 ? (
              <div className="list-comment">
                {rate?.map((rateItem, index) => {
                  return (
                    <div key={index} className="comment-item row m-0">
                      <div className="user-comment col-lg-4">
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
                      <div className="content-comment col-lg-8">
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
                          <span>{rateItem?.comment}</span>
                        </div>
                        <div className="list-img-comment">
                          {rateItem?.image?.map((itemImg, index) => {
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
          </div>
          <ModalCommon
            show={show}
            modalTitle={modalTitle}
            modalBody={modalBody}
            handleConfirm={handleClose}
            isButton
          />{" "}
        </Container>
      </div>
    </>
  );
}

export default ProductDetail;
