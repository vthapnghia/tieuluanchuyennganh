import axiosClient from "../axiosClient";
import { GENDER, KEY_STORAGE } from "../contanst/global";
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

const doRequest = async (method, url, data) => {
  let response = {};
  showLoading();
  if (method === "get") {
    response = await axiosClient.get(url);
  } else {
    if (method === "post") {
      response = await axiosClient.post(url, data);
    }
  }

  hideLoading();
  return response;
};

const optionsGender = [
  { value: 1, label: GENDER.MALE },
  { value: 2, label: GENDER.FELMALE },
  { value: 3, label: GENDER.OTHER },
];

export {
  isAuthenticated,
  storeJsonObject,
  getJsonObject,
  doRequest,
  optionsGender,
};
