import API_URL from "../contanst/api";
import { CONFIGHEADER_2 } from "../contanst/global";
import { doRequest } from "../until/common";

const rateAPI = {
  createRate: (data) => {
    const url = API_URL.RATE.CREATE_RATE;
    return doRequest("post", url, data, CONFIGHEADER_2);
  },
 
};

export default rateAPI;
