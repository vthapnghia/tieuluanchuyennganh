import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import Icons from "../../../../components/Icons";
import PATH from "../../../../contanst/path";
import "./NavbarAdmin.scss";
import { Dropdown } from "react-bootstrap";
import Admin from './../../index';
function NavbarAdmin(params) {
  const { t } = useTranslation();
  const { pathname } = useLocation();

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
    if (pathname === PATH.ADMIN.CUSTOMER) {
      title = t("manage_customers");
    } else {
      title = t("manage_products");
    }
    return title;
  }, [pathname]);

  return (
    <div className="custom-navbar-admin">
      <div className="menu-response" onClick={handleMenu}>
        <Icons.Menu color="white" />
      </div>
      <div className="nav-title">{getTileNav}</div>

      <div className="nav-dropdown">
        <Dropdown>
          <Dropdown.Toggle variant="" id="dropdown-basic">
            <img className="admin-img" src="https://i1-dulich.vnecdn.net/2022/05/27/du-lich-Viet-Nam-3-1653637304.jpg?w=1200&h=0&q=100&dpr=2&fit=crop&s=tKgsN3j--Yx684u-cGFF-A"></img>
            Admin
          </Dropdown.Toggle>

          <Dropdown.Menu className="w-100 mt-2">
            <Dropdown.Item href="#/action-1">Đổi mật khẩu</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Đăng suất</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default NavbarAdmin;
