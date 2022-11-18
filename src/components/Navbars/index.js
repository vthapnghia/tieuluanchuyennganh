import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import PATH from "../../contanst/path";
import Icons from "../Icons";
import "./Navbars.scss";
import { Dropdown } from "react-bootstrap";
import { useMemo } from 'react';

function Navbars() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const is_superuser = false;

  const handleMenu = () => {
    const displayMenu = document.getElementById("sidebar");
    const hiddenMenu = displayMenu.classList.contains("hidden-sidebar");

    if (hiddenMenu) {
      displayMenu.classList.toggle("hidden-sidebar");
    }
    displayMenu.classList.toggle("display-sidebar");
  };

  const getTileNav = useMemo(() => {
    let title = "";
    if (pathname === "/admin/manage-customer") {
      title = t("manage_customers");
    } else {
      title = t("manage_products");
    }
    return title;
  }, [pathname]);

  return (
    <>
      {is_superuser ? (
        <div className="custom-navbar-admin">
          <div className="menu-response" onClick={handleMenu}>
            <Icons.Menu color="white" />
          </div>
          <div className="nav-title">{getTileNav}</div>

          <div className="nav-dropdown">
            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic">
                <img
                  className="admin-img"
                  src="https://i1-dulich.vnecdn.net/2022/05/27/du-lich-Viet-Nam-3-1653637304.jpg?w=1200&h=0&q=100&dpr=2&fit=crop&s=tKgsN3j--Yx684u-cGFF-A"
                ></img>
                Admin
              </Dropdown.Toggle>

              <Dropdown.Menu className="w-100 mt-2">
                <Dropdown.Item href="#/action-1">Đổi mật khẩu</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Đăng suất</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      ) : (
        <nav className="custom-navbar navbar navbar-expand-md navbar-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              {t("logo")}
              <span>.</span>
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
                  <Link className="nav-link" to="/">
                    About us
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/">
                    Services
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/Blog">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/Contact">
                    Contact us
                  </Link>
                </li>
              </ul>

              <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
                <li>
                  <Link className="nav-link" to={PATH.CART}>
                    <Icons.Cart />
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to={PATH.LOGIN}>
                    <Icons.User />
                  </Link>
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
