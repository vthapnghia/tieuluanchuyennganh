import { Formik } from "formik";
import { t } from "i18next";
import { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Button from "../../../../../components/Button";
import Input from "../../../../../components/Input";
import { resetPasswordVerify, setShowPassNew } from "../../../authSlice";
import "./Verify.scss";
import Icons from "../../../../../components/Icons";
import { COLOR } from "../../../../../constants/global";
import { Alert, Snackbar } from "@mui/material";

function Verify(params) {
  const formikRef = useRef();
  const [message, setMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [type, setType] = useState("success");
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  const handleResetPassword = useCallback(
    async (values) => {
      await dispatch(resetPasswordVerify(values)).then((res) => {
        if (res.payload.status === 200) {
          setMessage("Đặt lại mật khẩu thành công.");
          setType("success");
          setOpenAlert(!openAlert);
          setDisabled(!disabled);
          setTimeout(() => {
            dispatch(setShowPassNew());
          }, 2000);
        } else {
          setMessage("Lỗi! Vui lòng thử lại.");
          setType("error");
          setOpenAlert(!openAlert);
        }
      });
    },
    [disabled, dispatch, openAlert]
  );

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
          <h2>{t("reset_password")}</h2>
          <div className="input">
            <Input
              name="email"
              placeholder={t("email")}
              type="text"
              leftIcon={<Icons.Email color={COLOR.GRAY_2} />}
            />
          </div>
          <div className="input">
            <Input
              name="secret"
              placeholder={t("code_verify")}
              type="text"
              leftIcon={<Icons.Certificate color={COLOR.GRAY_2} />}
            />
          </div>
          <div className="input">
            <Input
              name="password"
              placeholder={t("password")}
              type="password"
              leftIcon={<Icons.Lock color={COLOR.GRAY_2} />}
            />
          </div>
          <div className="input">
            <Input
              name="passwordRepeat"
              placeholder={t("confirm_password")}
              type="password"
              leftIcon={<Icons.Lock color={COLOR.GRAY_2} />}
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

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openAlert}
          onClose={() => setOpenAlert(!openAlert)}
          autoHideDuration={2000}
        >
          <Alert severity={type}>{message}</Alert>
        </Snackbar>
      </div>
    </Formik>
  );
}

export default Verify;
