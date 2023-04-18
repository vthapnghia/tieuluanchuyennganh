import { useLocation, useNavigate } from "react-router-dom";
import PATH from "../../../../contanst/path";
import Profile from "../Profile";
import UserOrders from "../UserOrders";
import "./Account.scss";
import { t } from "i18next";
import { avatar_default } from "../../../../assets/img";

function Account() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = (index) => {
    navigate(index === 1 ? PATH.PROFILE : PATH.USER_ORDERS.BASE);
  };

  return (
    <div className="account">
      <div className="account-navbar row">
        <div className="col col-md-2 d-flex">
        </div>
        <div className="name-component p-0 col col-md-10">
          {pathname === PATH.PROFILE
            ? t("info_account")
            : t("order_management")}
        </div>
      </div>
      <div className="row">
        <div className="account-sidebar col col-md-2">
          <div className="account-option">
            <div
              className={`option ${pathname === PATH.PROFILE ? "is-active" : ""}`}
              onClick={() => handleClick(1)}
            >
              {t("info_account")}
            </div>
            <div
              className={`option ${pathname === PATH.USER_ORDERS.BASE ? "is-active" : ""}`}
              onClick={() => handleClick(2)}
            >
              {t("order_management")}
            </div>
          </div>
        </div>
        <div className="account-component col col-md-10">
          {pathname === PATH.PROFILE ? <Profile /> : <UserOrders />}
        </div>
      </div>
    </div>
  );
}

export default Account;
