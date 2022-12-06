import API_URL from "../contanst/api";
import { CONFIGHEADER_1, CONFIGHEADER_2 } from "../contanst/global";
import { doRequest } from "../until/common";

const newsAPI = {
    getAllNews: () => {
        const url = API_URL.NEWS.ALL_NEWS;
        return doRequest("get", url, "", CONFIGHEADER_1);
    },
    getNewsById: (data) => {
        const url = API_URL.NEWS.NEWS_BY_ID.replace(":id", data);
        return doRequest("get", url, "", CONFIGHEADER_1)
    },
    addNews: (data) => {
        const url = API_URL.NEWS.ADD_NEWS;
        return doRequest("post", url, data, CONFIGHEADER_2)
    },
    updateNews: (data) => {
        const {formData, id} = data;
        const url = API_URL.NEWS.UPDATE_NEWS.replace(":id", id);
        return doRequest("put", url, formData, CONFIGHEADER_2)
    },
    deleteNews: (data) => {
        const url = API_URL.NEWS.DELETE_NEWS.replace(":id", data);
        return doRequest("delete", url, "", CONFIGHEADER_1)
    }
}

export default newsAPI;