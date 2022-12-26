import Icons from "../../../../components/Icons";
import "./Sidebar.scss";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  SIDEBAR_PATH_ADMIN,
  SIDEBAR_PATH_SELLER,
} from "../../../../contanst/global";
import { shoe } from "../../../../assets/img";
import { useAuth } from "../../../../until/hooks";

function SideBar(params) {
  const navigate = useNavigate();
  const { is_admin, is_seller } = useAuth();

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
        <img src={shoe} alt="img" />
      </div>
      <hr />
      <div className="sidebar-action">
        {is_seller &&
          SIDEBAR_PATH_SELLER.map((item, index) => {
            return (
              <div className="action-item" key={index}>
                <div onClick={() => handleMenu(item.path)}>{item.name}</div>
              </div>
            );
          })}
        {is_admin &&
          SIDEBAR_PATH_ADMIN.map((item, index) => {
            return (
              <div className="action-item" key={index}>
                <div onClick={() => handleMenu(item.path)}>{item.name}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SideBar;
