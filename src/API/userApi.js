import API_URL from "../contanst/api";
import { doRequest } from "../until/common";

const userAPI = {
  login: async (data) => {
    const url = API_URL.LOGIN;
    return doRequest("post", url, data);
  },
};

export default userAPI;
