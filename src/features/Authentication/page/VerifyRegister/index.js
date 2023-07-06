import { Formik } from "formik";
import { t } from "i18next";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import { setShowVerify, verifyRegister } from "../../authSlice";
import "./VerifyRegister.scss";
import { Alert, Snackbar } from "@mui/material";

function VerifyRegister() {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [type, setType] = useState("success");
  const id = useSelector((state) => state.auth.idRegister);

  const handleVerify = useCallback(
    async (values) => {
      await dispatch(verifyRegister({ data: values, id: id })).then((res) => {
        if (res.payload.status === 200) {
          setMessage("Xác thực thành công");
          setType("success");
          setOpenAlert(!openAlert);
          setTimeout(() => {
            dispatch(setShowVerify());
          }, 2000);
        } else {
          setMessage("Xác thực không thành công");
          setType("error");
          setOpenAlert(!openAlert);
        }
      });
    },
    [dispatch, id, openAlert]
  );

  return (
    <Formik
      initialValues={{ secret: "" }}
      enableReinitialize
      validationSchema={Yup.object({
        secret: Yup.string().required(t("MS_01", { param: t("code_verify") })),
      })}
      onSubmit={handleVerify}
      innerRef={formikRef}
    >
      <div className="verify-register">
        <div className="form-verify-register">
          {/* <Link className="logo" to={PATH.HOME}>
            <img src={shoe_bg} alt="img" />
          </Link> */}
          <h2>{t("check_mail")}</h2>
          <div className="input">
            <Input name="secret" placeholder={t("code_verify")} type="text" disabled={openAlert}/>
          </div>
          <div className="btn-confirm">
            <Button
              className="primary"
              onClick={() => formikRef.current?.submitForm()}
              disabled={openAlert}
            >
              {t("confirm")}
            </Button>
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
      </div>
    </Formik>
  );
}

export default VerifyRegister;
