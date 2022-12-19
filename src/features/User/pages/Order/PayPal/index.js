import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const style = { layout: "vertical" };

function ButtonWrapper({ currency, showSpinner, amount, req }) {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
 
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency]);

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
            console.log("data: ", req);
          });
        }}
        onError={(error) => {
          console.log(error);
        }}
        onCancel={() => {}}
        cookiePolicy='single-host-origin'
      />
    </>
  );
}

export default ButtonWrapper;
