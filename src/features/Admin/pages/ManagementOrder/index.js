import { t } from "i18next";
import { useCallback, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderAdmin } from "./OrderAdminSlice";
import TabItem from "./TabItem";
import "./ManagementOrder.scss";

function ManagementOrder() {
  const dispatch = useDispatch();
  const allOrder = useSelector(
    (state) => state.orderAdmin.allOrderAdmin?.orders
  );

  const orderByStatus = useCallback(
    (status) => {
      switch (status) {
        case 0:
          return allOrder;
        default:
          return allOrder?.filter((itemOrder) => {
            return itemOrder.status === status;
          });
      }
    },
    [allOrder]
  );

  useEffect(() => {
    console.log(allOrder);
  }, [allOrder]);

  useEffect(() => {
    dispatch(getAllOrderAdmin());
  }, [dispatch]);
  return (
    <div className="management-order">
      <div className="container">
        <Tabs
          defaultActiveKey="in-order"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="in-order" title={t("order_all")}>
            {allOrder && allOrder.length > 0 && (
              <TabItem orders={orderByStatus(0)} />
            )}
          </Tab>
          <Tab eventKey="in_order" title={t("in_order")}>
            {allOrder && allOrder.length > 0 && (
              <TabItem orders={orderByStatus(1)} />
            )}
          </Tab>
          <Tab eventKey="in-ship" title={t("in_ship")}>
            {allOrder && allOrder.length > 0 && (
              <TabItem orders={orderByStatus(2)} />
            )}
          </Tab>
          <Tab eventKey="complete" title={t("complete")}>
            {allOrder && allOrder.length > 0 && (
              <TabItem orders={orderByStatus(3)} />
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default ManagementOrder;
