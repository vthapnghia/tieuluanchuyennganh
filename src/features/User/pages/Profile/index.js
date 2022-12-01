import { Formik } from "formik";
import { t } from "i18next";
import * as Yup from "yup";
import { useMemo, useRef, useCallback } from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import "./Profile.scss";
import { optionsGender } from "../../../../until/common";
import { useAuth } from "../../../../until/hooks";

function Profile() {
  const formikRef = useRef(null);
  const { userAuth } = useAuth();
  console.log(userAuth);
  const validationSchema = useMemo(() => {
    return {
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
      phone: Yup.number()
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
      name: "",
      age: "",
      gender: 1,
      address: "",
      phone: 1234567891,
    };
  }, []);

  const handleUpdate = useCallback((values) => {
    console.log(values);
  }, []);

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
              <img
                src="https://luv.vn/wp-content/uploads/2021/08/hinh-anh-gai-xinh-71.jpg"
                alt="img"
                className="img-circle"
              />
              <h4 className="card-title mt-2">Võ Đặng Khả Vy</h4>
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
                      options={optionsGender}
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
