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
  verifyRegister: (param) => {
    const { data, id } = param;
    const url = API_URL.VERIFY_REGISTER.replace(":id", id);
    return doRequest("post", url, data, CONFIGHEADER_1)
  },
  getCodeResetPass: (data) => {
    const url = API_URL.RESET_PASSWORD.BASE;
    return doRequest("post", url, data, CONFIGHEADER_1)
  },
  resetPasswordVerify: (data) => {
    const url = API_URL.RESET_PASSWORD.VERIFY;
    return doRequest("post", url, data, CONFIGHEADER_1)
  }
};

export default userAPI;
