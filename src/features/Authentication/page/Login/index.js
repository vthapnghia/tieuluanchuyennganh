import { useCallback, useState, useMemo, useRef, useEffect } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import Input from "./../../../../components/Input/index";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import Icons from "../../../../components/Icons";
import { COLOR } from "../../../../constants/global";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  login,
  loginGoogle,
  register,
  setShowLogin,
  setShowProfile,
} from "../../authSlice";
import Button from "./../../../../components/Button/index";
import PATH from "../../../../constants/path";
import { useGoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { Alert, Snackbar } from "@mui/material";

function Login() {
  const { t } = useTranslation();
  const formikRef = useRef(null);
  const [isSignIn, setIsSignIn] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [type, setType] = useState("");

  const togglerResponsive = () => {
    setIsSignIn(!isSignIn);
    let container = document.getElementById("login-form");
    container.classList.toggle("sign-up-active");
    container.classList.toggle("sign-in-active");
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
              dispatch(setShowProfile());
            }
            dispatch(setShowLogin());
          } else {
            setMessage("Đăng nhập thất bại");
            setOpenAlert(!openAlert);
            setType("error");
          }
        });
      } else {
        await dispatch(register(values)).then((res) => {
          if (res.payload.status === 200) {
            navigate(PATH.VERIFY_REGISTER, {
              state: { id: res.payload.data.account._id },
            });
          } else {
            setMessage("Đăng nhập thất bại");
            setOpenAlert(!openAlert);
            setType("error");
          }
        });
      }
    },
    [isSignIn, dispatch, navigate, openAlert]
  );

  const onSuccess = async (data) => {
    await dispatch(loginGoogle({ google_id: data.googleId })).then((res) => {
      if (res.payload.status === 200) {
        const response = res.payload?.data;
        if (response.user._id) {
          navigate(PATH.HOME);
        } else {
          dispatch(setShowProfile());
        }
      } else {
        setMessage("Đăng nhập thất bại");
        setOpenAlert(!openAlert);
        setType("error");
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
        <div className="login-form sign-in-active" id="login-form">
          <div className="sign-up">
            <h2>Đăng ký</h2>
            <div className="form">
              <Input
                name="email"
                placeholder={t("email")}
                type="text"
                leftIcon={<Icons.Email color={COLOR.GRAY_2} />}
              />

              <Input
                name="password"
                placeholder={t("password")}
                type="password"
                leftIcon={<Icons.Lock color={COLOR.GRAY_2} />}
              />

              <Input
                name="passwordRepeat"
                placeholder={t("confirm_password")}
                type="password"
                leftIcon={<Icons.Lock color={COLOR.GRAY_2} />}
              />

              <Button
                className="primary"
                onClick={() => formikRef.current.submitForm()}
              >
                {t("register")}
              </Button>
              <br></br>
              <p className="action">
                <span>{t("have_account")}</span>
                &nbsp;
                <b onClick={togglerResponsive} className="pointer">
                  {t("sign_in_here")}
                </b>
              </p>
            </div>
          </div>

          <div className="sign-in">
            <h2>Đăng nhập</h2>
            <div className="form">
              <Input
                name="email"
                placeholder={t("email")}
                type="text"
                leftIcon={<Icons.User color={COLOR.GRAY_2} />}
              />

              <Input
                name="password"
                placeholder={t("password")}
                type="password"
                leftIcon={<Icons.Lock color={COLOR.GRAY_2} />}
              />
              <div className="d-flex flex-column ">
                <Button
                  className="primary"
                  onClick={() => formikRef.current?.submitForm()}
                >
                  {t("login")}
                </Button>
                <span className="text-center d-block my-2">{t("or")}</span>
                <Button className="primary" onClick={signIn}>
                  <Icons.Google color={COLOR.GOOGLE_COLOR} />
                </Button>
              </div>

              <p className="forgot-pass">
                <Link to={PATH.RESET_PASSWORD.BASE} className="forgot-password">
                  <b>{t("forgot_password")}</b>
                </Link>
              </p>
              <p className="action">
                <span>{t("no_account")}</span>
                &nbsp;
                <b onClick={togglerResponsive} className="pointer">
                  {t("sign_up_here")}
                </b>
              </p>
            </div>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openAlert}
          onClose={() => setOpenAlert(!openAlert)}
          autoHideDuration={3000}
        >
          <Alert severity={type}>{message}</Alert>
        </Snackbar>
      </>
    </Formik>
  );
}
export default Login;
