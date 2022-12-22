import { Formik } from "formik";
import { t } from "i18next";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import PayPal from "./PayPal";
import { PAYMENT_OPTION } from "../../../../contanst/global";
import { getAllShip } from "../../../Admin/pages/ManagementShip/ShipSlice";
import "./Order.scss";
import { getUser } from "../../../Authentication/authSlice";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { createOrder } from "./OrderSlice";
import ModalCommon from "../../../../components/ModalCommon";
import PATH from "../../../../contanst/path";

function Order(props) {
  const { state } = useLocation();
  const { product, intoMoney } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ship = useSelector((state) => state.ship.allShip?.ships);
  const formikRef = useRef();
  const user = useSelector((state) => state.auth.user);
  const [feeShip, setFeeShip] = useState(0);
  const [shipId, setShipId] = useState(ship[0]._id);
  const [payMethod, setPayMethod] = useState(null);
  const [req, setReq] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const optionShip = ship?.map((element) => {
    return { value: element._id, label: element.type };
  });

  const initialValues = useMemo(() => {
    return {
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
      type_ship: ship ? ship[0]._id : "",
      payment_method: 1,
    };
  }, [user, ship]);

  const validationSchema = useMemo(() => {
    return {
      name: Yup.string().required(t("MS_01", { param: t("full_name") })),
      phone: Yup.string().required(t("MS_01", { param: t("phone") })),
      address: Yup.string().required(t("MS_01", { param: t("address") })),
      type_ship: Yup.string().required(t("MS_01", { param: t("type_ship") })),
      payment_method: Yup.string().required(
        t("MS_01", { param: t("payment_method") })
      ),
    };
  }, []);

  const handleOrder = useCallback(
    (values) => {
      const items = product.map((productItem) => {
        const producSplit = productItem.split("_");
        return {
          product_id: producSplit[0],
          size: producSplit[1],
          quantity: producSplit[2],
        };
      });

      const data = {
        items: items,
        total: feeShip + intoMoney,
        ship_id: shipId,
        payment_method: Number(payMethod),
        location: values.address,
        receiver_name: values.name,
        receiver_phone: values.phone,
        is_fast_buy: false,
      };
      console.log();
      dispatch(createOrder(data)).then((res) => {
        if (res.payload.status === 200) {
          setShowSuccess(!showSuccess);
        } else {
          setShowFail(!showFail);
        }
      });
    },
    [
      product,
      payMethod,
      shipId,
      feeShip,
      intoMoney,
      dispatch,
      showSuccess,
      showFail,
    ]
  );

  const handleOnChangePayMethod = useCallback(
    (method) => {
      const element = document.getElementById("btn-order");
      setPayMethod(method);
      if (method === 1) {
        const online = document.getElementsByClassName("online");
        online && element.classList.remove("online");
        element.classList.add("offline");
      } else {
        const offline = document.getElementsByClassName("offline");
        offline && element.classList.toggle("offline");
        element.classList.toggle("online");

        const items = product.map((productItem) => {
          const producSplit = productItem.split("_");
          return {
            product_id: producSplit[0],
            size: producSplit[1],
            quantity: producSplit[2],
          };
        });

        const values = formikRef.current?.values;

        setReq({
          items: items,
          total: feeShip + intoMoney,
          ship_id: values?.type_ship,
          payment_method: Number(values?.payment_method),
          location: values?.address,
          receiver_name: values?.name,
          receiver_phone: values?.phone,
          is_fast_buy: false,
        });
      }
    },
    [feeShip, intoMoney, product]
  );

  const handleOnChangeTypeShip = useCallback(
    (id) => {
      const findShip = ship.find((item) => item._id === id);
      setShipId(findShip._id);
      setFeeShip(findShip.price);
    },
    [ship]
  );

  const handleConfirmSuccess = useCallback(() => {
    setShowSuccess(!showSuccess);
    navigate(PATH.CART);
  }, [showSuccess, navigate]);

  const handleConfirmFail = useCallback(() => {
    setShowFail(!showFail);
  }, [showFail]);

  useEffect(() => {
    dispatch(getAllShip());
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    setFeeShip(ship[0].price);
    setShipId(ship[0]._id);
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
                    handleOnChange={handleOnChangeTypeShip}
                  />
                </div>
                <div className="input">
                  <Input
                    name="payment_method"
                    placeholder={t("payment_method")}
                    type="select"
                    options={PAYMENT_OPTION}
                    align="left"
                    handleOnChange={handleOnChangePayMethod}
                  />
                </div>
              </div>
              <div className="col col-sm-12 col-md-5 form-pay">
                <div className="form-header">
                  {t("order_n", { param: product.length })}
                </div>
                <div className="form-body">
                  <div className="temporary_fee">
                    {t("temporary_fee", { param: intoMoney })}&#8363;
                  </div>
                  <div className="ship_fee">
                    {t("ship_fee", { param: feeShip })}&#8363;
                  </div>
                </div>
                <div className="form-footer">
                  <div className="label-total">
                    {t("total", { param: feeShip + intoMoney })}&#8363;
                  </div>
                  <div className="btn-order offline" id="btn-order">
                    <div className="pay-online">
                      <PayPalScriptProvider
                        options={{
                          "client-id": "test",
                          components: "buttons",
                          currency: "USD",
                        }}
                      >
                        <PayPal
                          currency="USD"
                          showSpinner={false}
                          amount={((feeShip + intoMoney) / 23000).toFixed(2)}
                          req={req}
                        />
                      </PayPalScriptProvider>
                    </div>
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
        <ModalCommon
          show={showSuccess}
          modalTitle={t("action_success", { param: t("order_v") })}
          modalBody={null}
          handleConfirm={handleConfirmSuccess}
          handleCloseModal={() => setShowSuccess(!showSuccess)}
          isButton
        />
        <ModalCommon
          show={showFail}
          modalTitle={t("action_fail", { param: t("order_v") })}
          modalBody={null}
          handleConfirm={handleConfirmFail}
          handleCloseModal={() => setShowFail(!showFail)}
          isButton
        />
      </>
    </Formik>
  );
}

export default Order;
