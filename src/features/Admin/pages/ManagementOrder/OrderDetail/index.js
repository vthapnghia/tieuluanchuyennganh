import { t } from "i18next";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PAYMENT_OPTION } from "../../../../../constants/global";
import {
  getOrderById,
  updateOrderById,
} from "../../../../User/pages/UserOrders/UserOrderSlice";
import { getAllShip, removeStateShip } from "../../ManagementShip/ShipSlice";
import ModalCommon from "../../../../../components/ModalCommon";
import "./OrderDetail.scss";
import { currencyFormatting } from "../../../../../until/common";
import Button from "../../../../../components/Button";
import { removeUserOrder } from "../../../../User/pages/UserOrders/UserOrderSlice";

function OrderDetail(params) {
  const param = useParams();
  const dispatch = useDispatch();
  const orderById = useSelector((state) => state.userOrder.orderById);
  const ship = useSelector((state) => state.ship.allShip?.ships);
  const [showMessage, setShowMessage] = useState(false);
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalBody, setModalBody] = useState(null);
  const [methodShip, setMethodShip] = useState();

  const getHeaderByStatus = useCallback((orderStatus) => {
    let status = "";
    switch (orderStatus) {
      case 1:
        status = t("in_order");
        break;
      case 2:
        status = t("in_ship");
        break;
      case 3:
        status = t("complete");
        break;
      default:
        status = "Đơn hủy";
        break;
    }
    return status;
  }, []);

  const totalItemProduct = useCallback((quantity, price, discount) => {
    return quantity * (price * (1 - discount / 100));
  }, []);

  const getMethodPay = useCallback((id) => {
    const payName = PAYMENT_OPTION.find((itemPay) => {
      return itemPay.value === id;
    });
    if (payName) {
      return payName.label;
    }
    return;
  }, []);

  const handleConfirm = useCallback(async () => {
    setShow(!show);
    await dispatch(updateOrderById(param.id)).then((res) => {
      if (res.payload.status === 200) {
        setShowMessage(!showMessage);
        setModalTitle(t("action_success", { param: t("update_order") }));
        setModalBody(null);
      } else {
        setModalTitle(t("action_fail", { param: t("update_order") }));
        setModalBody(t("try_again"));
      }
    });
  }, [show, dispatch, showMessage, param.id]);

  const handleConfirmMessage = useCallback(() => {
    setShowMessage(!showMessage);
    dispatch(getOrderById(param.id));
  }, [showMessage, dispatch, param.id]);

  const handelPriceTemporary = useMemo(() => {
    let total = 0;
    if (orderById?.orderDetail.length > 0) {
      orderById?.orderDetail.forEach((item) => {
        total = total + item.quantity * item.product.price;
      });
    }
    return total;
  }, [orderById?.orderDetail]);

  useEffect(() => {
    dispatch(getAllShip());

    return () => {
      dispatch(removeStateShip());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrderById(param.id));

    return () => {
      dispatch(removeUserOrder(null));
    };
  }, [dispatch, param.id]);

  useEffect(() => {
    if (orderById && ship) {
      const findShip = ship.find(
        (item) => item._id === orderById?.order.ship_id
      );
      if (findShip) {
        setMethodShip(findShip);
      }
    }
  }, [orderById, orderById?.order.ship_id, ship]);


  useEffect(() => {console.log(orderById?.orderDetail)}, [orderById?.orderDetail])

  return useMemo(
    () => (
      <div className="admin-order-detail">
        <div className="header">{`${t("status")}: ${getHeaderByStatus(
          orderById?.order.status
        )}`}</div>
        <div className="info-detail">
          <div className="address">
            <div className="title">{t("address_user_receive")}</div>
            <div className="content">
              <span className="name">{orderById?.order.receiver_name}</span>
              <span>
                {t("address_receive", { param: orderById?.order.location })}
              </span>
              <span>
                {t("phone_receive", { param: orderById?.order.receiver_phone })}
              </span>
            </div>
          </div>
          <div className="shipment">
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
          <div className="payment">
            <div className="title">{t("method_pay")}</div>
            <div className="content">
              <span>{getMethodPay(orderById?.order.payment_method)}</span>
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
            orderById?.orderDetail.map((itemDetail, index) => {
              return (
                <div className="row m-0 order-item" key={index}>
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
              <span className="col-md-10">{t("ship_fee", { param: "" })}</span>
              <span className="col-md-2">
                {currencyFormatting(methodShip?.price ? methodShip?.price : 0)}
              </span>
            </div>
            <div className="price-total row">
              <span className="col-md-10">{t("total", { param: "" })}</span>
              <span className="col-md-2">
                {currencyFormatting(
                  handelPriceTemporary +
                    (methodShip?.price ? methodShip?.price : 0)
                )}
              </span>
            </div>
          </div>
        </div>
        {(orderById?.order.status === 1 || orderById?.order.status === 2) && (
          <div className="update-status">
            <Button className="primary" onClick={() => setShow(!show)} color="red">
              {orderById?.order.status === 1 ? t("shipping") : t("complete")}
            </Button>
          </div>
        )}
        <ModalCommon
          show={showMessage}
          modalTitle={modalTitle}
          modalBody={modalBody}
          handleConfirm={handleConfirmMessage}
          handleCloseModal={() => setShowMessage(!showMessage)}
          isButton
        />
        <ModalCommon
          show={show}
          modalTitle={t("update_order")}
          modalBody={t("update_order_confirm")}
          handleConfirm={handleConfirm}
          handleCloseModal={() => setShow(!show)}
          isButton
        />
      </div>
    ),
    [
      getHeaderByStatus,
      getMethodPay,
      handelPriceTemporary,
      handleConfirm,
      handleConfirmMessage,
      methodShip?.price,
      methodShip?.type,
      modalBody,
      modalTitle,
      orderById?.order.created_at,
      orderById?.order.location,
      orderById?.order.payment_method,
      orderById?.order.receiver_name,
      orderById?.order.receiver_phone,
      orderById?.order.status,
      orderById?.orderDetail,
      show,
      showMessage,
      totalItemProduct,
    ]
  );
}

export default OrderDetail;
