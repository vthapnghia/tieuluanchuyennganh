import API_URL from "../constants/api";
import { doRequest } from "../until/common";

const chatAPI = {
  getAllChat: () => {
    const url = API_URL.CHAT.ALL;
    return doRequest("get", url);
  },
  sendMessage: (data) => {
    const url = API_URL.CHAT.SEND;

    console.log(data);
    return doRequest("post", url, {data});
  },
};

export default chatAPI;
