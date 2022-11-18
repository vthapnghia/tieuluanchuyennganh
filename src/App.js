import { Route, Routes } from "react-router-dom";
import PATH from "./contanst/path";
import Admin from "./features/Admin";
import Login from "./features/Authentication/page/Login/index";
import Layout from "./components/Layout";
import Input from "./components/Input";
import { Formik } from "formik";
import Icons from "./components/Icons";
import { COLOR } from "./contanst/global";
import { useRef } from "react";
import * as Yup from "yup";

function App() {
  const formikRef = useRef();
  const handleSubmit = (values) => {
    console.log(values);
  };

  const options = [
    { value: 1, label: "option 1" },
    { value: 2, label: "option 2" },
    { value: 3, label: "option 3" },
  ];

  return (
    <div className="app">
      {/* <Routes>
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.ADMIN.BASE} element={<Admin />} />
        <Route path={"/*"} element={<Layout />}></Route>
      </Routes> */}

      <Formik
        initialValues={{ text: 1 }}
        innerRef={formikRef}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <>
          <Input
            name="text"
            label="Label text"
            type="number"
            // style={{ backgroundColor: "white" }}
            options={options}
          />
          <button onClick={() => formikRef.current?.submitForm()}>
            submit
          </button>
        </>
      </Formik>
    </div>
  );
}

export default App;
