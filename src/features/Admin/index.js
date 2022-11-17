import SideBar from "./component/Sidebar";
import Navbars from "./../../components/Navbars/index";
import NavbarAdmin from "./component/NavbarAdmin/index";

function Admin(params) {
  return (
    <div className="d-flex flex-row">
      <div className="">
        <SideBar />
      </div>
      <div>
        <div>
          <NavbarAdmin />
        </div>
        <div>
          <div className="container"></div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
