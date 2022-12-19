import API_URL from "../contanst/api";
import { CONFIGHEADER_1 } from "../contanst/global";
import { doRequest } from "../until/common";

const userAPI = {
  login: (data) => {
    const url = API_URL.LOGIN;
    return doRequest("post", url, data, CONFIGHEADER_1);
  },
  register: (data) => {
    const url = API_URL.REGISTER;
    return doRequest("post", url, data, CONFIGHEADER_1);
  },
  getUser: (data) => {
    const url = API_URL.USER;
    return doRequest("get", url, "", CONFIGHEADER_1);
  },
};

export default userAPI;
