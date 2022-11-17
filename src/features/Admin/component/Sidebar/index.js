import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Icons from "../../../../components/Icons";
import "./Sidebar.scss";
function SideBar(params) {
  const { t } = useTranslation();
  const handleTurnOffMenu = () => {
    const Menu = document.getElementById("sidebar-left");
    const displayMenu = Menu.classList.contains("display-sidebar");
    if (displayMenu) {
      Menu.classList.toggle("display-sidebar");
    }
    Menu.classList.toggle("hidden-sidebar");
  };
  return (
    <div
      className="sidebar border-end d-flex flex-column"
      style={{ height: "100vh" }}
    >
      <div className="arrow-left" onClick={handleTurnOffMenu}>
        <Icons.ArrowLeft />
      </div>
      <div className="sidebar-header">
        {t("logo")}
        <span>.</span>
      </div>
      <hr />
      <div className="sidebar-action">
        <div className="action-item">Quản lý nhân viên</div>
        <div className="action-item">Quản lý nhân viên</div>
        <div className="action-item">Quản lý nhân viên</div>
      </div>
    </div>
  );
}

export default SideBar;
