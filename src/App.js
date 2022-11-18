import { Route, Routes, useLocation, Outlet } from "react-router-dom";
import PATH from "./contanst/path";
import Admin from "./features/Admin";
import Login from "./features/Authentication/page/Login/index";
import Layout from "./components/Layout";

function App() {
  const { pathname } = useLocation();

  return (
    <div classNaame="app">
          <Routes>
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.ADMIN.BASE} element={<Admin />} />
            <Route path={"/*"} element={<Layout />}></Route>
          </Routes>
    </div>
  );
}

export default App;
