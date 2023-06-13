import { useLocation, useNavigate, useParams } from "react-router-dom";
import PATH from "../../../../constants/path";
import Profile from "../Profile";
import UserOrders from "../UserOrders";
import "./Account.scss";
import { t } from "i18next";
import OrderDetail from "../UserOrders/OrderDetail";

function Account() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClick = (index) => {
    navigate(index === 1 ? PATH.PROFILE : PATH.USER_ORDERS.BASE);
  };

  return (
    <div className="account">
      <div className="account-navbar row">
        <div className="col-12 col-sm-12 col-md-3 col-lg-2"></div>
        <div className="name-component col-12 col-sm-12 col-md-9  col-lg-10">
          {pathname === PATH.PROFILE
            ? t("info_account")
            : pathname === PATH.USER_ORDERS.BASE
            ? t("order_management")
            : t("order_detail", { param: id })}
        </div>
      </div>
      <div className="row">
        <div className="account-sidebar col-12 col-sm-12 col-md-3 col-lg-2">
          <div className="account-option">
            <div
              className={`option ${
                pathname === PATH.PROFILE ? "is-active" : ""
              }`}
              onClick={() => handleClick(1)}
            >
              {t("info_account")}
            </div>
            <div
              className={`option ${
                pathname === PATH.USER_ORDERS.BASE ? "is-active" : ""
              }`}
              onClick={() => handleClick(2)}
            >
              {t("order_management")}
            </div>
          </div>
        </div>
        <div className="account-component col-12 col-sm-12 col-md-9  col-lg-10">
          {pathname === PATH.PROFILE ? (
            <Profile />
          ) : pathname === PATH.USER_ORDERS.BASE ? (
            <UserOrders />
          ) : (
            <OrderDetail />
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
