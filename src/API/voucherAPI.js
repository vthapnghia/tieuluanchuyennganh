import API_URL from "../contanst/api";
import { doRequest } from "../until/common";

const voucherAPI = {
  getAllVoucher: (data) => {
    const url = API_URL.VOUCHER.GET_ALL_VOUCHER;
    return doRequest("get", url);
  },
  
};

export default voucherAPI;
