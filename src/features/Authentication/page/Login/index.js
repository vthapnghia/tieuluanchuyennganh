import { useEffect } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import Input from "./../../../../components/Input/index";
import "./Login.scss";
import { Link } from "react-router-dom";
import Icons from "../../../../components/Icons";
function Login() {
  const { t } = useTranslation();

  const toggle = () => {
    let container = document.getElementById("container");
    container.classList.toggle("sign-up");
    container.classList.toggle("sign-in");
  };

  return (
    <Formik initialValues={{ user_name: "" }}>
      <>
        <div className="login-form">
          <div id="container" className="container-form sign-in">
            <div className="d-flex flex-wrap vh-100">
              <div className="w-50 common flex-column sign-up">
                <Link className="logo sign-up" to="/">
                  {t("logo")}
                  <span>.</span>
                </Link>
                <div className="form-wrapper common">
                  <div className="form sign-up">
                    <Input name="user_name" placeholder={t("user_name")} />

                    <Input name="email" placeholder={t("email")} />

                    <Input name="password" placeholder={t("password")} />

                    <Input
                      name="confirm_password"
                      placeholder={t("confirm_password")}
                    />

                    <button className="btn btn-primary btn-register">
                      {t("register")}
                    </button>
                    <br></br>
                    <p>
                      <span>{t("have_account")}</span>
                      &nbsp;
                      <b onClick={toggle} className="pointer">
                        {t("sign_in_here")}
                      </b>
                    </p>
                  </div>
                </div>
                <div className="back-to-home sign-up">
                  <Link to="/">{t("text_back_home")}</Link>
                </div>
              </div>

              <div className="w-50 common flex-column sign-in">
                <Link className="logo sign-in" to="/">
                  {t("logo")}
                  <span>.</span>
                </Link>
                <div className="form-wrapper common">
                  <div className="form sign-in">
                    <Input name="user_name" placeholder={t("user_name")} />

                    <Input name="password" placeholder={t("password")} />
                    <button>{t("login")}</button>
                    <p>
                      <b>{t("forgot_password")}</b>
                    </p>
                    <p>
                      <span>{t("no_account")}</span>
                      &nbsp;
                      <b onClick={toggle} className="pointer">
                        {t("sign_up_here")}
                      </b>
                    </p>
                  </div>
                </div>
                <div className="back-to-home sign-in">
                  <Link to="/">{t("text_back_home")}</Link>
                </div>
              </div>
            </div>

            <div className="d-flex flex-wrap vh-100 content-row">
              <div className="w-50 common flex-column">
                <div className="text sign-in">
                  <h1>
                    {t("logo")}
                    <span>.</span>
                  </h1>
                  <h2>{t("welcome")}</h2>
                </div>
              </div>

              <div className="w-50 common flex-column">
                <div className="img sign-up"></div>
                <div className="text sign-up">
                  <h1>
                    {t("logo")}
                    <span>.</span>
                  </h1>
                  <h2>{t("join_with_us")}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Formik>
  );
}
export default Login;
