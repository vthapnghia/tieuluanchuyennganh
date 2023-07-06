import Icons from "../../../../components/Icons";
import "./Sidebar.scss";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  SIDEBAR_PATH_ADMIN,
  SIDEBAR_PATH_SELLER,
} from "../../../../constants/global";
import { useAuth } from "../../../../until/hooks";
import { useState } from "react";

function SideBar() {
  const navigate = useNavigate();
  const { is_admin } = useAuth();
  const [active, setActive] = useState(0);

  const handleTurnOffMenu = useCallback(() => {
    const Menu = document.getElementById("sidebar");
    const displayMenu = Menu.classList.contains("display-sidebar");
    if (displayMenu) {
      Menu.classList.toggle("display-sidebar");
    }
  }, []);

  const handleMenu = useCallback(
    (path, index) => {
      handleTurnOffMenu();
      navigate(path);
      setActive(index);
    },
    [handleTurnOffMenu, navigate]
  );

  return (
    <div className="sidebar border-end d-flex flex-column" id="sidebar">
      <div className="arrow-left" onClick={handleTurnOffMenu}>
        <Icons.ArrowLeft />
      </div>
      <div className="sidebar-action">
        {!is_admin
          ? SIDEBAR_PATH_SELLER.map((item, index) => {
              return (
                <div
                  className={`action-item ${active === index ? "active" : ""}`}
                  key={index}
                  onClick={() => handleMenu(item.path, index)}
                >
                  <span>{item.name}</span>
                </div>
              );
            })
          : SIDEBAR_PATH_ADMIN.map((item, index) => {
              return (
                <div
                  className={`action-item ${active === index ? "active" : ""}`}
                  key={index}
                  onClick={() => handleMenu(item.path, index)}
                >
                  <span>{item.name}</span>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default SideBar;
