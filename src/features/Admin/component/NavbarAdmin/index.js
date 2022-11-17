import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import Icons from "../../../../components/Icons";
import PATH from "../../../../contanst/path";
import "./NavbarAdmin.scss";
import { Dropdown } from "react-bootstrap";
function NavbarAdmin(params) {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const handleMenu = () => {
    const displayMenu = document.getElementById("sidebar-left");
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
    console.log(pathname);
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
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu className="w-100">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default NavbarAdmin;
