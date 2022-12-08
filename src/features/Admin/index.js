import SideBar from "./component/Sidebar";
import "./Admin.scss";
import Navbars from "./../../components/Navbars/index";

function Admin(props) {
  return (
    <div className="admin">
      <SideBar />
      <Navbars />
      <div className="content-page">
        <props.component />
      </div>
    </div>
  );
}

export default Admin;
