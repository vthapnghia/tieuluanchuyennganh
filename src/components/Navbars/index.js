import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PATH from "../../contanst/path";
import Icons from "../Icons";
import "./Navbars.scss";
import { DropdownButton } from "react-bootstrap";
import { useMemo, useCallback, useEffect } from "react";
import { useAuth } from "../../until/hooks";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/Authentication/authSlice";
import { getCart } from "../../features/User/pages/Cart/cartSlice";

function Navbars() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { is_admin, userAuth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.cart.count);

  const handleMenu = useCallback(() => {
    const displayMenu = document.getElementById("sidebar");
    const hiddenMenu = displayMenu.classList.contains("hidden-sidebar");

    if (hiddenMenu) {
      displayMenu.classList.toggle("hidden-sidebar");
    }
    displayMenu.classList.toggle("display-sidebar");
  }, []);

  const getTileNav = useMemo(() => {
    let title = "";
    if (pathname === "/admin/manage-customer") {
      title = t("manage_customers");
    } else {
      title = t("manage_products");
    }
    return title;
  }, [pathname, t]);

  const handleLogout = useCallback(() => {
    dispatch(logout()).then((res) => {
      navigate(PATH.HOME);
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    if (userAuth && !is_admin) {
      dispatch(getCart());
    }
  }, [dispatch, userAuth, is_admin]);

  return (
    <>
      {is_admin ? (
        <div className="custom-navbar-admin">
          <div className="menu-response" onClick={handleMenu}>
            <Icons.Menu color="white" />
          </div>
          <div className="nav-title">{getTileNav}</div>

          <div className="nav-dropdown">
            <DropdownButton
              id="dropdown-basic-button"
              title={
                <img
                  className="admin-img"
                  alt="img"
                  src="https://i1-dulich.vnecdn.net/2022/05/27/du-lich-Viet-Nam-3-1653637304.jpg?w=1200&h=0&q=100&dpr=2&fit=crop&s=tKgsN3j--Yx684u-cGFF-A"
                ></img>
              }
            >
              <Link className="dropdown-item" to="/">
                {t("forgot_password")}
              </Link>
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
        <nav className="custom-navbar navbar navbar-expand-md navbar-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              {t("logo")}
              <span>.</span>
            </Link>

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
                  <Link className="nav-link" to="/">
                    About us
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/blog">
                    Blog
                  </Link>
                </li>
              </ul>

              <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
                <li>
                  <Link className="nav-link" to={PATH.CART}>
                    <Icons.Cart />
                    {count > 0 ? (
                      <span className="quanlity-cart">{count}</span>
                    ) : (
                      <></>
                    )}
                  </Link>
                </li>
                <li>
                  {userAuth ? (
                    <DropdownButton
                      id="dropdown-basic-button"
                      title={
                        <img
                          className="user-img"
                          alt="img"
                          src="https://i1-dulich.vnecdn.net/2022/05/27/du-lich-Viet-Nam-3-1653637304.jpg?w=1200&h=0&q=100&dpr=2&fit=crop&s=tKgsN3j--Yx684u-cGFF-A"
                        ></img>
                      }
                    >
                      <Link className="dropdown-item" to={PATH.PROFILE}>
                        {t("profile")}
                      </Link>
                      <span
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={handleLogout}
                      >
                        {t("logout")}
                      </span>
                    </DropdownButton>
                  ) : (
                    <Link className="nav-link icon-user" to={PATH.LOGIN}>
                      <Icons.User />
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbars;
