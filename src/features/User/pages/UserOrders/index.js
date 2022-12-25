import { t } from "i18next";
import { useCallback, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./UserOrders.scss";
import { getAllOrder } from "./UserOrderSlice";
import Button from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../contanst/path";
import TabItem from "./TabItem";

function UserOrders(params) {
  const allOrder = useSelector((state) => state.userOrder.allOrder?.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    console.log(allOrder);
  }, [allOrder])
  return (
    <div className="user-order">
      <div className="container">
        {allOrder && allOrder.length > 0 ? (
          <Tabs
            defaultActiveKey="in-order"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="in-order" title={t("all")}>
                <TabItem orders={orderByStatus(0)} />
            </Tab>
            <Tab eventKey="in_order" title={t("in_order")}>
                <TabItem orders={orderByStatus(1)} />
            </Tab>
            <Tab eventKey="in-ship" title={t("in_ship")}>
                <TabItem orders={orderByStatus(2)} />
            </Tab>
            <Tab eventKey="complete" title={t("complete")}>
              
                <TabItem orders={orderByStatus(3)} />
            </Tab>
          </Tabs>
        ) : (
          <div className="no-order">
            <h2>{t("no_product_in_order")}</h2>
            <Button
              className="primary"
              onClick={() => navigate(PATH.PRODUCT.LIST_PRODUCT)}
            >
              {t("shopping")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserOrders;
