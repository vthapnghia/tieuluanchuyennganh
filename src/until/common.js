import axiosClient from "../axiosClient";
import { KEY_STORAGE } from "../contanst/global";
import { hideLoading, showLoading } from "../loading";

const isAuthenticated = () => {
  const token = localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN);
  if (!token) return false;
  return true;
};

const storeJsonObject = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getJsonObject = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return null;
  }
};

const doRequest = async (method, url, data, headers, noLoading) => {
  let response = {};
  !noLoading && showLoading();
  try {
    switch (method) {
      case "get":
        response = await axiosClient.get(url, headers);
        break;
      case "post":
        response = await axiosClient.post(url, data, headers);
        break;
      case "put":
          response = await axiosClient.put(url, data, headers);
        break;
      case "delete":
        response = await axiosClient.delete(url, headers);
        break;
      default:
        break;
    }
    !noLoading && hideLoading();
    return response;
  } catch (error) {
    !noLoading && hideLoading();
    return true;
  }
};

export { isAuthenticated, storeJsonObject, getJsonObject, doRequest };
