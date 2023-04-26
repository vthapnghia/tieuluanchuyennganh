import { Formik } from "formik";
import { t } from "i18next";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../../components/Button";
import Input from "../../../../../components/Input";
import LineChart from "../../../../../components/lineChart";
import {
  CURRENT_DATE,
  OPTIONS_MONTH,
  OPTIONS_YEAR,
} from "../../../../../constants/global";
import { getRevenueByYear } from "../RevenueSlice";
import "./RevenueByYear.scss";

function RevenueByYear(params) {
  const dispatch = useDispatch();
  const formikRef = useRef();
  const [year, setYear] = useState(CURRENT_DATE.getFullYear());
  const [dataChart, setDataChart] = useState([]);
  const revenueByYear = useSelector(
    (state) => state.revenue.revenueByYear?.statics
  );

  const handleViewChart = useCallback((values) => {
    setYear(values.year);
  }, []);

  const labelsChart = useMemo(() => {
    return OPTIONS_MONTH.map((month) => {
      return month.label;
    });
  }, []);

  useEffect(() => {
    let month = 0
    const currentYear = CURRENT_DATE.getFullYear();
    let dataChart = [];
    if(currentYear === year){
        month = CURRENT_DATE.getMonth() + 1;
    }else{
        month = 12;
    }
    for (let index = 1; index <= month; index++) {
      const data = revenueByYear?.find((itemReveneu) => {
        return itemReveneu._id.month === index;
      });
      if (data) {
        dataChart.push(data.total_month);
      } else {
        dataChart.push(0);
      }
    }
    setDataChart(dataChart);
  }, [revenueByYear, year]);

  useEffect(() => {
    dispatch(getRevenueByYear(year));
  }, [dispatch, year]);

  return (
    <Formik
      initialValues={{ year: year }}
      enableReinitialize
      innerRef={formikRef}
      onSubmit={handleViewChart}
    >
      <div id="chart-year">
        <div className="row option">
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
          <div className="col col-md-4 col-sm-12"></div>
        </div>
        <LineChart labelsChart={labelsChart} dataChart={dataChart} />
      </div>
    </Formik>
  );
}

export default RevenueByYear;
