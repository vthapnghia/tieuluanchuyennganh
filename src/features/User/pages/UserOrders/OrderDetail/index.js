import { t } from "i18next";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Icons from "../../../../../components/Icons";
import { cancelOrder, getOrderById, removeUserOrder } from "../UserOrderSlice";
import "./OrderDetail.scss";
import ModalCommon from "../../../../../components/ModalCommon";
import Input from "../../../../../components/Input";
import { Formik } from "formik";
import Rate from "../../../../../components/Rate";
import {
  createRate,
  getRate,
  updateRate,
} from "../../Products/ProductDetail/RateSlice";
import {
  getAllShip,
  removeStateShip,
} from "../../../../Admin/pages/ManagementShip/ShipSlice";
import moment from "moment";
import PATH from "../../../../../constants/path";
import Button from "../../../../../components/Button";
import { currencyFormatting } from "../../../../../until/common";
import { Container, Grid } from "@mui/material";
import { getProduct } from "../../Products/ProductSlice";
import ProductItem from "../../Products/ProductItem";
import { getAllFavorites } from "../../Products/ProductItem/FavoriteSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import { cancel } from "../../../../../assets/img";

function OrderDetail(params) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderById = useSelector((state) => state.userOrder.orderById);
  const products = useSelector((state) => state.product.products?.product);
  const ship = useSelector((state) => state.ship.allShip?.ships);
  const [idProduct, setIdProduct] = useState();
  const [idOrderDetail, setIdOrderDetail] = useState();
  const [rate, setRate] = useState(1);
  const [show, setShow] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [modalTitleMessage, setModalTitleMessage] = useState(null);
  const [modalBodyMessage, setModalBodyMessage] = useState(null);
  const [modalBodyRate, setBodyModalRate] = useState(null);
  const [editFlag, setEditFlag] = useState(false);
  const [methodShip, setMethodShip] = useState();
  const formikRef = useRef();
  const favorites = useSelector((state) => state.favorite.favorites);
  const navigate = useNavigate();

  const totalItemProduct = useCallback((quantity, price, discount) => {
    return quantity * (price * (1 - discount / 100));
  }, []);

  const handleClickProduct = useCallback(
    (e, idProduct, idOrderDetail) => {
      e.stopPropagation();
      setIdProduct(idProduct);
      setIdOrderDetail(idOrderDetail);
      setShow(!show);
    },
    [show]
  );

  const handleGetRate = useCallback(
    (rate) => () => {
      setRate(rate);
    },
    []
  );

  const isLike = (id) => {
    const check = favorites.find((item) => {
      return item._id === id;
    });
    if (check) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    dispatch(getAllFavorites());
  }, [dispatch]);

  const modalBody = useMemo(() => {
    return (
      <div>
        <div>
          <div id="images"></div>
          <Input
            name="image"
            type="file"
            multiple
            textLabel={t("upload_img")}
          />
        </div>
        <div>
          <Input name="comment" type="textarea" placeholder={t("comment")} />
        </div>
        <div>
          <Rate handleGetRate={handleGetRate} />
        </div>
      </div>
    );
  }, [handleGetRate]);

  const handleSubmitRate = useCallback(
    async (values) => {
      setShow(!show);
      const { image, comment } = values;
      const formData = new FormData();
      formData.append("product_id", idProduct);
      formData.append("rate", rate);
      formData.append("comment", comment);
      formData.append("order_detail_id", idOrderDetail);
      const files = Object.values(image);
      files.forEach((elmennt) => {
        formData.append("image", elmennt);
      });
      if (editFlag) {
        await dispatch(updateRate(formData)).then((res) => {
          if (res.payload.status === 200) {
            setModalTitleMessage(
              t("action_success", { param: t("update_rate") })
            );
            setModalBodyMessage(null);
            setShowMessage(!showMessage);
          } else {
            setModalTitleMessage(t("action_fail", { param: t("update_rate") }));
            setModalBodyMessage(t("try_again"));
            setShowMessage(!showMessage);
          }
        });
      } else {
        await dispatch(createRate(formData)).then((res) => {
          if (res.payload.status === 200) {
            setModalTitleMessage(
              t("action_success", { param: t("rate_product") })
            );
            setModalBodyMessage(null);
            setShowMessage(!showMessage);
          } else {
            setModalTitleMessage(
              t("action_fail", { param: t("rate_product") })
            );
            setModalBodyMessage(t("try_again"));
            setShowMessage(!showMessage);
          }
        });
      }
    },
    [dispatch, idProduct, rate, show, showMessage, idOrderDetail, editFlag]
  );

  const handleConfirm = useCallback(() => {
    setShowMessage(!showMessage);
    dispatch(getOrderById(id));
    formikRef.current.resetForm();
  }, [showMessage, dispatch, id]);

  const borderColorRate = useMemo(() => {
    let borderColor = "#ccc";
    const findNoRate = orderById?.orderDetail.find((itemDetail) => {
      return itemDetail.status === 1;
    });
    if (orderById?.order.status === 3 && !findNoRate) {
      borderColor = "#2dc258";
    }
    return borderColor;
  }, [orderById?.order.status, orderById?.orderDetail]);

  const modalBodyViewRate = useCallback((rateItem) => {
    return (
      <div>
        <div>
          <div id="images">
            <div className="display-img">
              {rateItem &&
                rateItem?.image?.map((img, index) => {
                  return (
                    <figure key={index}>
                      <img src={img} alt="img" />
                    </figure>
                  );
                })}
            </div>
          </div>
        </div>
        <div style={{ margin: "10px 5px" }}>
          <span>{rateItem.comment}</span>
        </div>
        <div className="d-flex" style={{ margin: "0 5px" }}>
          <Icons.Star color={`${rateItem.rate >= 1 ? "#ffc700" : "#ccc"}`} />
          <Icons.Star color={`${rateItem.rate >= 2 ? "#ffc700" : "#ccc"}`} />
          <Icons.Star color={`${rateItem.rate >= 3 ? "#ffc700" : "#ccc"}`} />
          <Icons.Star color={`${rateItem.rate >= 4 ? "#ffc700" : "#ccc"}`} />
          <Icons.Star color={`${rateItem.rate === 5 ? "#ffc700" : "#ccc"}`} />
        </div>
      </div>
    );
  }, []);

  const handleViewRate = useCallback(
    async (orderDetailId, productId) => {
      await dispatch(getRate({ orderDetailId, productId })).then((res) => {
        if (res.payload.status === 200) {
          const response = res.payload.data?.ratings;
          setIdProduct(productId);
          setIdOrderDetail(orderDetailId);
          setBodyModalRate(modalBodyViewRate(response));
          setShowRate(!showRate);
        }
      });
    },
    [dispatch, showRate, modalBodyViewRate]
  );

  const handleConfirmEditRate = useCallback(() => {
    setShowRate(!showRate);
    setEditFlag(!editFlag);
    setShow(!show);
  }, [showRate, show, editFlag]);

  const handelPriceTemporary = useMemo(() => {
    let total = 0;
    if (orderById?.orderDetail.length > 0) {
      orderById.orderDetail.forEach((item) => {
        total = total + item.quantity * item.product.price;
      });
    }
    return total;
  }, [orderById?.orderDetail]);

  const handleRepurchase = useCallback(
    (e, order) => {
      e.stopPropagation();
      navigate(PATH.ORDER, {
        state: { listPurchase: [order], fastBuy: true },
      });
    },
    [navigate]
  );

  const handleCancelOrder = async () => {
    await dispatch(cancelOrder(id)).then(async (res) => {
      if (res?.payload?.status === 200) {
        await dispatch(getOrderById(id));
      }
    });
  };

  useEffect(() => {
    dispatch(getAllShip());
    dispatch(getOrderById(id));
    dispatch(getProduct({ page: 1, pageSize: 6 }));

    return () => {
      dispatch(removeUserOrder());
      dispatch(removeStateShip());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (orderById && ship) {
      const findShip = ship.find(
        (item) => item._id === orderById.order.ship_id
      );
      if (findShip) {
        setMethodShip(findShip);
      }
    }
  }, [orderById, orderById?.order.ship_id, ship]);

  return (
    <Formik
      initialValues={{ image: "", comment: "" }}
      validationSchema={Yup.object({
        comment: Yup.string().required(t("MS_01", { param: t("comment") })),
      })}
      enableReinitialize
      innerRef={formikRef}
      onSubmit={handleSubmitRate}
    >
      <div id="user-order-detail">
        <Container maxWidth="lg">
          <div className="status">
            {orderById?.order.status !== 500 ? (
              <>
                <div className="status-item">
                  <div
                    className="status-icon"
                    style={{
                      borderColor: `${
                        orderById?.order.status >= 1 ? "#2dc258" : "#ccc"
                      }`,
                    }}
                  >
                    <Icons.Receipt
                      height="40"
                      width="40"
                      color={orderById?.order.status >= 1 ? "#2dc258" : "#ccc"}
                    />
                  </div>
                  <div
                    className="status-line"
                    style={{
                      background: `${
                        orderById?.order.status >= 1 ? "#2dc258" : "#ccc"
                      }`,
                    }}
                  ></div>
                  <div
                    className="status-label"
                    style={{
                      color: `${
                        orderById?.order.status >= 1 ? "#2dc258" : "#ccc"
                      }`,
                    }}
                  >
                    {t("in_order")}
                  </div>
                </div>
                <div className="status-item">
                  <div
                    className="status-icon"
                    style={{
                      borderColor: `${
                        orderById?.order.status >= 2 ? "#2dc258" : "#ccc"
                      }`,
                    }}
                  >
                    <Icons.TruckFull
                      height="40"
                      width="40"
                      color={orderById?.order.status >= 2 ? "#2dc258" : "#ccc"}
                    />
                  </div>
                  <div
                    className="status-line"
                    style={{
                      background: `${
                        orderById?.order.status >= 2 ? "#2dc258" : "#ccc"
                      }`,
                    }}
                  ></div>
                  <div
                    className="status-label"
                    style={{
                      color: `${
                        orderById?.order.status >= 2 ? "#2dc258" : "#ccc"
                      }`,
                    }}
                  >
                    {t("in_ship")}
                  </div>
                </div>
                <div className="status-item">
                  <div
                    className="status-icon"
                    style={{
                      borderColor: `${
                        orderById?.order.status >= 3 ? "#2dc258" : "#ccc"
                      }`,
                    }}
                  >
                    <Icons.BoxOpen
                      height="40"
                      width="40"
                      color={orderById?.order.status >= 3 ? "#2dc258" : "#ccc"}
                    />
                  </div>
                  <div
                    className="status-line"
                    style={{
                      background: `${
                        orderById?.order.status >= 3 ? "#2dc258" : "#ccc"
                      }`,
                    }}
                  ></div>
                  <div
                    className="status-label"
                    style={{
                      color: `${
                        orderById?.order.status >= 3 ? "#2dc258" : "#ccc"
                      }`,
                    }}
                  >
                    {t("complete")}
                  </div>
                </div>
                <div className="status-item status-item-end">
                  <div
                    className="status-icon"
                    style={{
                      borderColor: borderColorRate,
                    }}
                  >
                    <Icons.Star
                      height="40"
                      width="40"
                      color={borderColorRate}
                    />
                  </div>
                  <div
                    className="status-label"
                    style={{
                      color: borderColorRate,
                    }}
                  >
                    {t("rate")}
                  </div>
                </div>
              </>
            ) : (
              <div className="status-item-cancel">
                <img className="img-cancel" src={cancel} alt="" />
                <div
                  className="status-label"
                >
                  Đơn hàng đã hủy
                </div>
              </div>
            )}
          </div>
          <div className="info-detail row">
            <div className="address col-sm-12 col-md-4">
              <div className="title">{t("address_user_receive")}</div>
              <div className="content">
                <span className="name">{orderById?.order.receiver_name}</span>
                <span>
                  {t("address_receive", { param: orderById?.order.location })}
                </span>
                <span>
                  {t("phone_receive", {
                    param: orderById?.order.receiver_phone,
                  })}
                </span>
              </div>
            </div>
            <div className="shipment col-sm-12 col-md-4">
              <div className="title">{t("method_ship")}</div>
              <div className="content">
                <span className="name">{methodShip?.type}</span>
                <span className="description">
                  {t("delivery_at", {
                    param: moment(orderById?.order.created_at)
                      .add(5, "days")
                      .format("DD-MM-YYYY"),
                  })}
                </span>
                <span className="price">
                  {`${t("ship_fee")}: ${currencyFormatting(methodShip?.price)}`}
                </span>
              </div>
            </div>
            <div className="payment col-sm-12 col-md-4">
              <div className="title">{t("method_pay")}</div>
              <div className="content">
                <span>
                  {orderById?.order.payment_method === 1
                    ? t("pay_cash")
                    : t("pay_banking")}
                </span>
                {orderById?.order.payment_method === 1 && (
                  <span className="pay-success">{t("pay_success")}</span>
                )}
              </div>
            </div>
          </div>
          <div className="order-product">
            <div className="header row">
              <div className="col-md-5 text-center">{t("product")}</div>
              <div className="col-md-2 text-center">{t("price")}</div>
              <div className="col-md-1 text-center">{t("quantity")}</div>
              <div className="col-md-2 text-center">{t("discount")}</div>
              <div className="col-md-2 text-center">{t("temporary_fee")}</div>
            </div>
            {orderById?.orderDetail.length > 0 &&
              orderById.orderDetail.map((itemDetail, index) => {
                return (
                  <div
                    className="row m-0 order-item"
                    onClick={() =>
                      navigate(
                        PATH.PRODUCT.DETAIL_PRODUCT.replace(
                          ":id",
                          itemDetail.product._id
                        )
                      )
                    }
                    key={index}
                  >
                    <div className="row product-item-order">
                      <div className="col col-md-5 d-flex align-items-center justify-content-between">
                        <img
                          src={itemDetail.product.product_image[0]}
                          alt="img"
                          className="img-product"
                        />
                        <div className="name-product">
                          {itemDetail.product.name}
                        </div>
                      </div>
                      <div className="col col-md-2 price text-center">
                        {currencyFormatting(itemDetail.product.price)}
                      </div>
                      <div className="col col-md-1 quantity text-center">
                        {itemDetail.quantity}
                      </div>
                      <div className="col col-md-2 discount text-center">
                        <span>
                          {currencyFormatting(
                            itemDetail.product.price *
                              (itemDetail.product.discount / 100)
                          )}
                        </span>
                      </div>
                      <div className="col col-md-2 total-temporary text-center">
                        <span>
                          {currencyFormatting(
                            totalItemProduct(
                              itemDetail.quantity,
                              itemDetail.product.price,
                              itemDetail.product.discount
                            )
                          )}
                        </span>
                      </div>
                    </div>
                    <div
                      className="row m-0"
                      style={{
                        borderBottom: "1px solid #f2f2f2",
                        display: "inline-block",
                      }}
                    >
                      {orderById?.order.status === 3 &&
                        itemDetail.status === 1 && (
                          <>
                            <div className="btn-rate">
                              <Button
                                className="outline"
                                onClick={(e) =>
                                  handleClickProduct(
                                    e,
                                    itemDetail.product._id,
                                    itemDetail.id
                                  )
                                }
                              >
                                {t("rate")}
                              </Button>
                              <Button
                                className="outline"
                                onClick={(e) => handleRepurchase(e, itemDetail)}
                              >
                                {t("repurchase")}
                              </Button>
                            </div>
                          </>
                        )}

                      {orderById?.order.status === 3 &&
                        itemDetail.status === 2 && (
                          <>
                            <div className="btn-rate">
                              <Button
                                className="outline"
                                onClick={(e) =>
                                  handleViewRate(
                                    itemDetail.id,
                                    itemDetail.product._id
                                  )
                                }
                              >
                                {t("view_rate")}
                              </Button>
                              <Button
                                className="outline"
                                onClick={(e) => handleRepurchase(e, itemDetail)}
                              >
                                {t("repurchase")}
                              </Button>
                            </div>
                          </>
                        )}
                    </div>
                  </div>
                );
              })}
            <div className="pay-money">
              <div className="price-temporary row">
                <span className="col-md-10">
                  {t("fee_temporary", { param: "" })}
                </span>
                <span className="col-md-2">
                  {currencyFormatting(handelPriceTemporary)}
                </span>
              </div>
              <div className="price-ship row">
                <span className="col-md-10">
                  {t("ship_fee", { param: "" })}
                </span>
                <span className="col-md-2">
                  {currencyFormatting(methodShip?.price ? methodShip.price : 0)}
                </span>
              </div>
              <div className="price-total row">
                <span className="col-md-10">{t("total", { param: "" })}</span>
                <span className="col-md-2">
                  {currencyFormatting(
                    handelPriceTemporary +
                      (methodShip?.price ? methodShip.price : 0)
                  )}
                </span>
              </div>
              {orderById?.order.status === 1 && (
                <div className="cancel-oreder">
                  <Button className="red" onClick={handleCancelOrder}>
                    Hủy đơn hàng
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            Sản phẩm
          </div>
          <Grid container columnSpacing={2}>
            {products?.map((itemProduct) => {
              return (
                <Grid item xs={3} key={itemProduct._id}>
                  <ProductItem
                    product={itemProduct}
                    isLike={isLike(itemProduct._id)}
                  />
                </Grid>
              );
            })}
          </Grid>
          <div className="view-add-product">
            <Button
              className="red"
              onClick={() => navigate(PATH.PRODUCT.LIST_PRODUCT)}
            >
              {t("add_view")}
            </Button>
          </div>
          <ModalCommon
            className="modal-rate"
            show={show}
            modalTitle={t("rate_product")}
            modalBody={modalBody}
            handleConfirm={() => formikRef.current.submitForm()}
            handleCloseModal={() => setShow(!show)}
            isButton
          />
          <ModalCommon
            className="modal-rate"
            show={showRate}
            modalTitle={t("view_rate")}
            modalBody={modalBodyRate}
            handleConfirm={handleConfirmEditRate}
            handleCloseModal={() => setShowRate(!showRate)}
            isButton
            labelButton={t("edit")}
          />
          <ModalCommon
            show={showMessage}
            modalTitle={modalTitleMessage}
            modalBody={modalBodyMessage}
            handleConfirm={handleConfirm}
            handleCloseModal={() => setShowMessage(!showMessage)}
            isButton
          />
        </Container>
      </div>
    </Formik>
  );
}

export default OrderDetail;
