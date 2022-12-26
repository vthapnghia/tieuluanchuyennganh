import API_URL from "../contanst/api";
import { doRequest } from "../until/common";

const revenueAPI = {
  getRevenueByMonth: (data) => {
    const url = API_URL.REVENUE.REVENUE_BY_MONTH.concat(
      `?month=${data.month}&year=${data.year}`
    );
    return doRequest("get", url);
  },
  getRevenueByYear: (data) => {
    const url = API_URL.REVENUE.REVENUE_BY_YEAR.concat(`?year=${data}`);
    return doRequest("get", url);
  },
};

export default revenueAPI;
