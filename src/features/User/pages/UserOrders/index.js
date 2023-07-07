import { t } from "i18next";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserOrders.scss";
import { getAllOrder, removeUserOrder } from "./UserOrderSlice";
import TabItem from "./TabItem";
import { empty } from "../../../../assets/img/index";
import { Container, Grid } from "@mui/material";
import ProductItem from "../Products/ProductItem";
import { getAllFavorites } from "../Products/ProductItem/FavoriteSlice";

function UserOrders() {
  const allOrder = useSelector((state) => state.userOrder.allOrder?.orders);
  const favorites = useSelector((state) => state.favorite.favorites);
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const [optionIndex, setOptionIndex] = useState(true);

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

  const isLike = (id) => {
    const check = favorites.find((item) => {
      return item._id === id;
    });
    if (check) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    dispatch(getAllOrder());
    dispatch(getAllFavorites());

    return () => {
      dispatch(removeUserOrder());
    };
  }, [dispatch]);

  return (
    <div id="user-order">
      <Container maxWidth="lg">
        <Grid container columnSpacing={5}>
          <Grid item xs={2}></Grid>
          <Grid item xs={9}>
            <span className="title-order">
              {optionIndex ? "Sản phẩm đã đặt hàng" : "Sản phẩm yêu thích"}
            </span>
          </Grid>
        </Grid>
        <Grid container columnSpacing={4}>
          <Grid item xs={2}>
            <div className="option">
              <div
                className={`option-item ${optionIndex && "active"}`}
                onClick={() => setOptionIndex(true)}
              >
                <span>Sản phẩm đã đặt hàng</span>
              </div>
              <div
                className={`option-item ${!optionIndex && "active"}`}
                onClick={() => setOptionIndex(false)}
              >
                <span>Sản phẩm yêu thích</span>
              </div>
            </div>
          </Grid>
          <Grid item xs={9}>
            {optionIndex ? (
              <>
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
                )}{" "}
              </>
            ) : (
              <Grid container columnSpacing={3}>
                {favorites?.map((itemProduct) => {
                  return (
                    <Grid item xs={4} key={itemProduct._id}>
                      <ProductItem
                        product={itemProduct}
                        isLike={isLike(itemProduct._id)}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default UserOrders;
