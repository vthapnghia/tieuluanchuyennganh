import API_URL from "../constants/api";
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
  getVoucherById: (data) => {
    const url = API_URL.VOUCHER.GET_VOUCHER_BY_ID.replace(":id", data);
    return doRequest("get", url );
  },
  updateVoucher: (param) => {
    const {id, data} = param;
    const url = API_URL.VOUCHER.UPDTAE_VOUCHER.replace(":id", id);
    return doRequest("put", url, {data: data} );
  },
};

export default voucherAPI;
