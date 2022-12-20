import { useCallback, useEffect, useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";
import { createOrder } from "../OrderSlice";
import ModalCommon from "../../../../../components/ModalCommon";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../../contanst/path";

const style = { layout: "vertical" };

function ButtonWrapper({ currency, showSpinner, amount, req }) {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const dispatchReact = useDispatch();
  const navigate = useNavigate
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

  const handleConfirmSuccess = useCallback(() => {
    setShowSuccess(!showSuccess);
    navigate(PATH.CART);
  }, [showSuccess, navigate]);

  const handleConfirmFail = useCallback(() => {
    setShowFail(!showFail);
  }, [showFail]);
 
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, dispatch]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style, req]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function (orderData) {
            dispatchReact(createOrder(req)).then((res) => {
              if (res.payload.status === 200) {
                setShowSuccess(!showSuccess);
              } else {
                setShowFail(!showFail);
              }
            });;
          });
        }}
        onError={(error) => {
          console.log(error);
        }}
        onCancel={() => {}}
        cookiePolicy='single-host-origin'
      />
      <ModalCommon
          show={showSuccess}
          modalTitle={t("action_success", { param: t("order") })}
          modalBody={null}
          handleConfirm={handleConfirmSuccess}
          handleCloseModal={() => setShowSuccess(!showSuccess)}
          isButton
        />
        <ModalCommon
          show={showFail}
          modalTitle={t("action_fail", { param: t("order") })}
          modalBody={null}
          handleConfirm={handleConfirmFail}
          handleCloseModal={() => setShowFail(!showFail)}
          isButton
        />
    </>
  );
}

export default ButtonWrapper;
