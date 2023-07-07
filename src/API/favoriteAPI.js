import API_URL from "../constants/api";
import { doRequest } from "../until/common";

const favoriteAPI = {
  getAllFavorites: (data) => {
    const url = API_URL.FAVORITE.ALL;
    return doRequest("get", url);
  },
  like: (data) => {
    const url = API_URL.FAVORITE.LIKE;
    return doRequest("post", url, data);
  },
};

export default favoriteAPI;
