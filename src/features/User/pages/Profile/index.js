import { Formik } from "formik";
import { t } from "i18next";
import * as Yup from "yup";
import { useMemo, useRef, useCallback, useEffect } from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { OPTION_GENDER } from "../../../../contanst/global";
import { getUser } from "../../../Authentication/authSlice";

function Profile() {
  const formikRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

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
        .test(
          "lenght number",
          t("MS_08", { param: t("phone") }),
          (value, context) => {
            if (value.length !== 10) {
              return false;
            }
            return true;
          }
        ),
    };
  }, []);

  const initialValues = useMemo(() => {
    return {
      avatar: user?.avatar || "",
      name: user?.name || "",
      age: user?.age || "",
      gender: user?.gender || "",
      address: user?.address || "",
      phone: user?.phone || "",
    };
  }, [user?.name, user?.age, user?.gender, user?.address, user?.phone]);

  const handleUpdate = useCallback((values) => {
    console.log(values);
  }, []);

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
        <div className="profile">
          <div className="container pt-5 pb-5">
            <div className="w-100 d-flex flex-column align-items-center">
              <div className="avatar">
                <Input
                  name="avatar"
                  type="file"
                  textLabel="Tải ảnh lên"
                  accept="image/*"
                />
              </div>

              <div className="form-info" style={{ width: "500px" }}>
                <Input name="name" placeholder={t("full_name")} type="text" />
                <div className="d-flex justify-content-between">
                  <div style={{ width: "calc(50% - 10px)" }}>
                    <Input name="age" placeholder={t("age")} type="number" />
                  </div>
                  <div style={{ width: "20px" }}></div>
                  <div style={{ width: "calc(50% - 10px)" }}>
                    <Input
                      name="gender"
                      placeholder={t("gender")}
                      type="select"
                      options={OPTION_GENDER}
                    />
                  </div>
                </div>

                <Input
                  style={{ resize: "none" }}
                  name="address"
                  placeholder={t("address")}
                  type="textarea"
                />
                <Input
                  name="phone"
                  placeholder={t("phone")}
                  type="number"
                  style={{ textAlign: "left" }}
                />
              </div>
              <div className="form-group">
                <div className="col-sm-12">
                  <Button
                    className="primary"
                    onClick={() => formikRef.current.submitForm()}
                  >
                    {t("update_profile")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Formik>
  );
}

export default Profile;
