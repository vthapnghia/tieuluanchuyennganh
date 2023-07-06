import { t } from "i18next";
import moment from "moment/moment";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../../constants/path";
import "./TabItem.scss";
import { currencyFormatting } from "../../../../../until/common";

function TabItem({ orders, id, classTab }) {
  const navigate = useNavigate();

  const totalItemProduct = useCallback((quantity, price, discount) => {
    return quantity * (price * (1 - discount / 100));
  }, []);

  const handleClickOrderItem = useCallback(
    (id) => {
      navigate(PATH.USER_ORDERS.ORDER_DETAIL.replace(":id", id));
    },
    [navigate]
  );
  useEffect(() => {}, [orders]);
  return (
    <div id={id} className={`${classTab} order-by-status`}>
      {orders.map((orderItem, index) => {
        return (
          <div
            className="order-item"
            key={index}
            onClick={() => handleClickOrderItem(orderItem.orderId)}
          >
            {orderItem?.orderDetail.map((itemDetail, index) => {
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
              );
            })}
            <div className="footer">
              <span>
                Ngày đặt hàng:{" "}
                {moment(new Date(orderItem?.orderCreateDay)).format(
                  "DD-MM-YYYY"
                )}
              </span>
              <span>{`${t(
                "into_money"
              )}: ${currencyFormatting(orderItem.orderTotal)}`}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TabItem;
