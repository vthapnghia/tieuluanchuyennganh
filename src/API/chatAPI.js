import API_URL from "../constants/api";
import { doRequest } from "../until/common";

const chatAPI = {
  getAllChat: () => {
    const url = API_URL.CHAT.ALL;
    return doRequest("get", url, { noLoading: true });
  },
  getAllChatAdmin: () => {
    const url = API_URL.CHAT.ADMIN;
    return doRequest("get", url);
  },
  sendMessage: (data) => {
    const url = API_URL.CHAT.SEND;
    return doRequest("post", url, { data, noLoading: true });
  },
};

export default chatAPI;
