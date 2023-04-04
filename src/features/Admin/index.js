import SideBar from "./component/Sidebar";
import "./Admin.scss";
import Navbars from "./../../components/Navbars/index";

function Admin(props) {
  return (
    <div className="admin">
      <SideBar />
      <div className="content-page">
        <Navbars />
        <div className="child-component">
          <props.component />
        </div>
        
      </div>
    </div>
  );
}

export default Admin;
