import { useCallback, useState, useMemo, useRef, useEffect } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import Input from "./../../../../components/Input/index";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import Icons from "../../../../components/Icons";
import { COLOR } from "../../../../contanst/global";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login, loginGoogle, register } from "../../authSlice";
import Button from "./../../../../components/Button/index";
import PATH from "../../../../contanst/path";
import { useGoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import ModalCommon from "../../../../components/ModalCommon";
import { shoe } from "../../../../assets/img";

function Login() {
  const { t } = useTranslation();
  const formikRef = useRef(null);
  const [isSignIn, setIssignIn] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const toggle = () => {
    setIssignIn(!isSignIn);
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
    if (isSignIn) {
      return {
        email: "",
        password: "",
      };
    }
    return {
      email: "",
      password: "",
      passwordRepeat: "",
    };
  }, [isSignIn]);

  const validationSchema = useMemo(() => {
    if (isSignIn) {
      return {
        email: Yup.string().required(t("MS_01", { param: t("email") })),
        password: Yup.string().required(t("MS_01", { param: t("password") })),
      };
    }
    return {
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
      passwordRepeat: Yup.string()
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
  }, [isSignIn, t]);

  const handleSingInAndSignUp = useCallback(
    async (values) => {
      if (isSignIn) {
        await dispatch(login(values)).then((res) => {
          if (res.payload.status === 200) {
            const response = res.payload?.data;
            if (response.user._id) {
              navigate(PATH.HOME);
            } else {
              navigate(PATH.PROFILE);
            }
          } else {
            setModalTitle(t("info_wrong", { param: "????ng nh???p" }));
            setModalBody(t("try_one_login"));
            setShowModal(!showModal);
          }
        });
      } else {
        await dispatch(register(values)).then((res) => {
          if (res.payload.status === 200) {
            navigate(PATH.VERIFY_REGISTER, {
              state: { id: res.payload.data.account._id },
            });
          } else {
            setModalTitle(t("action_fail", { param: t("register") }));
            setModalBody(t("try_again"));
            setShowModal(!showModal);
          }
        });
      }
    },
    [dispatch, navigate, isSignIn, showModal, t]
  );

  const onSuccess = async(data) => {
    await dispatch(loginGoogle({ google_id: data.googleId })).then((res) => {
      if (res.payload.status === 200) {
        const response = res.payload?.data;
        if (response.user._id) {
          navigate(PATH.HOME);
        } else {
          navigate(PATH.PROFILE);
        }
      } else {
        setModalTitle(t("action_success", { param: t("login") }));
        setModalBody(t("try_one_login"));
        setShowModal(!showModal);
      }
    });
  };

  const onFailure = (res) => {
    console.log("error:", res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId:
      "264515854372-s517e9apc7mb0v86a0r4cc9ru33tv5k2.apps.googleusercontent.com",
    isSignedIn: false,
  });

  const handleClose = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "264515854372-s517e9apc7mb0v86a0r4cc9ru33tv5k2.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

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
                <div className="form-wrapper common">
                  <div className="form sign-up">
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
                      name="passwordRepeat"
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
                      onClick={() => formikRef.current.submitForm()}
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
                    <div className="d-flex flex-column ">
                      <Button
                        className="primary"
                        onClick={() => formikRef.current?.submitForm()}
                      >
                        {t("login")}
                      </Button>
                      <span style={{ display: "block", margin: "10px 0" }}>
                        {t("or")}
                      </span>
                      <Button className="primary" onClick={signIn}>
                        <Icons.Google color={COLOR.GOOGLE_COLOR} />
                      </Button>
                    </div>

                    <p>
                      <Link
                        to={PATH.RESET_PASSWORD.BASE}
                        className="forgot-password"
                      >
                        <b>{t("forgot_password")}</b>
                      </Link>
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
                    <img src={shoe} alt="img" />
                  </h1>
                  <h2>{t("welcome")}</h2>
                </div>
              </div>

              <div className="w-50 common flex-column">
                <div className="img sign-up"></div>
                <div className="text sign-up">
                  <h1>
                    <img src={shoe} alt="img" />
                  </h1>
                  <h2>{t("join_with_us")}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalCommon
          show={showModal}
          modalTitle={modalTitle}
          modalBody={modalBody}
          handleConfirm={handleClose}
          handleCloseModal={() => setShowModal(!showModal)}
          isButton
        />
      </>
    </Formik>
  );
}
export default Login;
