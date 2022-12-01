import API_URL from "../contanst/api";
import { doRequest } from "../until/common";

const cartAPI = {
  getCart: () => {
    const url = API_URL.CART;
    return doRequest("get", url);
  },
};

export default cartAPI;
