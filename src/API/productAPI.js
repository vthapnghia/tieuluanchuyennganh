import API_URL from "../contanst/api";
import { CONFIGHEADER_1, CONFIGHEADER_2 } from "../contanst/global";
import { doRequest } from "../until/common";

const productAPI = {
  getALlProduct: () => {
    const url = API_URL.PRODUCT.ALL_PRODUCT;
    return doRequest("get", url, "", CONFIGHEADER_1);
  },
  getProductById: (data) => {
    const url = API_URL.PRODUCT.PRODUCT_BY_ID.replace(":id", data);
    return doRequest("get", url, CONFIGHEADER_1);
  },
  addProduct: (data) => {
    const url = API_URL.PRODUCT.ADD_PRODUCT;
    return doRequest("post", url, data, CONFIGHEADER_2);
  },
  uploadProduct: (data) => {
    const {formData, id} = data
    const url = API_URL.PRODUCT.UPDATE_PRODUCT.replace(":id", id);;
    return doRequest("put", url, formData, CONFIGHEADER_2);
  },
  deleteProduct: (data) => {
    const url = API_URL.PRODUCT.DELETE_PRODUCT.replace(":id", data);;
    return doRequest("delete", url, "", CONFIGHEADER_1);
  },
};

export default productAPI;
