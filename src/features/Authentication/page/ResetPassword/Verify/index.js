import { Formik } from "formik";
import { t } from "i18next";
import { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { shoe } from "../../../../../assets/img";
import Button from "../../../../../components/Button";
import Input from "../../../../../components/Input";
import ModalCommon from "../../../../../components/ModalCommon";
import PATH from "../../../../../contanst/path";
import { resetPasswordVerify } from "../../../authSlice";
import "./Verify.scss";

function Verify(params) {
  const formikRef = useRef();
  const [show, setShow] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetPassword = useCallback(
    async (values) => {
      await dispatch(resetPasswordVerify(values)).then((res) => {
        if (res.payload.status === 200) {
          setShow(!show);
        } else {
          setShowFail(!showFail);
        }
      });
    },
    [dispatch, show, showFail]
  );

  const handleConfirmFail = useCallback(() => {
    setShowFail(!showFail);
  }, [showFail]);

  const handleConfirm = useCallback(() => {
    setShow(!show);
    navigate(PATH.LOGIN);
  }, [show, navigate]);

  function containsValidate(str) {
    const specialChars = /[`!@#$%^&*()_+\-={};':"|,.<>?~]/;
    return /[0-9]/.test(str) && !/^[0-9]+$/.test(str) && specialChars.test(str);
  }

  const validationSchema = useMemo(() => {
    return {
      secret: Yup.string().required(t("MS_01", { param: t("code_verify") })),
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
  }, []);

  return (
    <Formik
      initialValues={{
        email: "",
        secret: "",
        password: "",
        passwordRepeat: "",
      }}
      enableReinitialize
      validationSchema={Yup.object(validationSchema)}
      onSubmit={handleResetPassword}
      innerRef={formikRef}
    >
      <div className="verify-reset-password">
        <div className="form-verify-reset">
          <Link className="logo" to={PATH.LOGIN}>
            <img src={shoe} alt="img" />
          </Link>
          <h2>{t("reset_password")}</h2>
          <div className="input">
            <Input name="email" placeholder={t("email")} type="text" />
          </div>
          <div className="input">
            <Input name="secret" placeholder={t("code_verify")} type="text" />
          </div>
          <div className="input">
            <Input name="password" placeholder={t("password")} type="text" />
          </div>
          <div className="input">
            <Input
              name="passwordRepeat"
              placeholder={t("confirm_password")}
              type="password"
            />
          </div>
          <div className="btn-confirm">
            <Button
              className="primary"
              onClick={() => formikRef.current?.submitForm()}
            >
              {t("confirm")}
            </Button>
          </div>
        </div>

        <ModalCommon
          show={show}
          modalTitle={t("action_success", { param: t("verify") })}
          modalBody={t("back_login")}
          handleConfirm={handleConfirm}
          handleCloseModal={() => setShow(!show)}
          isButton
        />
        <ModalCommon
          show={showFail}
          modalTitle={t("action_fail", { param: t("verify") })}
          modalBody={t("try_again")}
          handleConfirm={handleConfirmFail}
          handleCloseModal={() => setShowFail(!showFail)}
          isButton
        />
      </div>
    </Formik>
  );
}

export default Verify;
