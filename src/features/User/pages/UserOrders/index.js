import { t } from "i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserOrders.scss";
import { getAllOrder } from "./UserOrderSlice";
import TabItem from "./TabItem";
import { empty } from "../../../../assets/img/index";

function UserOrders() {
  const allOrder = useSelector((state) => state.userOrder.allOrder?.orders);
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);

  const orderByStatus = useCallback(
    (status) => {
      const listOrderCopy = [...allOrder];

      switch (status) {
        case 0:
          return listOrderCopy;
        default:
          return listOrderCopy.filter((itemOrder) => {
            return itemOrder.orderStatus === status;
          });
      }
    },
    [allOrder]
  );

  const handleClickTab = useCallback(
    (index) => {
      const elementTabClick = document.getElementById(`tab-${index}`);
      const elementTabCurrent = document.getElementById(`tab-${tab}`);
      if (elementTabClick && elementTabCurrent) {
        elementTabClick.classList.add("is-active");
        elementTabCurrent.classList.remove("is-active");
        setTab(index);
      }
    },
    [tab]
  );

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  return useMemo(
    () => (
      <div className="user-order">
        <div className="tab-header row">
          <div
            className="tab-header-item col-md-3 text-center is-active"
            id="tab-0"
            onClick={() => handleClickTab(0)}
          >
            {t("all")}
          </div>
          <div
            className="tab-header-item col-md-3 text-center"
            id="tab-1"
            onClick={() => handleClickTab(1)}
          >
            {t("in_order")}
          </div>
          <div
            className="tab-header-item col-md-3 text-center"
            id="tab-2"
            onClick={() => handleClickTab(2)}
          >
            {t("in_ship")}
          </div>
          <div
            className="tab-header-item col-md-3 text-center"
            id="tab-3"
            onClick={() => handleClickTab(3)}
          >
            {t("complete")}
          </div>
        </div>
        {allOrder && allOrder.length > 0 && (
          <div className="tab-content">
            {orderByStatus(0) && orderByStatus(0).length > 0 ? (
              <TabItem
                orders={orderByStatus(0)}
                classTab={`${tab !== 0 ? "no-active" : ""} tab-item`}
              />
            ) : (
              <div className={tab !== 0 ? "no-active" : "no-order"}>
                <img src={empty} alt="empty" />
                <span>{t("no_order")}</span>
              </div>
            )}
            {orderByStatus(1) && orderByStatus(1).length > 0 ? (
              <TabItem
                orders={orderByStatus(1)}
                classTab={`${tab !== 1 ? "no-active" : ""} tab-item`}
              />
            ) : (
              <div className={tab !== 1 ? "no-active" : "no-order"}>
                <img src={empty} alt="empty" />
                <span>{t("no_order")}</span>
              </div>
            )}
            {orderByStatus(2) && orderByStatus(2).length > 0 ? (
              <TabItem
                orders={orderByStatus(2)}
                classTab={`${tab !== 2 ? "no-active" : ""} tab-item`}
              />
            ) : (
              <div className={tab !== 2 ? "no-active" : "no-order"}>
                <img src={empty} alt="empty" />
                <span>{t("no_order")}</span>
              </div>
            )}
            {orderByStatus(3) && orderByStatus(3).length > 0 ? (
              <TabItem
                orders={orderByStatus(3)}
                classTab={`${tab !== 3 ? "no-active" : ""} tab-item`}
              />
            ) : (
              <div className={tab !== 3 ? "no-active" : "no-order"}>
                <img src={empty} alt="empty" />
                <span>{t("no_order")}</span>
              </div>
            )}
          </div>
        )}
      </div>
    ),
    [allOrder, handleClickTab, orderByStatus, tab]
  );
}

export default UserOrders;
