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
import { getAllCart } from "../Cart/cartSlice";
import { Container, Grid } from "@mui/material";

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
  const [changeInfo, setChangeInfo] = useState(false);
  const [receiverName, setReceiverName] = useState(false);
  const [receiverPhone, setReceiverPhone] = useState(false);
  const [receiverAddress, setReceiverAddress] = useState(false);
  const [errName, setErrName] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errAddress, setErrAddress] = useState("");

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
          return {
            product_id: productItem.product._id,
            size: productItem.size,
            quantity: productItem.quantity,
          };
        });

        setReq({
          items: items,
          total: feeTemporary + checkedVoucher + methodDelivery?.price,
          ship_id: methodDelivery?._id,
          payment_method: methodPay,
          location: receiverAddress,
          receiver_name: receiverName,
          receiver_phone: receiverPhone,
          is_fast_buy: state?.fastBuy || false,
        });
      }
    },
    [
      checkedVoucher,
      feeTemporary,
      methodDelivery?._id,
      methodDelivery?.price,
      methodPay,
      receiverAddress,
      receiverName,
      receiverPhone,
      state?.fastBuy,
      state.listPurchase,
    ]
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
      location: receiverAddress,
      receiver_name: receiverName,
      receiver_phone: receiverPhone,
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
    receiverAddress,
    receiverName,
    receiverPhone,
    showFail,
    showSuccess,
    state?.fastBuy,
    state.listPurchase,
  ]);

  const handleConfirmSuccess = useCallback(async () => {
    setShowSuccess(!showSuccess);
    await dispatch(getAllCart());
    navigate(PATH.USER_ORDERS.BASE);
  }, [showSuccess, dispatch, navigate]);

  const handleConfirmFail = useCallback(() => {
    setShowFail(!showFail);
  }, [showFail]);

  const onKeyDown = useCallback((e) => {
    const containsNumbers = /^[0-9]+$/.test(e.key);
    if (!containsNumbers && e.key !== "Backspace") {
      e.preventDefault();
    }
  }, []);

  const handleCancelChangeInfo = useCallback(() => {
    setChangeInfo(!changeInfo);
    setReceiverName(user?.name);
    setReceiverPhone(user?.phone);
    setReceiverAddress(user?.address);
    setErrName("");
    setErrPhone("");
    setErrAddress("");
  }, [changeInfo, user?.address, user?.name, user?.phone]);

  const handelOkChangeInfo = useCallback(() => {
    if (receiverName && receiverPhone && receiverAddress) {
      setChangeInfo(!changeInfo);
    } else {
      if (!receiverName) setErrName("Vui lòng nhập tên người nhận");
      if (!receiverPhone) setErrPhone("Vui lòng nhập số điện thoại");
      if (!receiverAddress) setErrAddress("Vui lòng nhập địa chỉ");
    }
  }, [changeInfo, receiverAddress, receiverName, receiverPhone]);

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

  useEffect(() => {
    setReceiverName(user?.name);
    setReceiverPhone(user?.phone);
    setReceiverAddress(user?.address);
  }, [user?.address, user?.name, user?.phone]);

  return useMemo(
    () => (
      <>
        <div id="order">
          <Container maxWidth="lg">
            <Grid container columnSpacing={1}>
              <Grid item xs="6" className="list-purchase">
                {state.listPurchase.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="purchase">
                        <img src={item.product.product_image[0]} alt="" />
                        <div className="info">
                          <span className="name">{item.product.name}</span>
                          <div className="d-flex justify-content-between">
                            <span className="quantity">
                              SL: {item.quantity}
                            </span>
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
              </Grid>
              <Grid item xs="3" className="choose-method">
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
                          <label
                            className="label"
                            htmlFor={`option-${item.value}`}
                          >
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
                          <label
                            className="label"
                            htmlFor={`option-${item._id}`}
                          >
                            {item.type}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Grid>
              <Grid item xs="3" className="info-purchase">
                <div className="customer-info">
                  <div className="header">
                    <span>{t("delivery_to")}</span>
                    <div
                      className="icon-edit"
                      onClick={() => setChangeInfo(true)}
                    >
                      <Icons.Edit
                        height={12}
                        width={12}
                        color="rgb(128, 128, 137)"
                      />
                    </div>
                  </div>
                  {changeInfo ? (
                    <div className="info-input">
                      <div className="input-name">
                        <input
                          type="text"
                          placeholder="Tên người nhận"
                          onChange={(e) => setReceiverName(e?.target.value)}
                          value={receiverName}
                          style={{
                            padding: `5px ${
                              errName ? "35px" : "10px"
                            } 5px 10px`,
                          }}
                          onBlur={() =>
                            receiverName
                              ? setErrName("")
                              : setErrName("Vui lòng nhập tên người nhận")
                          }
                          onFocus={() => setErrName("")}
                        />
                        {errName && (
                          <span className="warning-icon-input">
                            <Icons.Exclamation />
                            <span className="tooltiptext">{errName}</span>
                          </span>
                        )}
                      </div>
                      <div className="input-phone">
                        <input
                          type="text"
                          placeholder="Số điện thoại"
                          onKeyDown={onKeyDown}
                          onChange={(e) => setReceiverPhone(e?.target.value)}
                          value={receiverPhone}
                          style={{
                            padding: `5px ${
                              errPhone ? "35px" : "10px"
                            } 5px 10px`,
                          }}
                          onBlur={() =>
                            receiverPhone
                              ? setErrPhone("")
                              : setErrPhone("Vui lòng nhập số điện thoại")
                          }
                          onFocus={() => setErrPhone("")}
                        />
                        {errPhone && (
                          <span className="warning-icon-input">
                            <Icons.Exclamation />
                            <span className="tooltiptext">{errPhone}</span>
                          </span>
                        )}
                      </div>
                      <div className="input-address">
                        <textarea
                          placeholder="Địa chỉ"
                          onChange={(e) => setReceiverAddress(e?.target.value)}
                          value={receiverAddress}
                          style={{
                            padding: `5px ${
                              errAddress ? "35px" : "10px"
                            } 5px 10px`,
                          }}
                          onBlur={() =>
                            receiverPhone
                              ? setErrAddress("")
                              : setErrAddress("Vui lòng nhập số điện thoại")
                          }
                          onFocus={() => setErrAddress("")}
                        />
                        {errAddress && (
                          <span className="warning-icon-input">
                            <Icons.Exclamation />
                            <span className="tooltiptext">{errAddress}</span>
                          </span>
                        )}
                      </div>
                      <div className="d-flex justify-content-between">
                        <Button
                          className="outline"
                          onClick={handelOkChangeInfo}
                        >
                          Đồng ý
                        </Button>
                        <Button
                          className="red"
                          onClick={handleCancelChangeInfo}
                        >
                          Hủy
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="name-and-phone">
                        <span className="name">{receiverName}</span>
                        <i></i>
                        <span className="phone">{receiverPhone}</span>
                      </div>
                      <div className="address">{receiverAddress}</div>
                    </>
                  )}
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
                        feeTemporary -
                          checkedVoucher +
                          (methodDelivery?.price || 0)
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
                          (feeTemporary -
                            checkedVoucher +
                            (methodDelivery?.price || 0)) /
                          23000
                        ).toFixed(2)}
                        req={req}
                        disabled={changeInfo}
                      />
                    </PayPalScriptProvider>
                  </div>
                  <Button
                    disabled={changeInfo}
                    className="red w-100 pay-offline"
                    onClick={handlePayment}
                  >
                    {t("order")}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Container>
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
          handleCloseModal={handleConfirmSuccess}
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
      changeInfo,
      checkedVoucher,
      chooseVoucher,
      errAddress,
      errName,
      errPhone,
      feeTemporary,
      handelOkChangeInfo,
      handleCancelChangeInfo,
      handleChangeOptionDelivery,
      handleChangeOptionPay,
      handleConfirmFail,
      handleConfirmSuccess,
      handleConfirmVoucher,
      handlePayment,
      methodDelivery?.price,
      modalBodyVoucher,
      onKeyDown,
      receiverAddress,
      receiverName,
      receiverPhone,
      req,
      ship,
      showFail,
      showSuccess,
      showVoucher,
      state.listPurchase,
      t,
    ]
  );
}
export default Order;
