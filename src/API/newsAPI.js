import API_URL from "../constants/api";
import { doRequest } from "../until/common";

const newsAPI = {
  getAllNews: () => {
    const url = API_URL.NEWS.ALL_NEWS;
    return doRequest("get", url);
  },
  getNewsById: (data) => {
    const url = API_URL.NEWS.NEWS_BY_ID.replace(":id", data);
    return doRequest("get", url);
  },
  addNews: (data) => {
    const url = API_URL.NEWS.ADD_NEWS;
    return doRequest("post", url, { data: data, isUploadImg: true });
  },
  updateNews: (data) => {
    const { formData, id } = data;
    const url = API_URL.NEWS.UPDATE_NEWS.replace(":id", id);
    return doRequest("put", url, { data: formData, isUploadImg: true });
  },
  deleteNews: (data) => {
    const url = API_URL.NEWS.DELETE_NEWS.replace(":id", data);
    return doRequest("delete", url);
  },
};

export default newsAPI;
