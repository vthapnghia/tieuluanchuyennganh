import SideBar from "./component/Sidebar";
import Products from "./pages/Products";
import "./Admin.scss";
import Navbars from "./../../components/Navbars/index";
import { Route, Routes } from "react-router-dom";
import PATH from "../../contanst/path";
function Admin(params) {
  return (
    <div className="admin">
      <SideBar />
      <Navbars />
      <div className="content-page">
        <Routes>
          <Route path={PATH.ADMIN.CUSTOMER} element={<Products />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
