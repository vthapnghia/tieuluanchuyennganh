import { Formik } from "formik";
import { t } from "i18next";
import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import ModalCommon from "../../../../components/ModalCommon";
import PATH from "../../../../contanst/path";
import { getCodeResetPass } from "../../authSlice";
import "./ResetPassword.scss";
import { shoe_bg } from "../../../../assets/img";

function ResetPassword(params) {
  const formikRef = useRef();
  const [show, setShow] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetPassword = useCallback(
    async (values) => {
      await dispatch(getCodeResetPass(values)).then((res) => {
        console.log(res);
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
    navigate(PATH.RESET_PASSWORD.RESET_PASSWORD_VERIFY);
  }, [show, navigate]);

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
      <div className="reset-password">
        <div className="form-reset">
          <Link className="logo" to={PATH.LOGIN}>
            <img src={shoe_bg} alt="img" />
          </Link>
          <h2>{t("reset_password")}</h2>
          <div className="input">
            <Input name="email" placeholder={t("email")} type="text" />
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
          modalTitle={t("check_mail")}
          modalBody={null}
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

export default ResetPassword;
