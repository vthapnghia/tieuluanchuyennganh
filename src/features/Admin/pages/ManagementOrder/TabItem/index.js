import { t } from "i18next";
import moment from "moment/moment";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PAYMENT_OPTION } from "../../../../../constants/global";
import PATH from "../../../../../constants/path";
import { getAllShip } from "../../ManagementShip/ShipSlice";
import "./TabItem.scss";
import { currencyFormatting } from "../../../../../constants/common";

function TabItem({ orders, classTab }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ship = useSelector((state) => state.ship.allShip?.ships);

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

  const handleClickOrderItem = useCallback(
    (id) => {
      navigate(PATH.ADMIN.ORDER.ORDER_DETAIL.replace(":id", id));
    },
    [navigate]
  );

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

  const getMethodPay = useCallback(
    (id) => {
      const payName = PAYMENT_OPTION.find((itemPay) => {
        return itemPay.value === id;
      });
      if (payName) {
        return payName.label;
      }
      return;
    },
    []
  );

  useEffect(() => {
    dispatch(getAllShip());
  }, [dispatch]);

  return (
    <div className={`${classTab} order-by-status-admin`}>
      {orders?.map((orderItem, index) => {
        return (
          <div
            className="order-item"
            key={index}
            onClick={() => handleClickOrderItem(orderItem._id)}
          >
            <div className="header">
              <div>{`${t("status")}: ${getHeaderByStatus(
                orderItem.status
              )}`}
              </div>
              <div>{`${t("date_order", {
                param: moment(new Date(orderItem.created_at)).format(
                  "DD-MM-YYYY"
                ),
              })}`}</div>
            </div>
            <div className="body">
              <div className="address-receiver">
                <span>{`${t("address_receiver")}: `}</span>
                <span>{`${orderItem.receiver_name}, ${orderItem.receiver_phone}, ${orderItem.location}`}</span>
              </div>
              <div className="method-ship">
                <span>{`${t("type_ship")}: `}</span>
                <span>{getMethodShip(orderItem.ship_id)}</span>
              </div>
              <div className="method-pay">
                <span>{`${t("payment_method")}: `}</span>
                <span>{getMethodPay(orderItem.payment_method)}</span>
              </div>
            </div>
            <div className="footer">
              {`${t("into_money")}: ${currencyFormatting(orderItem.total)}`}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TabItem;
