import axiosClient from "../axiosClient";
import API_URL from "../contanst/api";

const userApi = {
  login: (data) => {
    const url = API_URL.USER.LOGIN;
    return axiosClient.post(url, data);
  },
};

export default userApi;
