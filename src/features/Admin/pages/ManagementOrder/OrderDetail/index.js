import { t } from "i18next";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../../../../../components/Button";
import { PAYMENT_OPTION } from "../../../../../contanst/global";
import {
  getOrderById,
  setOrderByID,
  updateOrderById,
} from "../../../../User/pages/UserOrders/UserOrderSlice";
import { getAllShip } from "../../ManagementShip/ShipSlice";
import ModalCommon from "../../../../../components/ModalCommon";
import "./OrderDetail.scss";

function OrderDetail(params) {
  const param = useParams();
  const dispatch = useDispatch();
  const orderById = useSelector((state) => state.userOrder.orderById);
  const ship = useSelector((state) => state.ship.allShip?.ships);
  const [showMessage, setShowMessage] = useState(false);
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalBody, setModalBody] = useState(null);

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

  const getMethodShip = useCallback(
    (id) => {
      const shipName = ship?.find((itemShip) => {
        return itemShip._id === id;
      });
      if (shipName) {
        return shipName.type;
      }
      return;
    },
    [ship]
  );

  const getMethodPay = useCallback((id) => {
    const payName = PAYMENT_OPTION.find((itemPay) => {
      return itemPay.value === id;
    });
    if (payName) {
      return payName.label;
    }
    return;
  }, []);

  const handleConfirm = useCallback(async() => {
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

  useEffect(() => {
    dispatch(getAllShip());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrderById(param.id));
    return () => {
      dispatch(setOrderByID(null));
    };
  }, [dispatch, param.id]);

  return !orderById ? (
    <></>
  ) : (
    <div className="admin-order-detail">
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
        <div className="body">
          <div className="address-receiver">
            <span>{`${t("address_receiver")}: `}</span>
            <span>{`${orderById?.order.receiver_name}, ${orderById?.order.receiver_phone}, ${orderById?.order.location}`}</span>
          </div>
          <div className="method-ship">
            <span>{`${t("type_ship")}: `}</span>
            <span>{getMethodShip(orderById?.order.ship_id)}</span>
          </div>
          <div className="method-pay">
            <span>{`${t("payment_method")}: `}</span>
            <span>{getMethodPay(orderById?.order.payment_method)}</span>
          </div>
          <div className="total-order">
            <span>{`${t("total_order")}: `}</span>
            <span>{orderById?.order.total}&#8363;</span>
          </div>
          {(orderById?.order.status === 1 || orderById?.order.status === 2) && (
            <div className="update-status">
              <Button className="primary" onClick={() => setShow(!show)}>
                {orderById?.order.status === 1 ? t("shipping") : t("complete")}
              </Button>
            </div>
          )}
        </div>

        <div className="order-product">
          <div className="title-product">
            <div className="col col-md-2 img-title">{t("image")}</div>
            <div className="col col-md-4 name-title">{t("name_product")}</div>
            <div className="col col-md-2 size-title">{t("size")}</div>
            <div className="col col-md-2 quantity-title">{t("quantity")}</div>
            <div className="col col-md-2 total-title">{t("title_total")}</div>
          </div>
          {orderById?.orderDetail.map((itemDetail, index) => {
            return (
              <div className="row product-item" key={index}>
                <div className="col col-md-2 img-product">
                  <img src={itemDetail.product.product_image[0]} alt="img" />
                </div>
                <div className="col col-md-4 name-product">
                  <span>{itemDetail.product.name}</span>
                </div>
                <div className="col col-md-2 size-product">
                  <span>{itemDetail.size}</span>
                </div>
                <div className="col col-md-2 quantity">
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
              </div>
            );
          })}
        </div>
      </div>
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
  );
}

export default OrderDetail;
