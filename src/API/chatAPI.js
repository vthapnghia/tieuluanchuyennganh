import API_URL from "../constants/api";
import { doRequest } from "../until/common";

const chatAPI = {
  getAllChat: (data) => {
    const url = `${API_URL.CHAT.ALL}${data ? `?user_id=${data.id}` : ""}`;
    return doRequest("get", url, { noLoading: true });
  },
  getAllChatAdmin: () => {
    const url = API_URL.CHAT.ADMIN;
    return doRequest("get", url, { noLoading: true });
  },
  getIsRead: () => {
    const url = API_URL.CHAT.IS_READ;
    return doRequest("get", url, { noLoading: true });
  },
  sendMessage: (data) => {
    const url = API_URL.CHAT.SEND;
    return doRequest("post", url, {
      data: data,
      noLoading: true,
      isUploadImg: true,
    });
  },
};

export default chatAPI;
