import { useTranslation } from "react-i18next";
import Icons from "../../../../components/Icons";
import "./Sidebar.scss";
import { useCallback } from "react";
import PATH from "../../../../contanst/path";
import { useNavigate } from "react-router-dom";
import { SIDEBAR_PATH } from "../../../../contanst/global";

function SideBar(params) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleTurnOffMenu = useCallback(() => {
    const Menu = document.getElementById("sidebar");
    const displayMenu = Menu.classList.contains("display-sidebar");
    if (displayMenu) {
      Menu.classList.toggle("display-sidebar");
    }
  }, []);

  const handleMenu = useCallback(
    (path) => {
      handleTurnOffMenu();
      navigate(path);
    },
    [handleTurnOffMenu, navigate]
  );
  
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
        {SIDEBAR_PATH.map((item, index) => (
          <div className="action-item" key={index}>
            <div onClick={() => handleMenu(item.path)}>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
