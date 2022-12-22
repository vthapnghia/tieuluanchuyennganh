import API_URL from "../contanst/api";
import { CONFIGHEADER_1, CONFIGHEADER_2 } from "../contanst/global";
import { doRequest } from "../until/common";

const rateAPI = {
  createRate: (data) => {
    const url = API_URL.RATE.CREATE_RATE;
    return doRequest("post", url, data, CONFIGHEADER_2);
  },
  getRate: (data) => {
    const { orderDetailId, productId } = data;
    const url = API_URL.RATE.GET_RATE.replace(":id_1", orderDetailId).replace(
      ":id_2",
      productId
    );
    return doRequest("get", url, "", CONFIGHEADER_1);
  },
  updateRate: (data) => {
    const url = API_URL.RATE.UPDATE_RATE;
    return doRequest("put", url, data, CONFIGHEADER_2);
  },
};

export default rateAPI;
