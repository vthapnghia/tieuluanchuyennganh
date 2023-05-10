import API_URL from "../constants/api";
import { doRequest } from "../until/common";

const productAPI = {
  getALlProduct: () => {
    const url = API_URL.PRODUCT.ALL_PRODUCT;
    return doRequest("get", url);
  },
  getProduct: (data) => {
    const {
      page,
      pageSize,
      type = [],
      gender = [],
      size = [],
      brand = [],
      color = [],
    } = data;

    let brandCopy = brand.map(item => `"${item}"` )

    let colorCopy = color.map(item => `"${item}"`)

    const url = API_URL.PRODUCT.ALL_PRODUCT.concat(
      `?page=${page}&pageSize=${pageSize}${
        type.length > 0 ? `&type=[${type}]` : ""
      }${gender.length > 0 ? `&gender=[${gender}]` : ""}${
        size.length > 0 ? `&size=[${size}]` : ""
      }${brand.length > 0 ? `&brand=[${brandCopy}]` : ""}${
        color.length > 0 ? `&color=[${colorCopy}]` : ""
      }`
    );
    return doRequest("get", url);
  },

  getProductById: (data) => {
    const url = API_URL.PRODUCT.PRODUCT_BY_ID.replace(":id", data);
    return doRequest("get", url);
  },

  addProduct: (data) => {
    const url = API_URL.PRODUCT.ADD_PRODUCT;
    return doRequest("post", url, { data: data, isUploadImg: true });
  },

  uploadProduct: (data) => {
    const { formData, id } = data;
    const url = API_URL.PRODUCT.UPDATE_PRODUCT.replace(":id", id);
    return doRequest("put", url, { data: formData, isUploadImg: true });
  },

  deleteProduct: (data) => {
    const url = API_URL.PRODUCT.DELETE_PRODUCT.replace(":id", data);
    return doRequest("delete", url);
  },
  searchProduct: (data) => {
    const url = API_URL.PRODUCT.SEARCH_PRODUCT.concat(`?search=${data}`);
    return doRequest("get", url);
  },
};

export default productAPI;
