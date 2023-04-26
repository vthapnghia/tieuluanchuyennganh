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

const removeVietnameseAccents = (str) => {
  // Map các ký tự tiếng Việt có dấu sang không dấu tương ứng
  const map = {
    à: "a",
    á: "a",
    ả: "a",
    ã: "a",
    ạ: "a",
    ă: "a",
    ằ: "a",
    ắ: "a",
    ẳ: "a",
    ẵ: "a",
    ặ: "a",
    â: "a",
    ầ: "a",
    ấ: "a",
    ẩ: "a",
    ẫ: "a",
    ậ: "a",
    đ: "d",
    è: "e",
    é: "e",
    ẻ: "e",
    ẽ: "e",
    ẹ: "e",
    ê: "e",
    ề: "e",
    ế: "e",
    ể: "e",
    ễ: "e",
    ệ: "e",
    ì: "i",
    í: "i",
    ỉ: "i",
    ĩ: "i",
    ị: "i",
    ò: "o",
    ó: "o",
    ỏ: "o",
    õ: "o",
    ọ: "o",
    ô: "o",
    ồ: "o",
    ố: "o",
    ổ: "o",
    ỗ: "o",
    ộ: "o",
    ơ: "o",
    ờ: "o",
    ớ: "o",
    ở: "o",
    ỡ: "o",
    ợ: "o",
    ù: "u",
    ú: "u",
    ủ: "u",
    ũ: "u",
    ụ: "u",
    ư: "u",
    ừ: "u",
    ứ: "u",
    ử: "u",
    ữ: "u",
    ự: "u",
    ỳ: "y",
    ý: "y",
    ỷ: "y",
    ỹ: "y",
    ỵ: "y",
  };

  // Thay thế các ký tự tiếng Việt có dấu thành không dấu
  str = str.toLowerCase();
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += map[str[i]] || str[i];
  }

  return result;
};

export {
  isAuthenticated,
  storeJsonObject,
  getJsonObject,
  doRequest,
  getDayOfMonth,
  removeVietnameseAccents,
};
