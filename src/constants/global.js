import Icons from "../components/Icons";
import PATH from "./path";

const KEY_STORAGE = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  SESSION_ID: "SESSION_ID",
  REFRESH_TOKEN: "REFRESH_TOKEN",
  CP_USER: "CP_USER",
  IS_ADMIN: "IS_ADMIN",
  IS_SELLER: "IS_SELLER",
};

const COLOR = {
  PRIMARY: "#95a5a6",
  WHITE: "#FFFFFF",
  DISABLED: "#9E9E9E",
  PRIMARY_LIGHT: "#FAE9E9",
  BLACK: "#222222",
  DISABLED_LIGHT: "#FAFBFC",
  ERROR: "#dc3545",
  GRAY_LIGHT: "#F5F5F5",
  GRAY: "#F0F0F0",
  GRAY_LABEL: "#616161",
  BLACK_DEFAULT: "#000000",
  GRAY_BG: "#E5E5E5",
  GRAY_2: "#757575",
  BG_INPUT: "#efefef",
  GOOGLE_COLOR: "#db4437",
  RED: 'red'
};

const GENDER = {
  MALE: "Nam",
  FEMALE: "Nữ"
};

const OPTION_GENDER = [
  { value: 1, label: GENDER.MALE },
  { value: 2, label: GENDER.FEMALE },
];

const OPTION_SIZE = [
  { value: 36, label: "36" },
  { value: 37, label: "37" },
  { value: 38, label: "38" },
  { value: 39, label: "39" },
  { value: 40, label: "40" },
  { value: 41, label: "41" },
];

const OPTION_TYPE = [
  { value: 1, label: "Giày" },
  { value: 2, label: "Dép" },
];

const OPTIONS_COLOR = [
  { value: "Xanh", label: "Xanh" },
  { value: "Xám", label: "Xám" },
  { value: "Vàng", label: "Vàng" },
  { value: "Đen", label: "Đen" },
  { value: "Hồng", label: "Hồng" },
  { value: "Tím", label: "Tím" },
  { value: "Đỏ", label: "Đỏ" },
  { value: "Trắng", label: "Trắng" },
  { value: "Camo", label: "Camo" },
  { value: "Nâu", label: "Nâu" },
  { value: "Sliver", label: "Sliver" },
  { value: "Xanh lá", label: "Xanh lá" },
];

const SORT_OPTION = [
  { value: "1", label: "Giá tăng dần" },
  { value: "-1", label: "Giá giảm dần" },
];

const SIDEBAR_PATH_SELLER = [
  { path: PATH.ADMIN.PRODUCTS.BASE, name: "Quản lý sản phẩm" ,icon: <Icons.Product height="22" width="22" color="#f13232"/>, color:"#f13232" },
  { path: PATH.ADMIN.BRAND.BASE, name: "Quản lý nhãn hiệu" ,icon: <Icons.Tags height="22" width="22" color="#bf53ee"/>, color:"#bf53ee"},
  { path: PATH.ADMIN.NEWS.BASE, name: "Quản lý bài viết" ,icon: <Icons.News height="22" width="22" color="#5450ee"/>, color:"#5450ee"},
  { path: PATH.ADMIN.SHIP.BASE, name: "Quản lý vận chuyển" ,icon: <Icons.TruckFast height="22" width="30" color="#93c4ee"/>, color:"#93c4ee"},
  { path: PATH.ADMIN.ORDER.BASE, name: "Quản lý đơn hàng" ,icon: <Icons.BoxOpen height="22" width="22" color="#41a8ee"/>, color:"#41a8ee"},
  { path: PATH.ADMIN.VOUCHER.BASE, name: "Quản lý khuyến mãi" ,icon: <Icons.Receipt height="22" width="22" color="#87ec4c"/>, color:"#87ec4c"},
  { path: PATH.ADMIN.REVENUE, name: "Doanh thu" ,icon: <Icons.Chart height="22" width="22" color="#cae549"/>, color:"#cae549"},
  { path: PATH.ADMIN.CHAT, name: "Chat" ,icon: <Icons.Messenger height="22" width="22" color="#dfa541"/>, color:"#dfa541"},
];

const SIDEBAR_PATH_ADMIN = [
  { path: PATH.ADMIN.ACCOUNT, name: "Quản lý tài khoản" },
];

const PAYMENT_OPTION = [
  { value: 1, label: "Thanh toán trực tiếp" },
  { value: 2, label: "Thanh toán online" },
];

const STATUS_ORDER_OPTION = [
  { value: 1, label: "Đã đặt hàng" },
  { value: 2, label: "Đang giao" },
  { value: 3, label: "Hoàn thành" },
];

const RATE = [1, 2, 3, 4, 5];

const OPTIONS_MONTH = [
  { value: 1, label: "Tháng 1" },
  { value: 2, label: "Tháng 2" },
  { value: 3, label: "Tháng 3" },
  { value: 4, label: "Tháng 4" },
  { value: 5, label: "Tháng 5" },
  { value: 6, label: "Tháng 6" },
  { value: 7, label: "Tháng 7" },
  { value: 8, label: "Tháng 8" },
  { value: 9, label: "Tháng 9" },
  { value: 10, label: "Tháng 10" },
  { value: 11, label: "Tháng 11" },
  { value: 12, label: "Tháng 12" },
];

const OPTIONS_YEAR = [
  { value: 2021, label: "Năm 2021" },
  { value: 2022, label: "Năm 2022" },
  { value: 2023, label: "Năm 2023" },
];

const CURRENT_DATE = new Date();

export {
  KEY_STORAGE,
  COLOR,
  GENDER,
  OPTION_GENDER,
  SIDEBAR_PATH_SELLER,
  SIDEBAR_PATH_ADMIN,
  OPTION_SIZE,
  OPTION_TYPE,
  OPTIONS_COLOR,
  PAYMENT_OPTION,
  SORT_OPTION,
  STATUS_ORDER_OPTION,
  RATE,
  OPTIONS_MONTH,
  CURRENT_DATE,
  OPTIONS_YEAR,
};
