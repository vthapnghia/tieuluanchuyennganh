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
import Icons from "../../../../components/Icons";
import { getAllVoucher } from "../../../Admin/pages/ManagementVoucher/voucherSlice";

function Order(props) {
  const { state } = useLocation();
  const { product, intoMoney } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ship = useSelector((state) => state.ship.allShip?.ships);
  const voucher = useSelector((state) => state.voucher.allVoucher?.promotions);
  const formikRef = useRef();
  const user = useSelector((state) => state.auth.user);
  const [feeShip, setFeeShip] = useState(0);
  const [shipId, setShipId] = useState(null);
  const [payMethod, setPayMethod] = useState(null);
  const [req, setReq] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [showVoucher, setShowVoucher] = useState(false);
  const [checkedVoucher, setCheckedVoucher] = useState(null);
  const [total, setTotal] = useState(null);
  const optionShip = ship?.map((element) => {
    return { value: element._id, label: element.type };
  });
  const [isChecked, setIsChecked] = useState(null);

  const initialValues = useMemo(() => {
    return {
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
      type_ship: ship ? ship[0]?._id : "",
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
        total: total,
        ship_id: shipId,
        payment_method: Number(payMethod),
        location: values.address,
        receiver_name: values.name,
        receiver_phone: values.phone,
        is_fast_buy: state?.fastBuy || false,
      };
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
      dispatch,
      showSuccess,
      showFail,
      state?.fastBuy,
      total,
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
          is_fast_buy: state?.fastBuy || false,
        });
      }
    },
    [feeShip, intoMoney, product, state?.fastBuy]
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
    navigate(PATH.USER_ORDERS.BASE);
  }, [showSuccess, navigate]);

  const handleConfirmFail = useCallback(() => {
    setShowFail(!showFail);
  }, [showFail]);

  const handleChangePromotion = useCallback((e) => {
    setIsChecked(e.target.id) ;
  }, [])

  const modalBody = useMemo(() => {
    const voucherFiter = voucher?.filter((voucherItem) => {
      const dateFrom = new Date(voucherItem.use_date_from);
      const datoTo = new Date(voucherItem.use_date_to);
      const currentDate = new Date();
      return voucherItem.amount > 0 && datoTo - currentDate > 0 && currentDate - dateFrom > 0;
    });
    if (!voucherFiter || voucherFiter.length === 0) {
      return t("no_voucher");
    }
    return voucherFiter.map((item, index) => {
      return (
        <div
          key={index}
          style={{ padding: "10px 0", display: "flex", alignItems: "center" }}
        >
          <input
            type="radio"
            name="radio"
            id={item._id}
            value={item.discount_price}
            disabled={intoMoney < item.min_order}
            onChange={handleChangePromotion}
            defaultChecked= {isChecked === item._id}
          />
          <label htmlFor={item._id} style={{ marginLeft: "10px" }}>
            {t("condition", {param: item.discount_price, min: item.min_order})}</label>
        </div>
      );
    });
  }, [intoMoney, voucher, handleChangePromotion, isChecked]);

  const chooseVoucher = useCallback(() => {
    setShowVoucher(!showVoucher);
  }, [showVoucher]);

  const handleConfirmVoucher = useCallback(
    (e) => {
      const elementInput = document.querySelectorAll("input[name='radio']");
      if (elementInput && elementInput.length > 0) {
        elementInput.forEach((item) => {
          if (item.checked) {
            setCheckedVoucher(Number(item.value));
            return;
          }
        });
      }
      setShowVoucher(!showVoucher);
    },
    [showVoucher]
  );

  useEffect(() => {
    dispatch(getAllShip());
    dispatch(getUser());
    dispatch(getAllVoucher());
  }, [dispatch]);

  useEffect(() => {
    if (ship) {
      setFeeShip(ship[0]?.price);
      setShipId(ship[0]?._id);
    }
  }, [ship]);

  useEffect(() => {
    if (checkedVoucher) {
      setTotal(intoMoney + feeShip - checkedVoucher);
    } else {
      setTotal(intoMoney + feeShip);
    }
  }, [intoMoney, feeShip, checkedVoucher]);

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
                  <div className="voucher">
                    <div className="temporary_fee">
                      <span>{`${t("temporary_fee")}:`}&#160;</span>
                      {checkedVoucher ? (
                        <div className="voucher">
                          <span className="into-money-old">
                            {intoMoney}&#8363;
                          </span>
                          <span>{intoMoney - checkedVoucher}&#8363;</span>
                        </div>
                      ) : (
                        <span>{intoMoney}&#8363;</span>
                      )}
                    </div>
                  </div>

                  <div className="ship_fee">
                    {t("ship_fee", { param: feeShip })}&#8363;
                  </div>
                </div>
                <div className="voucher-option">
                  <div className="icon-voucher">
                    <Icons.Ticked color="#fb3a3a" />
                  </div>
                  <span>{t("voucher")}</span>
                  <span onClick={chooseVoucher}>{`(${t(
                    "choose_voucher"
                  )})`}</span>
                </div>
                <div className="form-footer">
                  <div className="label-total">
                    {t("total", {param: total})}
                    &#8363;
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
                          amount={(total / 23000).toFixed(2)}
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
          modalBody={t("try_again")}
          handleConfirm={handleConfirmFail}
          handleCloseModal={() => setShowFail(!showFail)}
          isButton
        />
        <ModalCommon
          show={showVoucher}
          modalTitle={t("voucher")}
          modalBody={modalBody}
          handleConfirm={handleConfirmVoucher}
          handleCloseModal={() => setShowVoucher(!showVoucher)}
          isButton
        />
      </>
    </Formik>
  );
}

export default Order;
