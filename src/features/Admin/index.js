import SideBar from "./component/Sidebar";
import "./Admin.scss";
import Navbars from "./../../components/Navbars/index";

function Admin(props) {
  return (
    <div className="admin" style={{ background: "#eff2f1" }}>
      <Navbars />
      <SideBar />
      <div className="content-page">
        <div className="child-component">
          <props.component />
        </div>
      </div>
    </div>
  );
}

export default Admin;
