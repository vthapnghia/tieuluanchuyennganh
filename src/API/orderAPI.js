import API_URL from "../constants/api";
import { doRequest } from "../until/common";

const orderAPI = {
  createOrder: (data) => {
    const url = API_URL.ORDER.CREATE_ORDER;
    return doRequest("post", url, { data: data });
  },
  getAllOrder: (data) => {
    const url = API_URL.ORDER.GET_ALL_ORDER_USER;
    return doRequest("get", url);
  },
  getOrderById: (data) => {
    const url = API_URL.ORDER.GET_ORDER_BY_ID.replace(":id", data);
    return doRequest("get", url);
  },
  getAllOrderAdmin: (data) => {
    const { dateFrom = "", dateTo = "", search = "" } = data;
    let url = API_URL.ORDER.GET_ALL_ORDER_ADMIN;
    if (dateFrom && dateTo) {
      url = `${url}?dateFrom=${dateFrom}&dateTo=${dateTo}${
        search && `&search=${search}`
      }`;
    } else {
      url = `${url}${search && `?search=${search}`}`;
    }
    console.log(url);
    return doRequest("get", url);
  },
  updateOrder: (data) => {
    const url = API_URL.ORDER.UPDATE_ORDER_BY_ID.replace(":id", data);
    return doRequest("put", url);
  },
};

export default orderAPI;
