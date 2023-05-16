import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderAdmin } from "./OrderAdminSlice";
import "./ManagementOrder.scss";
import { empty } from "../../../../assets/img";
import moment from "moment";
import TableAdminCommon from "../../../../components/TableAdminCommon";
import { COLOR, PAYMENT_OPTION } from "../../../../constants/global";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../constants/path";
import Icons from "../../../../components/Icons";
import Pagination from "../../../../components/Pagination";
import Button from "../../../../components/Button";
import { currencyFormatting } from "../../../../until/common";

function ManagementOrder() {
  const dispatch = useDispatch();
  const allOrder = useSelector(
    (state) => state.orderAdmin.allOrderAdmin?.orders
  );
  const [tab, setTab] = useState(0);
  const [orders, setOrders] = useState([]);
  const ship = useSelector((state) => state.ship.allShip?.ships);
  const count = useSelector((state) => state.ship.allShip?.count);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [errFromDate, setErrFromDate] = useState();
  const [errToDate, setErrToDate] = useState();
  const [param, setParam] = useState({});
  const pageNumber = useSelector((state) => state.product.pageNumber);
  const page = useSelector((state) => state.product.page);

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
            return item.status === index;
          });
          setOrders(list);
        }
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
        setParam({ ...param, search: e.target.value });
      }
    },
    [param]
  );

  const handlePageClick = useCallback((event) => {}, []);

  const handleFilter = useCallback(() => {
    const from = new Date(fromDate).getTime();
    const to = new Date(toDate).getTime();
    if (!fromDate) {
      setErrFromDate(t("MS_09", { param: "" }));
    }
    if (!toDate) {
      setErrToDate(t("MS_09", { param: "" }));
    }
    if (to - from < 0 && fromDate) {
      setErrToDate(t("MS_10", { param: fromDate }));
    }
    if (from - to > 0 && toDate) {
      setErrFromDate(t("MS_11", { param: toDate }));
    }
    if (fromDate && toDate && to - from > 0 && from - to < 0) {
      setParam({
        ...param,
        dateFrom: moment(new Date(from)).format("YYYY/MM/DD"),
        dateTo: moment(new Date(toDate)).format("YYYY/MM/DD"),
      });
      setErrFromDate("");
      setErrToDate("");
    }
  }, [fromDate, param, t, toDate]);

  const handleChangeFrom = useCallback((e) => {
    setErrFromDate(null);
    setFromDate(e.target.value);
  }, []);

  const handleChangeTo = useCallback((e) => {
    setErrToDate(null);
    setToDate(e.target.value);
  }, []);

  const handleTitleBlurFrom = useCallback(
    (e) => {
      if (!e.target.value) {
        setErrFromDate(t("MS_09", { param: "" }));
      }
      const from = new Date(e.target.value).getTime();
      const to = new Date(toDate).getTime();
      if (from - to > 0 && toDate) {
        setErrFromDate(t("MS_11", { param: toDate }));
      }
    },
    [t, toDate]
  );

  const handleTitleBlurTo = useCallback(
    (e) => {
      if (e.target.value === "") {
        setErrToDate(t("MS_09", { param: "" }));
      }
      const from = new Date(fromDate).getTime();
      const to = new Date(e.target.value).getTime();
      if (to - from < 0 && fromDate) {
        setErrToDate(t("MS_10", { param: fromDate }));
      }
    },
    [fromDate, t]
  );

  useEffect(() => {
    dispatch(getAllOrderAdmin({ ...param }));
  }, [dispatch, param]);

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
          <div className="action-filter">
            <div className="from-date">
              <input
                className="filter-date"
                type="date"
                onChange={handleChangeFrom}
                onFocus={() => setErrFromDate(null)}
                onBlur={handleTitleBlurFrom}
              ></input>
              {errFromDate && (
                <span className="warning-icon-input">
                  <Icons.Exclamation />
                  <span className="tooltiptext">{errFromDate}</span>
                </span>
              )}
            </div>
            <div style={{ margin: "0 20px" }}>{t("to")}</div>
            <div className="to-date">
              <input
                className="filter-date"
                type="date"
                onChange={handleChangeTo}
                onFocus={() => setErrToDate(null)}
                onBlur={handleTitleBlurTo}
              ></input>
              {errToDate && (
                <span className="warning-icon-input">
                  <Icons.Exclamation />
                  <span className="tooltiptext">{errToDate}</span>
                </span>
              )}
            </div>

            <Button className="green" onClick={handleFilter}>
              {t("filter")}
            </Button>

            <Button className="green" onClick={() => setParam({})}>
              {t("view_all")}
            </Button>
          </div>

          <div className="action-search">
            <input
              type="text"
              onKeyDown={handleOnChangeSearch}
              placeholder={t("search")}
            ></input>
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
          {count && count > pageNumber && (
            <div className="d-flex justify-content-end">
              <Pagination
                page={page}
                count={count}
                pageNumber={pageNumber}
                handlePageClick={handlePageClick}
              />
            </div>
          )}
        </div>
      </div>
    ),
    [
      t,
      handleChangeFrom,
      handleTitleBlurFrom,
      errFromDate,
      handleChangeTo,
      handleTitleBlurTo,
      errToDate,
      handleFilter,
      handleOnChangeSearch,
      orders.length,
      cols,
      rows,
      handleSort,
      handleClickOrderItem,
      count,
      pageNumber,
      page,
      handlePageClick,
      handleClickTab,
    ]
  );
}

export default ManagementOrder;
