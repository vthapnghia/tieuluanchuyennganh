import "./Revenue.scss";
import { useCallback } from "react";
import { Formik } from "formik";
import { t } from "i18next";
import RevenueByMonth from "./RevenueByMonth";
import RevenueByYear from "./RevenueByYear";

function Revenue() {
  const handleChangeOption = useCallback((e) => {
    let bgactive = document.getElementById("bg-active");
    let revenue = document.getElementById("chart-revenue");
    if (e.target.id === "year") {
      revenue.classList.remove("month");
      revenue.classList.add("year");
    } else {
      revenue.classList.remove("year");
      revenue.classList.add("month");
    }
    bgactive.style.left = e.target.offsetLeft + "px";
  }, []);

  return (
    <Formik initialValues={{ revenue_month: 0 }}>
      <div id="revenue">
        <div className="container">
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
