import { useCallback, useEffect, useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";
import { createOrder } from "../OrderSlice";
import ModalCommon from "../../../../../components/ModalCommon";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../../constants/path";
import { getAllCart } from "../../Cart/cartSlice";

const style = { layout: "vertical" };

function ButtonWrapper({ currency, showSpinner, amount, req, disabled }) {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const dispatchReact = useDispatch();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

  const handleConfirmSuccess = useCallback(async () => {
    setShowSuccess(!showSuccess);
    await dispatchReact(getAllCart());
    navigate(PATH.USER_ORDERS.BASE);
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
        disabled={disabled}
        forceReRender={[amount, currency, style, req]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function (orderData) {
            dispatchReact(createOrder(req)).then((res) => {
              if (res.payload.status === 200) {
                setShowSuccess(!showSuccess);
              } else {
                setShowFail(!showFail);
              }
            });
          });
        }}
        onError={(error) => {
          console.log(error);
        }}
        onCancel={() => {}}
        cookiePolicy="single-host-origin"
      />
      <ModalCommon
        show={showSuccess}
        modalTitle={"Đặt hàng thành công"}
        modalBody={null}
        handleConfirm={handleConfirmSuccess}
        handleCloseModal={handleConfirmSuccess}
        isButton
      />
      <ModalCommon
        show={showFail}
        modalTitle={"Đặt hàng thất bại."}
        modalBody={null}
        handleConfirm={handleConfirmFail}
        handleCloseModal={() => setShowFail(!showFail)}
        isButton
      />
    </>
  );
}

export default ButtonWrapper;
