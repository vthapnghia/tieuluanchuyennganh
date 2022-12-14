import { t } from "i18next";
import moment from "moment/moment";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../../contanst/path";
import "./TabItem.scss";

function TabItem({ orders }) {
  const navigate = useNavigate();

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

  const handleClickOrderItem = useCallback(
    (id) => {
      navigate(PATH.USER_ORDERS.ORDER_DETAIL, { state: { id: id } });
    },
    [navigate]
  );

  return (
    <div className="order-by-status">
      {orders.map((orderItem, index) => {
        return (
          <div
            className="order-item"
            key={index}
            onClick={() => handleClickOrderItem(orderItem.orderId)}
          >
            <div className="header">
              <div>{`${t("status")}: ${getHeaderByStatus(
                orderItem.orderStatus
              )}`}</div>
              <div>{`${t("date_order", {
                param: moment(new Date(orderItem.orderCreateDay)).format(
                  "DD-MM-YYYY"
                ),
              })}`}</div>
            </div>
            {orderItem.orderDetail.map((itemDetail, index) => {
              return (
                <div className="row product-order-item" key={index}>
                  <div className="col col-md-2 product-img">
                    <img src={itemDetail.product.product_image[0]} alt="img" />
                  </div>
                  <div className="col col-md-5 product-name">
                    <span>{itemDetail.product.name}</span>
                  </div>
                  <div className="col col-md-3 product-quantity">
                    <span>{`${t("quantity")}: ${itemDetail.quantity}`}</span>
                  </div>
                  <div className="col col-md-2 product-price-total">
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
            <div className="footer">
              {`${t("into_money")}: ${orderItem.orderTotal}`}&#8363;
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TabItem;
