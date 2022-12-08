import API_URL from "../contanst/api";
import { CONFIGHEADER_1 } from "../contanst/global";
import { doRequest } from "../until/common";

const brandAPI = {
  getALLBrand: (data) => {
    const url = API_URL.BRAND.ALL_BRAND;
    return doRequest("get", url, data, CONFIGHEADER_1);
  },
  getBrandById: (data) => {
    const url = API_URL.BRAND.BRAND_BY_ID.replace(":id", data);
    return doRequest("get", url, data, CONFIGHEADER_1);
  },
  addBrand: (data) => {
    const url = API_URL.BRAND.ADD_BRAND;
    return doRequest("post", url, data, CONFIGHEADER_1);
  },
  removeBrand: (data) => {
    const url = API_URL.BRAND.REMOVE_BRAND.replace(":id", data);
    return doRequest("delete", url,"",  CONFIGHEADER_1);
  },
};

export default brandAPI;
