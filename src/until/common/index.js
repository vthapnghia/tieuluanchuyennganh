import { KEY_STORAGE } from "../../contanst/global";

const isAuthenticated = () => {
    const token = localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN);
    if (!token) return false;
    return true;
};

export {
    isAuthenticated,
}