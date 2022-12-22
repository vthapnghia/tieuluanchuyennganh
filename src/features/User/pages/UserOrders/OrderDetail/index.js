import { t } from "i18next";
import moment from "moment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import Icons from "../../../../../components/Icons";
import { getOrderById } from "../UserOrderSlice";
import "./OrderDetail.scss";
import ModalCommon from "../../../../../components/ModalCommon";
import Input from "../../../../../components/Input";
import { Formik } from "formik";
import Rate from "../../../../../components/Rate";
import { createRate } from "../../Products/ProductDetail/RateSlice";

function OrderDetail(params) {
  const location = useLocation();
  const dispatch = useDispatch();
  const orderById = useSelector((state) => state.userOrder.orderById);
  const [idProduct, setIdProduct] = useState();
  const [idOrderDetail, setIdOrderDetail] = useState();
  const [rate, setRate] = useState(1);
  const [show, setShow] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [modalTitleMessage, setTitleModalessage] = useState(null);
  const [modalBodyMessage, setBodyModalMessage] = useState(null);
  const formikRef = useRef();

  const getHeaderByStatus = useCallback((orderStatus) => {
    let status = "";
    switch (orderStatus) {
      case 1:
        status = t("in_order");
        break;
      case 2:
        status = t("in_ship");
        break;
      default:
        status = t("complete");
        break;
    }
    return status;
  }, []);

  const totalItemProduct = useCallback((quantity, price, discount) => {
    return quantity * (price * (1 - discount / 100));
  }, []);

  const handleClickProduct = useCallback(
    (idProduct, idOrderDetail) => {
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
      await dispatch(createRate(formData)).then((res) => {
        if (res.payload.status === 200) {
          setTitleModalessage(t("action_success", { param: t("comment") }));
          setBodyModalMessage(null);
          setShowMessage(!showMessage);
        } else {
          setTitleModalessage(t("action_fail", { param: t("comment") }));
          setBodyModalMessage(t("try_again"));
          setShowMessage(!showMessage);
        }
      });
    },
    [dispatch, idProduct, rate, show, showMessage, idOrderDetail]
  );

  const handleConfirm = useCallback(() => {
    setShowMessage(!showMessage);
    dispatch(getOrderById(location.state.id));
  }, [showMessage, dispatch, location.state.id]);

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

  useEffect(() => {
    dispatch(getOrderById(location.state.id));
  }, [dispatch, location.state.id]);

  useEffect(() => {
    console.log(orderById);
  }, [orderById]);

  return (
    <Formik
      initialValues={{ image: "", comment: "" }}
      validationSchema={Yup.object({
        image: Yup.mixed().test(
          "file",
          t("MS_01", { param: "file" }),
          (value) => {
            if (!value) {
              return false;
            }
            return true;
          }
        ),
        comment: Yup.string().required(t("MS_01", { param: t("comment") })),
      })}
      enableReinitialize
      innerRef={formikRef}
      onSubmit={handleSubmitRate}
    >
      <div className="user-order-detail">
        <div className="container">
          <div className="header">
            <div>{`${t("status")}: ${getHeaderByStatus(
              orderById?.order.status
            )}`}</div>
            <div>{`${t("date_order", {
              param: moment(new Date(orderById?.order.created_at)).format(
                "DD-MM-YYYY"
              ),
            })}`}</div>
          </div>
          <div className="address-receiver">
            <span>{`${t("address_receiver")}: `}</span>
            <span>{`${orderById?.order.receiver_name}, ${orderById?.order.receiver_phone}, ${orderById?.order.location}`}</span>
          </div>
          <div className="total-order">
            <span>{`${t("total_order")}: `}</span>
            <span>{orderById?.order.total}&#8363;</span>
          </div>
          <div className="status">
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
                  color: `${orderById?.order.status >= 1 ? "#2dc258" : "#ccc"}`,
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
                  color: `${orderById?.order.status >= 2 ? "#2dc258" : "#ccc"}`,
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
                  color: `${orderById?.order.status >= 3 ? "#2dc258" : "#ccc"}`,
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
                <Icons.Star height="40" width="40" color={borderColorRate} />
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
          </div>
          <div className="order-product">
            {orderById?.orderDetail.map((itemDetail, index) => {
              return (
                <div className="row product-item" key={index}>
                  <div className="col col-md-2 img-product">
                    <img src={itemDetail.product.product_image[0]} alt="img" />
                  </div>
                  <div className="col col-md-5name-product">
                    <span>{itemDetail.product.name}</span>
                  </div>
                  <div
                    className={`col ${
                      orderById?.order.status === 3 && itemDetail.status === 1
                        ? "col-md-1"
                        : "col-md-2"
                    } "quantity"`}
                  >
                    <span>{itemDetail.quantity}</span>
                  </div>
                  <div className="col col-md-2 total">
                    <span>
                      {totalItemProduct(
                        itemDetail.quantity,
                        itemDetail.product.price,
                        itemDetail.product.discount
                      )}
                      &#8363;
                    </span>
                  </div>
                  {orderById?.order.status === 3 && itemDetail.status === 1 && (
                    <div
                      className="col col-md-2 btn-rate"
                      onClick={() =>
                        handleClickProduct(
                          itemDetail.product._id,
                          itemDetail.id
                        )
                      }
                    >
                      <span>{t("rate")}</span>
                    </div>
                  )}

                  {orderById?.order.status === 3 && itemDetail.status === 2 && (
                    <div className="col col-md-2 btn-rate" onClick={() => {}}>
                      <span>{t("view_rate")}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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
          show={showMessage}
          modalTitle={modalTitleMessage}
          modalBody={modalBodyMessage}
          handleConfirm={handleConfirm}
          handleCloseModal={() => setShowMessage(!showMessage)}
          isButton
        />
      </div>
    </Formik>
  );
}

export default OrderDetail;
