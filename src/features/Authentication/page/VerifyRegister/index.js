import { Formik } from "formik";
import { t } from "i18next";
import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { shoe } from "../../../../assets/img";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import ModalCommon from "../../../../components/ModalCommon";
import PATH from "../../../../contanst/path";
import { verifyRegister } from "../../authSlice";
import "./VerifyRegister.scss";

function VerifyRegister(params) {
  const formikRef = useRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showFail, setShowFail] = useState(false);

  const handleVerify = useCallback(
    async (values) => {
      if (location.state.id) {
        await dispatch(
          verifyRegister({ data: values, id: location.state.id })
        ).then((res) => {
          if (res.payload.status === 200) {
            setShow(!show);
          } else {
            setShowFail(!showFail);
          }
        });
      }
    },
    [dispatch, location, show, showFail]
  );

  const handleConfirm = useCallback(() => {
    setShow(!show);
    navigate(PATH.LOGIN);
  }, [show, navigate]);

  const handleConfirmFail = useCallback(() => {
    setShowFail(!showFail);
  }, [showFail]);

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
          <Link className="logo" to={PATH.HOME}>
            <img src={shoe} alt="img" />
          </Link>
          <h2>{t("check_mail")}</h2>
          <div className="input">
            <Input name="secret" placeholder={t("code_verify")} type="text" />
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

export default VerifyRegister;
