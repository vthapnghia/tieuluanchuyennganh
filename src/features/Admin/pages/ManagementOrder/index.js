import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderAdmin } from "./OrderAdminSlice";
import "./ManagementOrder.scss";
import { empty } from "../../../../assets/img";
import moment from "moment";
import TableAdminCommon from "../../../../components/TableAdminCommon";
import { getAllShip } from "../ManagementShip/ShipSlice";
import { currencyFormatting } from "../../../../constants/common";
import { COLOR, PAYMENT_OPTION } from "../../../../constants/global";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../constants/path";
import { hideLoading, showLoading } from "../../../../loading";
import Icons from "../../../../components/Icons";

function ManagementOrder() {
  const dispatch = useDispatch();
  const allOrder = useSelector(
    (state) => state.orderAdmin.allOrderAdmin?.orders
  );
  const [tab, setTab] = useState(0);
  const [orders, setOrders] = useState([]);
  const ship = useSelector((state) => state.ship.allShip?.ships);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [date, setDate] = useState("");

  const handleClickTab = useCallback(
    (index) => {
      if (index !== tab) {
        const elementTabClick = document.getElementById(`tab-${index}`);
        const elementTabCurrent = document.getElementById(`tab-${tab}`);
        if (elementTabClick && elementTabCurrent) {
          elementTabClick.classList.add("is-active");
          elementTabCurrent.classList.remove("is-active");
          setTab(index);
          let list = allOrder.filter((item) => {
            let itemDate = moment(new Date(item.created_at)).format(
              "YYYY-MM-DD"
            );
            const checkDate = date ? date === itemDate : true;
            if (index === 0) {
              return true && checkDate;
            } else {
              return item.status === index && checkDate;
            }
          });
          setOrders(list);
        }
      }
    },
    [allOrder, date, tab]
  );

  const handleOnChangeFilter = useCallback(
    (e) => {
      if (allOrder) {
        setDate(e?.target?.value);
        let list = allOrder?.filter((item) => {
          let itemDate = moment(new Date(item.created_at)).format("YYYY-MM-DD");
          const checkTab = tab === 0 ? true : item.status === tab;
          return e?.target?.value === itemDate && checkTab;
        });
        setOrders(list);
      }
    },
    [allOrder, tab]
  );

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

  const getMethodPay = useCallback((id) => {
    const payName = PAYMENT_OPTION.find((itemPay) => {
      return itemPay.value === id;
    });
    if (payName) {
      return payName.label;
    }
    return;
  }, []);

  const rows = useMemo(() => {
    return orders?.map((order) => {
      return {
        id: order._id,
        columns: [
          { label: order.receiver_name, align: "center", width: "20%" },
          { label: order.location, align: "center", width: "20%" },
          {
            label: moment(new Date(order.created_at)).format("DD-MM-YYYY"),
            align: "center",
            width: "10%",
          },
          {
            label: getMethodShip(order.ship_id),
            align: "center",
            width: "20%",
          },
          {
            label: getMethodPay(order.payment_method),
            align: "center",
            width: "20%",
          },
          {
            label: currencyFormatting(order.total),
            align: "center",
            width: "10%",
          },
        ],
      };
    });
  }, [getMethodPay, getMethodShip, orders]);

  const cols = useMemo(
    () => [
      { label: t("user_receiver"), align: "center", width: "20%", sort: true },
      {
        label: t("address_receiver"),
        align: "center",
        width: "10%",
      },
      { label: t("date_order", { param: "" }), align: "center", width: "20%" },
      { label: t("type_ship"), align: "center", width: "20%" },
      { label: t("payment_method"), align: "center", width: "20%" },
      { label: t("into_money"), align: "center", width: "10%" },
    ],
    [t]
  );

  const handleSort = useCallback(
    (type, index) => {
      const list = [...orders];
      setOrders(
        list.sort((a, b) => {
          if (type === 1) {
            if (a.receiver_name.toLowerCase() > b.receiver_name.toLowerCase())
              return 1;
            if (a.receiver_name.toLowerCase() < b.receiver_name.toLowerCase())
              return -1;
          } else {
            if (a.receiver_name.toLowerCase() < b.receiver_name.toLowerCase())
              return 1;
            if (a.receiver_name.toLowerCase() > b.receiver_name.toLowerCase())
              return -1;
          }
          return 0;
        })
      );
    },
    [orders]
  );

  const handleOnChangeSearch = useCallback(
    (e) => {
      if (e.key === "Enter") {
        console.log(e.target.value);
        if (e.target.value !== "") {
          let list = orders?.filter((item) => {
            return item.receiver_name.includes(e.target.value);
          });
          setOrders(list);
        } else {
          setOrders(allOrder);
        }
      }
    },
    [allOrder, orders]
  );

  useEffect(() => {
    let callAPi = async () => {
      showLoading();
      await dispatch(getAllOrderAdmin());
      await dispatch(getAllShip());
      hideLoading();
    };
    callAPi();
  }, [dispatch]);

  useEffect(() => {
    if (allOrder) {
      setOrders(allOrder);
    }
  }, [allOrder]);

  return useMemo(
    () => (
      <div className="management-order">
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
        <div className="action row">
          <input
            className="filter-date"
            type="date"
            onChange={handleOnChangeFilter}
          ></input>

          <div className="search">
            <input type="text" onKeyDown={handleOnChangeSearch}></input>
            <Icons.Search color={COLOR.GRAY_2} />
          </div>
        </div>

        <div className="tab-content">
          {orders.length > 0 ? (
            <TableAdminCommon
              cols={cols}
              rows={rows}
              handleSort={handleSort}
              handleClick={handleClickOrderItem}
            />
          ) : (
            <div className="no-order">
              <img src={empty} alt="empty" />
              <span>{t("no_order")}</span>
            </div>
          )}
        </div>
      </div>
    ),
    [
      t,
      handleOnChangeFilter,
      handleOnChangeSearch,
      orders.length,
      cols,
      rows,
      handleSort,
      handleClickOrderItem,
      handleClickTab,
    ]
  );
}

export default ManagementOrder;
