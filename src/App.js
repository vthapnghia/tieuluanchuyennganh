import { Route, Routes } from "react-router-dom";
import PATH from "./contanst/path";
import Admin from "./features/Admin";
import Login from "./features/Authentication/page/Login/index";
import Layout from "./components/Layout";

function App() {

  return (
    <div className="app">
      <Routes>
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.ADMIN.BASE} element={<Admin />} />
        <Route path={"/*"} element={<Layout />}></Route>
      </Routes>
     
    </div>
  );
}

export default App;
