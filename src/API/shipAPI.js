import API_URL from "../constants/api";
import { doRequest } from "../until/common";

const shipAPI = {
  getALLShip: (data) => {
    const url = API_URL.SHIP.ALL_SHIP;
    return doRequest("get", url, {data: data});
  },
  getShipById: (data) => {
    const url = API_URL.SHIP.SHIP_BY_ID.replace(":id", data);
    return doRequest("get", url, {data: data});
  },
  addShip: (data) => {
    const url = API_URL.SHIP.ADD_SHIP;
    return doRequest("post", url, {data: data});
  },
  removeShip: (data) => {
    const url = API_URL.SHIP.REMOVE_SHIP.replace(":id", data);
    return doRequest("delete", url);
  },
  uploadShip: (param) => {
    const { data, id } = param;
    const url = API_URL.SHIP.UPLOAD_SHIP.replace(":id", id);
    return doRequest("put", url, {data: data});
  },
};

export default shipAPI;
