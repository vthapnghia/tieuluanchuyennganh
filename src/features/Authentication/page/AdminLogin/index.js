import { Formik } from "formik";
import { t } from "i18next";
import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { shoe_bg } from "../../../../assets/img";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import ModalCommon from "../../../../components/ModalCommon";
import PATH from "../../../../contanst/path";
import { adminLogin } from "../../authSlice";
import "./AdminLogin.scss";

function AdminLogin(params) {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleAdminLogin = useCallback(
    (values) => {
      dispatch(adminLogin(values)).then((res) => {
        if (res.payload.status === 200) {
          navigate(PATH.ADMIN.PRODUCTS.BASE);
        } else {
          setModalTitle(t("action_success", { param: t("login") }));
          setModalBody(t("try_one_login"));
          setShowModal(!showModal);
        }
      });
    },
    [dispatch, navigate, showModal]
  );

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      enableReinitialize
      validationSchema={Yup.object({
        email: Yup.string().required(t("MS_01", { param: t("email") })),
        password: Yup.string().required(t("MS_01", { param: t("password") })),
      })}
      onSubmit={handleAdminLogin}
      innerRef={formikRef}
    >
      <div className="admin-login">
        <div className="login-admin-form ">
          <Link className="logo" to={PATH.HOME}>
            <img src={shoe_bg} alt="img" />
          </Link>
          <div className="header-login">
            <span>{t("login")}</span>
          </div>
          <div className="input">
            <Input name="email" placeholder={t("email")} type="text" />
          </div>
          <div className="input">
            <Input
              name="password"
              placeholder={t("password")}
              type="password"
            />
          </div>
          <Link to={PATH.RESET_PASSWORD.BASE} className="forgot-password">
            <b>{t("forgot_password")}</b>
          </Link>

          <div className="btn-admin-login">
            <Button
              className="primary"
              onClick={() => formikRef.current.submitForm()}
            >
              {t("login")}
            </Button>
          </div>
        </div>
        <ModalCommon
          show={showModal}
          modalTitle={modalTitle}
          modalBody={modalBody}
          handleConfirm={() => setShowModal(!showModal)}
          handleCloseModal={() => setShowModal(!showModal)}
          isButton
        />
      </div>
    </Formik>
  );
}

export default AdminLogin;
