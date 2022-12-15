import API_URL from "../contanst/api";
import { CONFIGHEADER_1 } from "../contanst/global";
import { doRequest } from "../until/common";

const cartAPI = {
  getAllCart: (data) => {
    const url = API_URL.CART.GET_ALL_CART;
    return doRequest("get", url, "", CONFIGHEADER_1);
  },
  addToCart: (data) => {
    const url = API_URL.CART.ADD_TO_CART;
    return doRequest("post", url, data, CONFIGHEADER_1);
  },
  editQuantity: (param) => {
    const { data, noLoading } = param;
    const url = API_URL.CART.EDIT_QUANTITY;
    return doRequest("post", url, data, CONFIGHEADER_1, noLoading);
  },
  removeToCart: (data) => {
    const { id, size } = data;
    const url = API_URL.CART.REMOVE_TO_CART.replace(":id", id).replace(
      ":size",
      size
    );
    return doRequest("delete", url, "", CONFIGHEADER_1);
  },
};

export default cartAPI;
