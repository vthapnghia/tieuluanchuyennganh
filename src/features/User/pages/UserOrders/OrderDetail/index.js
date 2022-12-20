import { t } from "i18next";
import moment from "moment";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Icons from "../../../../../components/Icons";
import { getOrderById } from "../UserOrderSlice";
import "./OrderDetail.scss";

function OrderDetail(params) {
  const location = useLocation();
  const dispatch = useDispatch();
  const orderById = useSelector((state) => state.userOrder.orderById);

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

  useEffect(() => {
    console.log(orderById);
  }, [orderById]);

  useEffect(() => {
    dispatch(getOrderById(location.state.id));
  }, [dispatch, location]);
  return (
    <div className="user-order-detail">
      <div className="container">
        <div className="header">
          <div>{`${t("status")}: ${getHeaderByStatus(
            orderById?.order.status
          )}`}</div>
          <div>{`${t("date_order", {
            param: moment(new Date(orderById?.order.created_at)).format(
              "DD/MM/YYYY"
            ),
          })}`}</div>
        </div>
        <div className="body">
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
                  borderColor: `${
                    orderById?.order.status >= 3 ? "#2dc258" : "#ccc"
                  }`,
                }}
              >
                <Icons.Star
                  height="40"
                  width="40"
                  color={orderById?.order.status >= 4 ? "#2dc258" : "#ccc"}
                />
              </div>
              <div
                className="status-label"
                style={{
                  color: `${orderById?.order.status >= 4 ? "#2dc258" : "#ccc"}`,
                }}
              >
                {t("rate")}
              </div>
            </div>
            <div className="order-receiver">

            </div>
          </div>
        </div>
        <div className="footer">
            
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
