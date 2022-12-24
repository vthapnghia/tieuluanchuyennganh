import API_URL from "../contanst/api";
import { doRequest } from "../until/common";

const rateAPI = {
  createRate: (data) => {
    const url = API_URL.RATE.CREATE_RATE;
    return doRequest("post", url, {data: data, isUploadImg: true});
  },
  getRate: (data) => {
    const { orderDetailId, productId } = data;
    const url = API_URL.RATE.GET_RATE.replace(":id_1", orderDetailId).replace(
      ":id_2",
      productId
    );
    return doRequest("get", url);
  },
  updateRate: (data) => {
    const url = API_URL.RATE.UPDATE_RATE;
    return doRequest("put", url, {data: data, isUploadImg: true});
  },
};

export default rateAPI;
