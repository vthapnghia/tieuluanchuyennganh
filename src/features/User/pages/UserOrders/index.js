import { t } from "i18next";
import { useCallback, useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./UserOrders.scss";
import { getAllOrder } from "./UserOrderSlice";
import All from "./Tabs/All";

function UserOrders(params) {
  const allOrder = useSelector((state) => state.userOrder.allOrder?.orders);
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);
  return (
    <div className="user-order">
      <div className="container">
        <Tabs
          defaultActiveKey="in-order"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="in-order" title={t("order_all")}>
            {allOrder && allOrder.length > 0 && (
              <All orders={orderByStatus(0)} />
            )}
          </Tab>
          <Tab eventKey="in_order" title={t("in_order")}>
            {allOrder && allOrder.length > 0 && (
              <All orders={orderByStatus(1)} />
            )}
          </Tab>
          <Tab eventKey="in-ship" title={t("in_ship")}>
            {allOrder && allOrder.length > 0 && (
              <All orders={orderByStatus(2)} />
            )}
          </Tab>
          <Tab eventKey="complete" title={t("complete")}>
            {allOrder && allOrder.length > 0 && (
              <All orders={orderByStatus(3)} />
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default UserOrders;
