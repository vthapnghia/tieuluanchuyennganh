import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Icons from "../../../../components/Icons";
import "./Sidebar.scss";
import PATH from "../../../../contanst/path";

function SideBar(params) {
  const { t } = useTranslation();
  const handleTurnOffMenu = () => {
    const Menu = document.getElementById("sidebar");
    const displayMenu = Menu.classList.contains("display-sidebar");
    if (displayMenu) {
      Menu.classList.toggle("display-sidebar");
    }
  };

  return (
    <div className="sidebar border-end d-flex flex-column" id="sidebar">
      <div className="arrow-left" onClick={handleTurnOffMenu}>
        <Icons.ArrowLeft />
      </div>
      <div className="sidebar-header">
        {t("logo")}
        <span>.</span>
      </div>
      <hr />
      <div className="sidebar-action">
        <div className="action-item">
          <Link to={"manage-customer"}>Quản lý khách hàng</Link>
        </div>
        <div className="action-item">
          <Link to={"manage-products"}>Quản lý sản phẩm</Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;