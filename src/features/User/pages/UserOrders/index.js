import { t } from "i18next";
import { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Complete from "./Tabs/Complete";
import InShip from "./Tabs/All";
import "./UserOrders.scss";
import { getAllOrder } from "./UserOrderSlice";
import All from "./Tabs/All";

function UserOrders(params) {
  const allOrder = useSelector((state) => state.userOrder.allOrder?.orders);
  const dispatch = useDispatch();

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
            {allOrder && allOrder.length > 0 && <All orders={allOrder} />}
          </Tab>
          {/* <Tab eventKey="in-ship" title={t("in_order")}>
            {allOrder && allOrder.length > 0 && <InShip orders={allOrder} />}
          </Tab>
          <Tab eventKey="in-ship" title={t("in_ship")}>
            {allOrder && allOrder.length > 0 && <InShip orders={allOrder} />}
          </Tab>
          <Tab eventKey="complete" title={t("complete")}>
            {allOrder && allOrder.length > 0 && <Complete orders={allOrder} />}
          </Tab> */}
        </Tabs>
      </div>
    </div>
  );
}

export default UserOrders;
