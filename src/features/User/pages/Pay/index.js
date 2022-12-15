import { Formik } from "formik";
import { t } from "i18next";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import PayPal from "../../../../components/PayPal";
import { PAYMENT_OPTION } from "../../../../contanst/global";
import { getAllShip } from "../../../Admin/pages/ManagementShip/ShipSlice";
import "./Pay.scss";

function Pay(props) {
  const { state } = useLocation();
  const { product, intoMoney } = state;
  const dispatch = useDispatch();
  const ship = useSelector((state) => state.ship.allShip?.ships);
  const [optionShip, setOptionShip] = useState([]);
  const formikRef = useRef();

  const initialValues = useMemo(() => {
    return {
      name: "",
      phone: "",
      address: "",
      type_ship: "",
      payment_method: "",
    };
  }, []);

  const validationSchema = useMemo(() => {
    return {
      name: Yup.string().required(),
      phone: Yup.string().required(),
      address: Yup.string().required(),
      type_ship: Yup.string().required(),
      payment_method: Yup.string().required(),
    };
  }, []);

  const handleOrder = useCallback(() => {}, []);

  const handleOnChange = useCallback((method) => {
    if(method === 1){

    }
  }, []);

  useEffect(() => {
    dispatch(getAllShip());
  }, [dispatch]);

  useEffect(() => {
    let option = [];
    ship?.forEach((element) => {
      option.push({ value: element._id, label: element.type });
    });
    setOptionShip(option);
  }, [ship]);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={Yup.object(validationSchema)}
      innerRef={formikRef}
      onSubmit={handleOrder}
    >
      <>
        <div className="pay">
          <div className="container">
            <div className="row d-flex justify-content-between">
              <div className="col col-sm-12 col-md-6 form-input">
                <div className="input">
                  <Input name="name" placeholder={t("full_name")} type="text" />
                </div>
                <div className="input">
                  <Input
                    name="phone"
                    placeholder={t("phone")}
                    type="number"
                    style={{ textAlign: "left" }}
                  />
                </div>
                <div className="input">
                  <Input
                    name="address"
                    placeholder={t("address")}
                    type="textarea"
                  />
                </div>
                <div className="input">
                  <Input
                    name="type_ship"
                    placeholder={t("type_ship")}
                    type="select"
                    options={optionShip}
                    align="left"
                  />
                </div>
                <div className="input">
                  <Input
                    name="payment_method"
                    placeholder={t("payment_method")}
                    type="select"
                    options={PAYMENT_OPTION}
                    align="left"
                    handleOnChange={handleOnChange}
                  />
                </div>
              </div>
              {/* <div className="col col-sm-12 col-md-3 form-pay">
                <PayPal />
              </div> */}
              <div className="col col-sm-12 col-md-5 form-pay">
                <div className="form-header">
                  {t("order_n", { param: product.length })}
                </div>
                <div className="form-body">
                  <div className="temporary_fee">
                    {t("temporary_fee", { param: intoMoney })}&#8363;
                  </div>
                  <div className="ship_fee">{t("ship_fee")}&#8363;</div>
                </div>
                <div className="form-footer">
                  <div className="label-total">{t("total")}&#8363;</div>
                  <div className="btn-order offline" id="btn-order">
                      <PayPal className="pay-online" currency="USD" showSpinner={false} />
                      <Button
                        className="primary pay-offline"
                        onClick={() => formikRef.current.submitForm()}
                      >
                        {t("order_v")}
                      </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Formik>
  );
}

export default Pay;
