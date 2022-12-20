import API_URL from "../contanst/api";
import { CONFIGHEADER_1 } from "../contanst/global";
import { doRequest } from "../until/common";

const orderAPI = {
  createOrder: (data) => {
    const url = API_URL.ORDER.CREATE_ORDER;
    return doRequest("post", url, data, CONFIGHEADER_1);
  },
  getAllOrder: (data) => {
    const url = API_URL.ORDER.GET_ALL_ORDER_USER;
    return doRequest("get", url, "", CONFIGHEADER_1);
  },
  getOrderById: (data) => {
    const url = API_URL.ORDER.GET_ORDER_BY_ID.replace(":id", data);
    return doRequest("get", url, "", CONFIGHEADER_1);
  },
};

export default orderAPI;
