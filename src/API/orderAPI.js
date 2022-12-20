import API_URL from "../contanst/api"
import { CONFIGHEADER_1 } from "../contanst/global";
import { doRequest } from "../until/common";

const orderAPI = {
    createOrder: (data) => {
        const url = API_URL.ORDER.CREATE_ORDER;
        return doRequest("post", url, data, CONFIGHEADER_1);
    }
}

export default orderAPI;