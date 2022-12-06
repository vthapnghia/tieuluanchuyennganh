import API_URL from "../contanst/api";
import { CONFIGHEADER_1 } from "../contanst/global";
import { doRequest } from "../until/common";

const cartAPI = {
  getCart: () => {
    const url = API_URL.CART;
    return doRequest("get", url, "", CONFIGHEADER_1);
  },
};

export default cartAPI;
