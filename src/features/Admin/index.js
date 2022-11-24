import SideBar from "./component/Sidebar";
import "./Admin.scss";
import Navbars from "./../../components/Navbars/index";
import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <div className="admin">
      <SideBar />
      <Navbars />
      <div className="content-page">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
