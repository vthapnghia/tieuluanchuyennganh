import "./Revenue.scss";
import { useCallback, useState } from "react";
import { Formik } from "formik";
import { t } from "i18next";
import RevenueByMonth from "./RevenueByMonth";
import RevenueByYear from "./RevenueByYear";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { currencyFormatting } from "../../../../until/common";

function Revenue() {
  const revenueByMonth = useSelector(
    (state) => state.revenue.revenueByMonth?.statics
  );
  const revenueByYear = useSelector(
    (state) => state.revenue.revenueByYear?.statics
  );
  const [totalMonth, setTotalMonth] = useState(0);
  const [totalYear, setTotalYear] = useState(0);

  const handleChangeOption = useCallback((e) => {
    let bgActive = document.getElementById("bg-active");
    let revenue = document.getElementById("chart-revenue");
    if (e.target.id === "year") {
      revenue.classList.remove("month");
      revenue.classList.add("year");
    } else {
      revenue.classList.remove("year");
      revenue.classList.add("month");
    }
    bgActive.style.left = e.target.offsetLeft + "px";
  }, []);

  useEffect(() => {
    console.log(revenueByMonth);
    if (revenueByMonth) {
      let sum = 0;
      revenueByMonth.forEach((element) => {
        sum = sum + Number(element.total_day);
      });
      setTotalMonth(sum);
    }
  }, [revenueByMonth]);

  useEffect(() => {
    if (revenueByYear) {
      let sum = 0;
      revenueByYear.forEach((element) => {
        sum = sum + Number(element.total_month);
      });
      setTotalYear(sum);
    }
  }, [revenueByYear]);

  return (
    <Formik initialValues={{ revenue_month: 0 }}>
      <div id="revenue">
        <div className="container">
          <div className="display-total row">
            <div className="month-current col-md-4">
              <span>{t("total_month")}</span>
              <div className="total-month">
                {currencyFormatting(totalMonth)}
              </div>
            </div>
            <div className="col-md-4"></div>
            <div className="year-current col-md-4">
              <span>{t("total_year")}</span>
              <div className="total-year">{currencyFormatting(totalYear)}</div>
            </div>
          </div>
          <div className="option">
            <div className="bg-active" id="bg-active"></div>
            <div
              className="change-option"
              id="month"
              onClick={handleChangeOption}
            >
              {t("revenue_month")}
            </div>
            <div
              className="change-option"
              id="year"
              onClick={handleChangeOption}
            >
              {t("revenue_year")}
            </div>
          </div>
          <div id="chart-revenue" className="month">
            <div className="revenue-month">
              <RevenueByMonth />
            </div>
            <div className="revenue-year">
              <RevenueByYear />
            </div>
          </div>
        </div>
      </div>
    </Formik>
  );
}

export default Revenue;
