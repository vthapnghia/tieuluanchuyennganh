import axiosClient from "../axiosClient";
import { KEY_STORAGE } from "../constants/global";
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

const doRequest = async (
  method,
  url,
  { data, isUploadImg, noLoading } = {}
) => {
  let response = {};
  const token = localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN);
  const reqHeader = {
    headers: {
      "Content-Type": isUploadImg ? "multipart/form-data" : "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  !noLoading && showLoading();
  try {
    switch (method) {
      case "get":
        response = await axiosClient.get(url, reqHeader);
        break;
      case "post":
        response = await axiosClient.post(url, data, reqHeader);
        break;
      case "put":
        response = await axiosClient.put(url, data, reqHeader);
        break;
      case "delete":
        response = await axiosClient.delete(url, reqHeader);
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

const getDayOfMonth = (month, year) => {
  const dayOfMonth = new Date(year, month, 0).getDate();
  let arrDayOfMonth = [];
  for (let index = 1; index <= dayOfMonth; index++) {
    arrDayOfMonth.push(index);
  }
  return arrDayOfMonth;
};

export {
  isAuthenticated,
  storeJsonObject,
  getJsonObject,
  doRequest,
  getDayOfMonth,
};

