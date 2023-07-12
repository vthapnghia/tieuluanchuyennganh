import { Formik } from "formik";
import { t } from "i18next";
import * as Yup from "yup";
import { useMemo, useRef, useCallback, useEffect, useState } from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { OPTION_GENDER } from "../../../../constants/global";
import {
  firstLogin,
  getUser,
  setShowProfile,
  updateUser,
} from "../../../Authentication/authSlice";
import { avatar_default } from "../../../../assets/img";
import { Alert, Snackbar } from "@mui/material";

function Profile() {
  const formikRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [openAlert, setOpenAlert] = useState(false);
  const [type, setType] = useState("success");
  const [message, setMessage] = useState("success");

  const validationSchema = useMemo(() => {
    return {
      avatar: Yup.string().required("Vui lòng chọn ảnh đại diện"),
      name: Yup.string().required(t("MS_01", { param: t("full_name") })),
      age: Yup.number()
        .required(t("MS_01", { param: t("full_name") }))
        .min(1, t("MS_06", { param: t("age"), min: 1 }))
        .max(100, t("MS_07", { param: t("age"), max: 100 })),
      gender: Yup.string()
        .ensure()
        .required(t("MS_01", { param: t("gender") })),
      address: Yup.string()
        .required(t("MS_01", { param: t("address") }))
        .max(250, t("MS_03", { param: t("address") })),
      phone: Yup.string()
        .required(t("MS_01", { param: t("address") }))
        .required(t("MS_01", { param: t("phone") })),
    };
  }, []);

  const initialValues = useMemo(() => {
    return {
      avatar: user?.avatar || avatar_default,
      name: user?.name || "",
      age: user?.age || "",
      gender: user?.gender || "",
      address: user?.address || "",
      phone: user?.phone || "",
    };
  }, [
    user?.name,
    user?.age,
    user?.gender,
    user?.address,
    user?.phone,
    user?.avatar,
  ]);

  const handleUpdate = useCallback(
    async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("age", values.age);
      formData.append("gender", values.gender);
      formData.append("address", values.address);
      formData.append("phone", values.phone);
      formData.append("avatar", values.avatar);
      if (user === null) {
        await dispatch(firstLogin(formData)).then(async (res) => {
          if (res.payload.status === 200) {
            setOpenAlert(!openAlert);
            setType("success");
            setMessage("Cập nhật thành công");
            await dispatch(getUser());
            setTimeout(() => {
              dispatch(setShowProfile());
            }, 2000);
          } else {
            setOpenAlert(!openAlert);
            setType("error");
            setMessage("Cập nhật thất bại");
          }
        });
      } else {
        await dispatch(updateUser(formData)).then(async (res) => {
          if (res.payload.status === 200) {
            setOpenAlert(!openAlert);
            setType("success");
            setMessage("Cập nhật thành công");
            await dispatch(getUser());
            setTimeout(() => {
              dispatch(setShowProfile());
            }, 2000);
          } else {
            setOpenAlert(!openAlert);
            setType("error");
            setMessage("Cập nhật thất bại");
          }
        });
      }
    },
    [user, dispatch, openAlert]
  );

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object(validationSchema)}
      enableReinitialize
      innerRef={formikRef}
      onSubmit={handleUpdate}
    >
      <>
        <div id="profile">
          <div className="avatar">
            <Input name="avatar" type="file" accept="image/*" icon={true} />
          </div>
          <div className="form-info">
            <Input
              name="name"
              placeholder={t("full_name")}
              type="text"
              label="Tên"
            />
            <div className="d-flex justify-content-between">
              <div style={{ width: "calc(50% - 10px)" }}>
                <Input
                  name="age"
                  placeholder={t("age")}
                  type="number"
                  label={t("age")}
                />
              </div>
              <div style={{ width: "20px" }}></div>
              <div style={{ width: "calc(50% - 10px)" }}>
                <Input
                  name="gender"
                  placeholder={t("gender")}
                  type="select"
                  options={OPTION_GENDER}
                  label={t("gender")}
                />
              </div>
            </div>

            <Input
              style={{ resize: "none" }}
              name="address"
              placeholder={t("address")}
              type="textarea"
              label={t("address")}
            />
            <Input
              name="phone"
              placeholder={t("phone")}
              type="number"
              style={{ textAlign: "left" }}
              label={t("phone")}
            />
            <div className="form-group">
              <Button
                className="primary"
                onClick={() => formikRef.current.submitForm()}
              >
                {t("update_profile")}
              </Button>
            </div>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={openAlert}
          onClose={() => setOpenAlert(!openAlert)}
          autoHideDuration={2000}
        >
          <Alert severity={type}>{message}</Alert>
        </Snackbar>
      </>
    </Formik>
  );
}

export default Profile;
