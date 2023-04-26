import { t } from "i18next";
import moment from "moment/moment";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../../constants/path";
import "./TabItem.scss";
import { currencyFormatting } from "../../../../../constants/common";

function TabItem({ orders, id, classTab }) {
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
      navigate(PATH.USER_ORDERS.ORDER_DETAIL.replace(":id", id));
    },
    [navigate]
  );

  return (
    <div id={id} className={`${classTab} order-by-status`}>
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
                      {currencyFormatting(totalItemProduct(
                        itemDetail.quantity,
                        itemDetail.product.price,
                        itemDetail.product.discount
                      ))}
                    </span>
                  </div>
                </div>
              );
            })}
            <div className="footer">
              {`${t("into_money")}: ${currencyFormatting(orderItem.orderTotal)}`}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TabItem;
