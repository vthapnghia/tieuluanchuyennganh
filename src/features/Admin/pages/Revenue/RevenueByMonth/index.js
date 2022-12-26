import { Formik } from "formik";
import { t } from "i18next";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../../components/Input";
import Button from "../../../../../components/Button";
import LineChart from "../../../../../components/lineChart";
import {
  CURRENT_DATE,
  OPTIONS_MONTH,
  OPTIONS_YEAR,
} from "../../../../../contanst/global";
import { getRevenueByMonth } from "../RevenueSlice";
import "./RevenueByMonth.scss";
import { getDayOfMonth } from "../../../../../until/common";

function RevenueByMonth(params) {
  const dispatch = useDispatch();
  const revenueByMonth = useSelector(
    (state) => state.revenue.revenueByMonth?.statics
  );
  const [month, setMonth] = useState(CURRENT_DATE.getMonth() + 1);
  const [year, setYear] = useState(CURRENT_DATE.getFullYear());
  const formikRef = useRef();
  const [labelsChart, setLabelsChart] = useState(getDayOfMonth(month, year));
  const [dataChart, setDataChart] = useState([]);

  const handleViewChart = useCallback((values) => {
    setMonth(values.month);
    setYear(values.year);
  }, []);

  useEffect(() => {
    let day = 0
    const currentMonth = CURRENT_DATE.getMonth() + 1;
    const currentYear = CURRENT_DATE.getFullYear();
    let dataChart = [];
    if(currentMonth === month && currentYear === year){
        day = new Date().getDate();
    }else{
        day = new Date(year, month, 0).getDate();
    }
    for (let index = 1; index <= day; index++) {
      const data = revenueByMonth?.find((itemReveneu) => {
        return itemReveneu._id.day === index;
      });
      if (data) {
        dataChart.push(data.total_day);
      } else {
        dataChart.push(0);
      }
    }
    setDataChart(dataChart);
  }, [revenueByMonth, year, month]);

  useEffect(() => {
    setLabelsChart(getDayOfMonth(month, year));
  }, [month, year]);

  useEffect(() => {
    dispatch(getRevenueByMonth({ month: month, year: year }));
  }, [dispatch, month, year]);

  return (
    <Formik
      initialValues={{ month: month, year: year }}
      enableReinitialize
      innerRef={formikRef}
      onSubmit={handleViewChart}
    >
      <div id="chart-month">
        <div className="row option">
          <div className="col col-md-4 col-sm-12 input">
            <Input name="month" type="select" options={OPTIONS_MONTH} />
          </div>
          <div className="col col-md-4 col-sm-12 input">
            <Input name="year" type="select" options={OPTIONS_YEAR} />
          </div>
          <div className="col col-md-4 col-sm-12 button">
            <Button
              className="primary"
              onClick={() => formikRef.current.submitForm()}
            >
              {t("view")}
            </Button>
          </div>
        </div>
        <LineChart labelsChart={labelsChart} dataChart={dataChart} />
      </div>
    </Formik>
  );
}
export default RevenueByMonth;
