import API_URL from "../contanst/api";
import { doRequest } from "../until/common";

const brandAPI = {
  getALLBrand: (data) => {
    const url = API_URL.BRAND.ALL_BRAND;
    return doRequest("get", url, { data: data });
  },
  getBrandById: (data) => {
    const url = API_URL.BRAND.BRAND_BY_ID.replace(":id", data);
    return doRequest("get", url, { data: data });
  },
  addBrand: (data) => {
    const url = API_URL.BRAND.ADD_BRAND;
    return doRequest("post", url, { data: data });
  },
  removeBrand: (data) => {
    const url = API_URL.BRAND.REMOVE_BRAND.replace(":id", data);
    return doRequest("delete", url);
  },
};

export default brandAPI;
