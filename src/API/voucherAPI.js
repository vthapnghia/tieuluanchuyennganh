import API_URL from "../contanst/api";
import { doRequest } from "../until/common";

const voucherAPI = {
  getAllVoucher: (data) => {
    const url = API_URL.VOUCHER.GET_ALL_VOUCHER;
    return doRequest("get", url);
  },
  deleteVoucher: (data) => {
    const url = API_URL.VOUCHER.DELETE_VOUCHER.replace(":id", data);
    return doRequest("delete", url);
  },
  addVoucher: (data) => {
    const url = API_URL.VOUCHER.ADD_VOUCHER;
    return doRequest("post", url, {data: data});
  },
};

export default voucherAPI;
