import { useCallback, useState, useMemo, useRef } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import Input from "./../../../../components/Input/index";
import "./Login.scss";
import { Link } from "react-router-dom";
import Icons from "../../../../components/Icons";
import { COLOR } from "../../../../contanst/global";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../authSlice";
import Button from "./../../../../components/Button/index";
function Login() {
  const { t } = useTranslation();
  const formikRef = useRef(null);
  const [signIn, setSignIn] = useState(true);
  const dispatch = useDispatch();

  const toggle = () => {
    setSignIn(!signIn);
    let container = document.getElementById("container");
    container.classList.toggle("sign-up");
    container.classList.toggle("sign-in");
    formikRef.current?.resetForm();
  };

  function containsValidate(str) {
    const specialChars = /[`!@#$%^&*()_+\-={};':"|,.<>?~]/;
    return /[0-9]/.test(str) && !/^[0-9]+$/.test(str) && specialChars.test(str);
  }

  const initialValues = useMemo(() => {
    if (signIn) {
      return {
        email: "",
        password: "",
      };
    }
    return {
      user_name: "",
      email: "",
      password: "",
      confirm_password: "",
    };
  }, [signIn]);

  const validationSchema = useMemo(() => {
    if (signIn) {
      return {
        email: Yup.string().required(t("MS_01", { param: t("email") })),
        password: Yup.string().required(t("MS_01", { param: t("password") })),
      };
    }
    return {
      user_name: Yup.string()
        .required(t("MS_01", { param: t("user_name") }))
        .min(8, t("MS_03", { param: 8 }))
        .max(50, t("MS_02", { param: 50 })),
      email: Yup.string().required(t("MS_01", { param: t("email") })),
      password: Yup.string()
        .required(t("MS_01", { param: t("password") }))
        .min(8, t("MS_03", { param: 8 }))
        .max(50, t("MS_02", { param: 50 }))
        .test("string_contains", t("MS_04"), (value, context) => {
          if (containsValidate(value)) {
            return true;
          }
          return false;
        }),
      confirm_password: Yup.string()
        .required(t("MS_01", { param: t("confirm_password") }))
        .min(8, t("MS_03", { param: 8 }))
        .max(50, t("MS_02", { param: 50 }))
        .test("string_contains", t("MS_04"), (value, context) => {
          if (containsValidate(value)) {
            return true;
          }
          return false;
        })
        .test("error valid", t("MS_05"), (value, context) => {
          if (context.parent.password === value) {
            return true;
          }
          return false;
        }),
    };
  }, [signIn, t]);

  const handleSingInAndSignUp = useCallback(
    (values) => {
      if (login) {
        dispatch(login(values));
      }
    },
    [dispatch]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object(validationSchema)}
      enableReinitialize
      onSubmit={handleSingInAndSignUp}
      innerRef={formikRef}
    >
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
                    <Input
                      name="user_name"
                      placeholder={t("user_name")}
                      type="password"
                      style={{
                        backgroundColor: COLOR.BG_INPUT,
                        boxShadow: "none",
                      }}
                      leftIcon={<Icons.User color={COLOR.GRAY_2} />}
                    />

                    <Input
                      name="email"
                      placeholder={t("email")}
                      type="text"
                      style={{
                        backgroundColor: COLOR.BG_INPUT,
                        boxShadow: "none",
                      }}
                      leftIcon={<Icons.Email color={COLOR.GRAY_2} />}
                    />

                    <Input
                      name="password"
                      placeholder={t("password")}
                      type="password"
                      style={{
                        backgroundColor: COLOR.BG_INPUT,
                        boxShadow: "none",
                      }}
                      leftIcon={<Icons.Lock color={COLOR.GRAY_2} />}
                    />

                    <Input
                      name="confirm_password"
                      placeholder={t("confirm_password")}
                      type="password"
                      style={{
                        backgroundColor: COLOR.BG_INPUT,
                        boxShadow: "none",
                      }}
                      leftIcon={<Icons.Lock color={COLOR.GRAY_2} />}
                    />

                    <Button
                      className="primary"
                      onClick={() => formikRef.current?.submitForm()}
                    >
                      {t("register")}
                    </Button>
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
                    <Input
                      name="email"
                      placeholder={t("email")}
                      type="text"
                      style={{
                        backgroundColor: COLOR.BG_INPUT,
                        boxShadow: "none",
                      }}
                      leftIcon={<Icons.User color={COLOR.GRAY_2} />}
                    />

                    <Input
                      name="password"
                      placeholder={t("password")}
                      type="password"
                      style={{
                        backgroundColor: COLOR.BG_INPUT,
                        boxShadow: "none",
                      }}
                      leftIcon={<Icons.Lock color={COLOR.GRAY_2} />}
                    />
                    <Button
                      className="primary"
                      onClick={() => formikRef.current?.submitForm()}
                    >
                      {t("login")}
                    </Button>
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
