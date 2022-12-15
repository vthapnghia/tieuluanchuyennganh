import API_URL from "../contanst/api";
import { CONFIGHEADER_1 } from "../contanst/global";
import { doRequest } from "../until/common";

const shipAPI = {
  getALLShip: (data) => {
    const url = API_URL.SHIP.ALL_SHIP;
    return doRequest("get", url, data, CONFIGHEADER_1);
  },
  getShipById: (data) => {
    const url = API_URL.SHIP.SHIP_BY_ID.replace(":id", data);
    return doRequest("get", url, data, CONFIGHEADER_1);
  },
  addShip: (data) => {
    const url = API_URL.SHIP.ADD_SHIP;
    return doRequest("post", url, data, CONFIGHEADER_1);
  },
  removeShip: (data) => {
    const url = API_URL.SHIP.REMOVE_SHIP.replace(":id", data);
    return doRequest("delete", url, "", CONFIGHEADER_1);
  },
  uploadShip: (param) => {
    const { data, id } = param;
    const url = API_URL.SHIP.UPLOAD_SHIP.replace(":id", id);
    return doRequest("put", url, data, CONFIGHEADER_1);
  },
};

export default shipAPI;
