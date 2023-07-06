import { Formik } from "formik";
import { t } from "i18next";
import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import { getCodeResetPass } from "../../authSlice";
import "./AdminResetPassword.scss";
import { Alert, Snackbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PATH from "../../../../constants/path";

function AdminResetPassword(params) {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [type, setType] = useState("success");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = useCallback(
    async (values) => {
      await dispatch(getCodeResetPass(values)).then((res) => {
        if (res.payload.status === 200) {
          setMessage("Hãy kiểm tra mail để lấy mã xác nhận.");
          setType("success");
          setOpenAlert(!openAlert);
          setDisabled(!disabled);
          setTimeout(() => {
            navigate(PATH.ADMIN.NEW_PASSWORD);
          }, 2000);
        } else {
          setMessage("Lỗi! Vui lòng thử lại.");
          setType("error");
          setOpenAlert(!openAlert);
        }
      });
    },
    [disabled, dispatch, navigate, openAlert]
  );

  return (
    <Formik
      initialValues={{ email: "" }}
      enableReinitialize
      validationSchema={Yup.object({
        email: Yup.string().required(t("MS_01", { param: t("code_verify") })),
      })}
      onSubmit={handleResetPassword}
      innerRef={formikRef}
    >
      <div className="reset-password-admin">
        <div className="form-reset">
          <h2>{t("reset_password")}</h2>
          <div className="input">
            <Input
              name="email"
              placeholder={t("email")}
              type="text"
              disabled={disabled}
            />
          </div>
          <div className="back-home">
            <Link to={PATH.HOME}>
              <b>Trang chủ</b>
            </Link>
          </div>

          <div className="btn-confirm">
            <Button
              className="primary"
              onClick={() => formikRef.current?.submitForm()}
              disabled={disabled}
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

export default AdminResetPassword;
