import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Icons from "../../../../components/Icons";
import "./NavbarAdmin.scss";
function NavbarAdmin(params) {
  const { t } = useTranslation();

  const handleMenu = () => {
    const displayMenu = document.getElementById("sidebar-left");
    const hiddenMenu = displayMenu.classList.contains("hidden-sidebar");
    
    if(hiddenMenu){
      displayMenu.classList.toggle("hidden-sidebar");
    }
    displayMenu.classList.toggle("display-sidebar");
  }

  return (
    <div className="custom-navbar-admin">
      <div className="menu-response" onClick={handleMenu}>
        <Icons.Menu color="white" />
      </div>
      <div className="nav-title">Quản lý nhân viên</div>

      <div className="nav-dropdown">
        <Icons.User />
      </div>
    </div>
  );
}

export default NavbarAdmin;
