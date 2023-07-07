import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
import Icons from "../Icons";
import "./Navbars.scss";
import { DropdownButton } from "react-bootstrap";
import { useMemo, useCallback, useEffect } from "react";
import { useAuth } from "../../until/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCart,
  removeCart,
} from "../../features/User/pages/Cart/cartSlice";
import {
  SIDEBAR_PATH_ADMIN,
  SIDEBAR_PATH_SELLER,
} from "../../constants/global";
import { avatar_default, shoe, shoe_bg } from "../../assets/img";
import {
  logout,
  setShowLogin,
  setShowPassNew,
  setShowProfile,
  setShowReset,
  setShowVerify,
} from "../../features/Authentication/authSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Person2Icon from "@mui/icons-material/Person2";
import ModalCommon from "../ModalCommon";
import Profile from "../../features/User/pages/Profile";
import Login from "../../features/Authentication/page/Login";
import VerifyRegister from "../../features/Authentication/page/VerifyRegister";
import ResetPassword from "../../features/Authentication/page/ResetPassword";
import Verify from "../../features/Authentication/page/ResetPassword/Verify";

function Navbars() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { is_admin, userAuth, is_seller } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.cart.count);
  const showLogin = useSelector((state) => state.auth.showLogin);
  const showProfile = useSelector((state) => state.auth.showProfile);
  const showVerify = useSelector((state) => state.auth.showVerify);
  const showReset = useSelector((state) => state.auth.showReset);
  const showPassNew = useSelector((state) => state.auth.showPassNew);

  const handleMenu = useCallback(() => {
    const displayMenu = document.getElementById("sidebar");
    const hiddenMenu = displayMenu.classList.contains("hidden-sidebar");

    if (hiddenMenu) {
      displayMenu.classList.toggle("hidden-sidebar");
    }
    displayMenu.classList.toggle("display-sidebar");
  }, []);

  const getTileNav = useMemo(() => {
    let title = t("manage_products");
    const pathSideBar = SIDEBAR_PATH_SELLER.concat(SIDEBAR_PATH_ADMIN);
    const pathBySidebar = pathSideBar.find((itemPath) => {
      return itemPath.path === pathname;
    });
    if (pathBySidebar) {
      title = pathBySidebar.name;
    }
    if (pathname.includes(PATH.ADMIN.ORDER.ORDER_DETAIL.replace(":id", ""))) {
      title = "Chi tiết đơn hàng";
    }
    return title;
  }, [pathname, t]);

  const handleLogout = useCallback(() => {
    dispatch(logout()).then((res) => {
      navigate(PATH.HOME);
      dispatch(removeCart());
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    if (userAuth && !is_admin && !is_seller) {
      dispatch(getAllCart());
    }
  }, [dispatch, userAuth, is_admin, is_seller]);

  return (
    <>
      {is_admin || is_seller ? (
        <div className="custom-navbar-admin">
          <div className="menu-response" onClick={handleMenu}>
            <Icons.Menu color="black" />
          </div>
          <div className="nav-title">{getTileNav}</div>

          <div className="nav-dropdown">
            <DropdownButton
              id="dropdown-basic-button"
              title={
                <img
                  className="admin-img"
                  alt="img"
                  src={userAuth?.avatar || shoe_bg}
                ></img>
              }
            >
              <span
                className="dropdown-item"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              >
                {t("logout")}
              </span>
            </DropdownButton>
          </div>
        </div>
      ) : (
        <nav
          className="custom-navbar navbar navbar-expand-md"
          arial-label="navigation bar"
        >
          <div className="container">
            <Link className="navbar-brand" to="/" style={{ height: "100%" }}>
              <img src={shoe} alt="img" height={"100%"} width={"auto"} />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsFurni"
              aria-controls="navbarsFurni"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarsFurni">
              <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
                <li>
                  <Link className="nav-link" to={PATH.HOME}>
                    {t("home")}
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to={PATH.PRODUCT.LIST_PRODUCT}>
                    {t("product")}
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to={PATH.NEWS.LIST_NEWS}>
                    {t("news")}
                  </Link>
                </li>
              </ul>

              <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
                {userAuth ? (
                  <li>
                    <Link className="nav-link cart-icon" to={PATH.CART}>
                      <ShoppingCartIcon />
                      {count > 0 ? (
                        <span className="quantity-cart">{count}</span>
                      ) : (
                        <></>
                      )}
                    </Link>
                    <Link className="nav-link cart-title" to={PATH.CART}>
                      Giỏ hàng
                    </Link>
                  </li>
                ) : (
                  <li>
                    <div className="nav-link cart-icon">
                      <ShoppingCartIcon
                        onClick={() => dispatch(setShowLogin())}
                      />
                    </div>
                    <div
                      className="nav-link cart-title"
                      onClick={() => dispatch(setShowLogin())}
                    >
                      Giỏ hàng
                    </div>
                  </li>
                )}
                <li>
                  {userAuth ? (
                    <>
                      <DropdownButton
                        id="dropdown-basic-button-response"
                        title="Tài khoản"
                      >
                        <div
                          className="dropdown-item"
                          onClick={() => dispatch(setShowProfile())}
                        >
                          {t("profile")}
                        </div>
                        <Link
                          className="dropdown-item"
                          to={PATH.USER_ORDERS.BASE}
                        >
                          {t("my_order")}
                        </Link>
                        <span
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={handleLogout}
                        >
                          {t("logout")}
                        </span>
                      </DropdownButton>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title={
                          <>
                            <img
                              className="user-img"
                              alt="img"
                              src={userAuth.avatar || avatar_default}
                            />
                          </>
                        }
                      >
                        <div
                          className="dropdown-item"
                          onClick={() => dispatch(setShowProfile())}
                        >
                          {t("profile")}
                        </div>
                        <Link
                          className="dropdown-item"
                          to={PATH.USER_ORDERS.BASE}
                        >
                          {t("my_order")}
                        </Link>
                        <span
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={handleLogout}
                        >
                          {t("logout")}
                        </span>
                      </DropdownButton>
                    </>
                  ) : (
                    <div
                      className="nav-link icon-user"
                      onClick={() => dispatch(setShowLogin())}
                    >
                      <Person2Icon />
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <ModalCommon
            show={showProfile}
            modalTitle={null}
            modalBody={<Profile />}
            handleConfirm={() => {}}
            handleCloseModal={() => dispatch(setShowProfile())}
          />
          <ModalCommon
            show={showLogin}
            modalTitle={null}
            modalBody={<Login />}
            handleConfirm={() => {}}
            handleCloseModal={() => dispatch(setShowLogin())}
          />
          <ModalCommon
            show={showVerify}
            modalTitle={null}
            modalBody={<VerifyRegister />}
            handleConfirm={() => {}}
            handleCloseModal={() => dispatch(setShowVerify())}
          />
          <ModalCommon
            show={showReset}
            modalTitle={null}
            modalBody={<ResetPassword />}
            handleConfirm={() => {}}
            handleCloseModal={() => dispatch(setShowReset())}
          />
          <ModalCommon
            show={showPassNew}
            modalTitle={null}
            modalBody={<Verify />}
            handleConfirm={() => {}}
            handleCloseModal={() => dispatch(setShowPassNew())}
          />
        </nav>
      )}
    </>
  );
}

export default Navbars;
