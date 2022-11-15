import { useEffect } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import Input from "./../../../../components/Input/index";
import "./Login.scss";
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
                <div className="form-wrapper common">
                  <div className="form sign-up">
                    <Input name="user_name" placeholder="Username" />
                    <div className="input-group">
                      <i className="bx bx-mail-send"></i>
                      <input type="email" placeholder="Email" />
                    </div>
                    <div className="input-group">
                      <i className="bx bxs-lock-alt"></i>
                      <input type="password" placeholder="Password" />
                    </div>
                    <div className="input-group">
                      <i className="bx bxs-lock-alt"></i>
                      <input type="password" placeholder="Confirm password" />
                    </div>
                    <button>{t('register')}</button>
                    <br></br>
                    <p>
                      <span>{t("have_account")}</span>
                      <b onClick={toggle} className="pointer">
                       {t("sign_in_here")}
                      </b>
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-50 common flex-column sign-in">
                <div className="form-wrapper common">
                  <div className="form sign-in">
                    <div className="input-group">
                      <i className="bx bxs-user"></i>
                      <input type="text" placeholder="Username" />
                    </div>
                    <div className="input-group">
                      <i className="bx bxs-lock-alt"></i>
                      <input type="password" placeholder="Password" />
                    </div>
                    <button>{t("login")}</button>
                    <p>
                      <b>{t("forgot_password")}</b>
                    </p>
                    <p>
                      <span>{t("no_account")}</span>
                      <b onClick={toggle} className="pointer">
                        {t("sign_up_here")}
                      </b>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-wrap vh-100 content-row">
              <div className="w-50 common flex-column">
                <div className="text sign-in">
                  <h2>{t("welcome")}</h2>
                </div>
                <div className="img sign-in"></div>
              </div>

              <div className="w-50 common flex-column">
                <div className="img sign-up"></div>
                <div className="text sign-up">
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
