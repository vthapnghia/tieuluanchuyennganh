import API_URL from "../contanst/api"
import { CONFIGHEADER_1 } from "../contanst/global";
import { doRequest } from "../until/common";

const productAPI = {
    getALlProduct: () => {
        const url = API_URL.PRODUCT.ALL_PRODUCT;
        return doRequest("get", url, "", CONFIGHEADER_1);
    },
    getProductById: (data) => {
        const url = API_URL.PRODUCT.PRODUCT_BY_ID.replace(":id", data);
        return doRequest("get", url, CONFIGHEADER_1);
    }
}

export default productAPI;