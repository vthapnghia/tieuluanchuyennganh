import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import ModalCommon from "../../../../components/ModalCommon";
import { getUser } from "../../../Authentication/authSlice";
import Icons from "../../../../components/Icons";
import { getAllVoucher } from "../../../Admin/pages/ManagementVoucher/voucherSlice";
import { PAYMENT_OPTION } from "../../../../constants/global";
import {
  getAllShip,
  removeStateShip,
} from "../../../Admin/pages/ManagementShip/ShipSlice";
import { createOrder, removeStateOrder } from "../Order/OrderSlice";
import "./Order.scss";
import PATH from "../../../../constants/path";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPal from "./PayPal";
import { currencyFormatting } from "../../../../until/common";

function Order() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const voucher = useSelector((state) => state.voucher.allVoucher?.promotions);
  const ship = useSelector((state) => state.ship.allShip?.ships);
  const { state } = useLocation();
  const user = useSelector((state) => state.auth.user);
  const [feeTemporary, setFeeTemporary] = useState(0);
  const [showVoucher, setShowVoucher] = useState(false);
  const [checkedVoucher, setCheckedVoucher] = useState(null);
  const [isChecked, setIsChecked] = useState(state.isChecked);
  const [methodPay, setMethodPay] = useState(1);
  const [methodDelivery, setMethodDelivery] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [req, setReq] = useState({});

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

  const handleChangePromotion = useCallback((e) => {
    setIsChecked(e.target.id);
  }, []);

  const modalBodyVoucher = useMemo(() => {
    const voucherFilter = voucher?.filter((voucherItem) => {
      const dateFrom = new Date(voucherItem.use_date_from);
      const datoTo = new Date(voucherItem.use_date_to);
      const currentDate = new Date();
      return (
        voucherItem.amount > 0 &&
        datoTo - currentDate > 0 &&
        currentDate - dateFrom > 0
      );
    });
    if (!voucherFilter || voucherFilter.length === 0) {
      return t("no_voucher");
    }
    return voucherFilter.map((item, index) => {
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
            disabled={feeTemporary < item.min_order}
            onChange={handleChangePromotion}
            defaultChecked={isChecked === item._id}
          />
          <label htmlFor={item._id} style={{ marginLeft: "10px" }}>
            {t("condition", {
              param: item.discount_price,
              min: item.min_order,
            })}
          </label>
        </div>
      );
    });
  }, [voucher, t, feeTemporary, handleChangePromotion, isChecked]);

  const handleChangeOptionPay = useCallback(
    (value) => {
      const element = document.getElementById("btn-order");
      setMethodPay(value);
      if (value === 1) {
        const online = document.getElementsByClassName("online");
        online && element.classList.remove("online");
        element.classList.add("offline");
      } else {
        const offline = document.getElementsByClassName("offline");
        offline && element.classList.toggle("offline");
        element.classList.toggle("online");

        const items = state.listPurchase.map((productItem) => {
          console.log(productItem);
          return {
            product_id: productItem.product_id,
            size: productItem.size,
            quantity: productItem.quantity,
          };
        });

        // setReq({
        //   items: items,
        //   total: feeShip + intoMoney,
        //   ship_id: values?.type_ship,
        //   payment_method: Number(values?.payment_method),
        //   location: values?.address,
        //   receiver_name: values?.name,
        //   receiver_phone: values?.phone,
        //   is_fast_buy: state?.fastBuy || false,
        // });
      }
    },
    [state.listPurchase]
  );

  const handleChangeOptionDelivery = useCallback((value) => {
    setMethodDelivery(value);
  }, []);

  const handlePayment = useCallback(() => {
    const products = state.listPurchase.map((item) => {
      return {
        product_id: item.product._id,
        size: item.size,
        quantity: item.quantity,
      };
    });
    const data = {
      items: products,
      total: feeTemporary + checkedVoucher + methodDelivery?.price,
      ship_id: methodDelivery?._id,
      payment_method: methodPay,
      location: user?.address,
      receiver_name: user?.name,
      receiver_phone: user?.phone,
      is_fast_buy: state?.fastBuy || false,
    };
    dispatch(createOrder(data)).then((res) => {
      if (res.payload.status === 200) {
        setShowSuccess(!showSuccess);
      } else {
        setShowFail(!showFail);
      }
    });
  }, [
    checkedVoucher,
    dispatch,
    feeTemporary,
    methodDelivery?._id,
    methodDelivery?.price,
    methodPay,
    showFail,
    showSuccess,
    state?.fastBuy,
    state?.listPurchase,
    user?.address,
    user?.name,
    user?.phone,
  ]);

  const handleConfirmSuccess = useCallback(() => {
    setShowSuccess(!showSuccess);
    navigate(PATH.USER_ORDERS.BASE);
  }, [showSuccess, navigate]);

  const handleConfirmFail = useCallback(() => {
    setShowFail(!showFail);
  }, [showFail]);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllShip());
    dispatch(getAllVoucher());

    return () => {
      dispatch(removeStateShip());
      dispatch(removeStateOrder());
    };
  }, [dispatch]);

  useEffect(() => {
    if (ship) {
      setMethodDelivery(ship[0]);
    }
  }, [ship]);

  useEffect(() => {
    if (voucher && voucher.length > 0) {
      let findVoucher = voucher.find((item) => item._id === isChecked);
      if (findVoucher) {
        setCheckedVoucher(findVoucher.discount_price);
      }
    }
  }, [isChecked, voucher]);

  useEffect(() => {
    let total = 0;
    state.listPurchase.forEach((element) => {
      const price = element.product.price;
      const quantity = element.quantity;
      total = total + price * quantity;
    });
    setFeeTemporary(total);
  }, [state.listPurchase]);

  return useMemo(
    () => (
      <>
        <div className="Order row">
          <div className="list-purchase col-md-6">
            {state.listPurchase.map((item, index) => {
              return (
                <div key={index}>
                  <div className="purchase">
                    <img src={item.product.product_image[0]} alt="" />
                    <div className="info">
                      <span className="name">{item.product.name}</span>
                      <div className="d-flex justify-content-between">
                        <span className="quantity">SL: {item.quantity}</span>
                        <span className="total">
                          {currencyFormatting(
                            item.quantity *
                              (item.product.price *
                                (1 - item.product.discount / 100))
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="choose-method col-md-3">
            <div className="method-pay">
              <span className="header">{t("payment_method")}</span>
              <div className="option">
                {PAYMENT_OPTION.map((item) => {
                  return (
                    <div
                      key={item.value}
                      className="d-flex align-items-center"
                      style={{ height: "64px" }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        id={`option-${item.value}`}
                        defaultChecked={item.value === 1}
                        onChange={() => handleChangeOptionPay(item.value)}
                      />
                      <span className="radio-fake"></span>
                      <label className="label" htmlFor={`option-${item.value}`}>
                        {item.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="method-delivery">
              <span className="header">{t("medthod_delivery")}</span>
              <div className="option">
                {ship?.map((item, index) => {
                  return (
                    <div
                      key={item._id}
                      className="d-flex align-items-center"
                      style={{ height: "64px" }}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        id={`option-${item._id}`}
                        defaultChecked={index === 0}
                        onChange={() => handleChangeOptionDelivery(item)}
                      />
                      <span className="radio-fake"></span>
                      <label className="label" htmlFor={`option-${item._id}`}>
                        {item.type}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="info-purchase col-md-3">
            <div className="customer-info">
              <div className="header">{t("delivery_to")}</div>
              <div className="name-and-phone">
                <span className="name">{user?.name}</span>
                <i></i>
                <span className="phone">{user?.phone}</span>
              </div>
              <div className="address">{user?.address}</div>
            </div>
            <div className="discount">
              <div className="header">{t("voucher")}</div>
              <div className="choose-coupon" onClick={chooseVoucher}>
                <Icons.Ticked color="#0B74E5" />
                <span>{t("choose_voucher")}</span>
              </div>
            </div>
            <div className="fee">
              <div className="fee-category">
                <div className="fee-temporary">
                  <span>{t("fee_temporary")}</span>
                  <span>{currencyFormatting(feeTemporary)}</span>
                </div>
                <div className="fee-discount">
                  <span>{t("discount")}</span>
                  <span>{currencyFormatting(-checkedVoucher)}</span>
                </div>
                <div className="fee-delivery">
                  <span>{t("ship_fee")}</span>
                  <span>{currencyFormatting(methodDelivery?.price)}</span>
                </div>
              </div>
              <div className="fee-total">
                <span>{t("total")}</span>

                <span className="total">
                  {currencyFormatting(
                    feeTemporary - checkedVoucher + (methodDelivery?.price || 0)
                  )}
                </span>
              </div>
            </div>
            <div className="payment offline" id="btn-order">
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
                    amount={(
                      feeTemporary -
                      checkedVoucher +
                      (methodDelivery?.price || 0) / 23000
                    ).toFixed(2)}
                    req={req}
                  />
                </PayPalScriptProvider>
              </div>
              <Button className="red w-100 pay-offline" onClick={handlePayment}>
                {t("order")}
              </Button>
            </div>
          </div>
        </div>
        <ModalCommon
          show={showVoucher}
          modalTitle={t("voucher")}
          modalBody={modalBodyVoucher}
          handleConfirm={handleConfirmVoucher}
          handleCloseModal={() => setShowVoucher(!showVoucher)}
          isButton
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
          modalBody={t("try_again")}
          handleConfirm={handleConfirmFail}
          handleCloseModal={() => setShowFail(!showFail)}
          isButton
        />
      </>
    ),
    [
      checkedVoucher,
      chooseVoucher,
      feeTemporary,
      handleChangeOptionDelivery,
      handleChangeOptionPay,
      handleConfirmFail,
      handleConfirmSuccess,
      handleConfirmVoucher,
      handlePayment,
      methodDelivery?.price,
      modalBodyVoucher,
      req,
      ship,
      showFail,
      showSuccess,
      showVoucher,
      state.listPurchase,
      t,
      user?.address,
      user?.name,
      user?.phone,
    ]
  );
}
export default Order;
