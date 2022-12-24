import API_URL from "../contanst/api";
import { doRequest } from "../until/common";

const userAPI = {
  login: (data) => {
    const url = API_URL.LOGIN;
    return doRequest("post", url, { data: data });
  },
  firstLogin: (data) => {
    const url = API_URL.USER.FIRST_LOGIN;
    return doRequest("post", url, { data: data, isUploadImg: true });
  },
  register: (data) => {
    const url = API_URL.REGISTER;
    return doRequest("post", url, { data: data });
  },
  getUser: (data) => {
    const url = API_URL.USER.GET_USER;
    return doRequest("get", url);
  },
  updateUser: (data) => {
    const url = API_URL.USER.UPDATE_USER;
    return doRequest("put", url, { data: data, isUploadImg: true });
  },
  verifyRegister: (param) => {
    const { data, id } = param;
    const url = API_URL.VERIFY_REGISTER.replace(":id", id);
    return doRequest("post", url, { data: data });
  },
  getCodeResetPass: (data) => {
    const url = API_URL.RESET_PASSWORD.BASE;
    return doRequest("post", url, { data: data });
  },
  resetPasswordVerify: (data) => {
    const url = API_URL.RESET_PASSWORD.VERIFY;
    return doRequest("post", url, { data: data });
  },
};

export default userAPI;
