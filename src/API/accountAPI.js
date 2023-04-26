import API_URL from "../constants/api";
import { doRequest } from "../until/common";

const accountAPI = {
  getAllAccount: (data) => {
    const url = API_URL.USER.GET_ALL_ACCOUNT;
    return doRequest("get", url);
  },
  deleteAccount: (data) => {
    const url = API_URL.USER.DELETE_ACCOUNT.replace(":id", data);
    return doRequest("delete", url);
  },

  searchAccount: (data) => {
    const url = API_URL.USER.SEARCH_ACCOUNT.concat(`?search=${data}`);
    return doRequest("get", url);
  },
};

export default accountAPI;
