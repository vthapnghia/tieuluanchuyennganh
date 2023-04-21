import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Formik } from "formik";
import "./Cart.scss";
import Input from "../../../../components/Input";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import PATH from "../../../../contanst/path";
import Button from "../../../../components/Button";
import TableCommon from "../../../../components/TableCommon";
import { useDispatch, useSelector } from "react-redux";
import {
  arrayCheckBox,
  editQuantity,
  getAllCart,
  removeToCart,
} from "./cartSlice";
import ModalCommon from "../../../../components/ModalCommon";
import { currencyFormatting } from "../../../../contanst/common";
import { getUser } from "../../../Authentication/authSlice";
import Icons from "../../../../components/Icons";
import { getAllVoucher } from "../../../Admin/pages/ManagementVoucher/voucherSlice";
import { elements } from "chart.js";
import { PAYMENT_OPTION } from "../../../../contanst/global";
import { getAllShip } from "../../../Admin/pages/ManagementShip/ShipSlice";
import { createOrder } from "../Order/OrderSlice";

function Cart() {
  const formikRef = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart?.cart);
  const voucher = useSelector((state) => state.voucher.allVoucher?.promotions);
  const ship = useSelector((state) => state.ship.allShip?.ships);
  const { state } = useLocation();
  const [idRow, setIdRow] = useState(0);
  const [show, setShow] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [modalBody, setModalBody] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const checkBox = useSelector((state) => state.cart?.checkBox);
  const user = useSelector((state) => state.auth.user);
  const [feeTemporary, setFeeTemporary] = useState(0);
  const [showVoucher, setShowVoucher] = useState(false);
  const [checkedVoucher, setCheckedVoucher] = useState(null);
  const [isChecked, setIsChecked] = useState(null);
  const [pay, setPay] = useState(false);
  const [listPurchase, setListPurchase] = useState([]);
  const [methodPay, setMethodPay] = useState(1);
  const [methodDelivery, setMethodDelivery] = useState();

  const handleIconQuantity = useCallback(
    async (action, element) => {
      let data = {
        product_id: element.product._id,
        size: element.size,
        quantity: action,
      };

      await dispatch(editQuantity({ data, noLoading: true })).then((res) => {
        if (res.payload.status === 200) {
          // dispatch(arrayCheckBox(null));
          // dispatch(getAllCart());
        }
      });
    },
    [dispatch]
  );

  const cols = [
    // { label: t("image"), align: "center", width: "10%" },
    { label: t("product"), align: "center", width: "25%" },
    { label: t("price"), align: "center", width: "15%" },
    { label: t("size"), align: "center", width: "10%" },
    { label: t("quantity"), align: "center", width: "12%" },
    { label: t("title_total"), align: "center", width: "15%" },
  ];

  const rows = useMemo(() => {
    let productInCart = [];

    cart?.forEach((element) => {
      productInCart.push({
        id: `${element.product._id}_${element.size}_${element.quantity}_${
          element.product.price * (1 - element.product.discount / 100)
        }`,
        product: element,
        columns: [
          {
            label: (
              <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                <img
                  src={element.product.product_image[0]}
                  alt="product"
                  width="70"
                  height="70"
                  style={{
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginRight: "10px",
                  }}
                />
                <span>{element.product.name}</span>
              </div>
            ),
            align: "center",
            width: "25%",
          },
          {
            label: `${
              element.product.price * (1 - element.product.discount / 100)
            } ₫`,
            align: "center",
            width: "15%",
          },
          { label: element.size, align: "center", width: "10%" },
          {
            label: (
              <Input
                name={`quantity_${element.product._id}_${element.size}`}
                type="number"
                quantity={true}
                readonly
                onClick={(e) => e.stopPropagation()}
                max={element.product.size[element.size]}
                handleIconQuantity={handleIconQuantity}
                data={element}
              />
            ),
            align: "center",
            width: "12%",
          },
          {
            label: `${
              element.product.price *
              (1 - element.product.discount / 100) *
              element.quantity
            } ₫`,
            align: "center",
            width: "15%",
          },
        ],
      });
    });

    return productInCart;
  }, [cart, handleIconQuantity]);

  const handelOnSubmit = (values) => {
    console.log(values);
  };

  const handleRemove = useCallback(
    (id) => (e) => {
      e.stopPropagation();
      setIdRow(id);
      setShow(!show);
    },
    [show]
  );

  const handleClick = useCallback(
    (idRow) => () => {
      const id = idRow.split("_")[0];
      navigate(PATH.PRODUCT.DETAIL_PRODUCT.replace(":id", id));
    },
    [navigate]
  );

  const handleClose = useCallback(async () => {
    setShow(!show);
    const id_product = idRow.split("_")[0];
    const size = idRow.split("_")[1];
    await dispatch(removeToCart({ id: id_product, size: size })).then((res) => {
      if (res.payload.status === 200) {
        setModalTitle(t("action_success", { param: t("delete_product") }));
        setModalBody(null);
      } else {
        setModalTitle(t("action_fail", { param: t("delete_product") }));
        setModalBody(t("try_again"));
      }
      setShowMessage(!showMessage);
    });
  }, [idRow, dispatch, show, showMessage, t]);

  const handleCloseMessage = useCallback(() => {
    setShowMessage(!showMessage);
    dispatch(getAllCart());
  }, [showMessage, dispatch]);

  const initialValues = useMemo(() => {
    let initArray = [];
    cart?.forEach((cartItem) => {
      initArray.push([
        `quantity_${cartItem.product._id}_${cartItem.size}`,
        cartItem.quantity,
      ]);
    });
    const init = Object.fromEntries(initArray);
    return init;
  }, [cart]);

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
    const voucherFiter = voucher?.filter((voucherItem) => {
      const dateFrom = new Date(voucherItem.use_date_from);
      const datoTo = new Date(voucherItem.use_date_to);
      const currentDate = new Date();
      return (
        voucherItem.amount > 0 &&
        datoTo - currentDate > 0 &&
        currentDate - dateFrom > 0
      );
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

  const handlePurchase = useCallback(() => {
    setPay(true);
    let purchase = [];
    checkBox.forEach((item) => {
      let findProduct = cart?.find((element) => {
        return element.product._id === item.split("_")[0];
      });
      if (findProduct) {
        purchase.push(findProduct);
      }
    });
    setListPurchase(purchase);
  }, [cart, checkBox]);

  const handleChangeOptionPay = useCallback((value) => {
    setMethodPay(value);
  }, []);

  const handleChangeOptionDelivery = useCallback((value) => {
    setMethodDelivery(value);
  }, []);

  const handlePayment = useCallback(() => {
    console.log(listPurchase);
    const items = listPurchase.map((item) => {
      return {
        product_id: item.product._id,
        size: item.size,
        quantity: item.quantity,
      };
    });
    const data = {
      items: items,
      total: feeTemporary + checkedVoucher + methodDelivery.price,
      ship_id: methodDelivery._id,
      payment_method: methodPay,
      location: user.address,
      receiver_name: user.name,
      receiver_phone: user.phone,
      is_fast_buy: state?.fastBuy || false,
    };
    dispatch(createOrder(data)).then((res) => {
      // if (res.payload.status === 200) {
      //   setShowSuccess(!showSuccess);
      // } else {
      //   setShowFail(!showFail);
      // }
    });
  }, [
    checkedVoucher,
    dispatch,
    feeTemporary,
    listPurchase,
    methodDelivery,
    methodPay,
    state?.fastBuy,
    user.address,
    user.name,
    user.phone,
  ]);

  useEffect(() => {
    dispatch(getAllCart());
    dispatch(getUser());
    dispatch(getAllShip());
    dispatch(getAllVoucher());
  }, [dispatch]);

  useEffect(() => {
    let total = 0;
    checkBox?.forEach((element) => {
      const elementSplit = element.split("_");
      const price = Number(elementSplit[2]);
      const quantity = Number(elementSplit[3]);
      total = total + price * quantity;
    });
    setFeeTemporary(total);
  }, [checkBox]);

  useEffect(() => {
    if (ship) {
      setMethodDelivery(ship[0]);
    }
  }, [ship]);

  return useMemo(
    () => (
      <>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handelOnSubmit}
          innerRef={formikRef}
        >
          <>
            <div className="Cart row">
              {cart && cart.length > 0 ? (
                <>
                  {!pay ? (
                    <div className="product col-md-9">
                      <div className="row">
                        <TableCommon
                          cols={cols}
                          rows={rows}
                          oneButton={true}
                          labelHeader={t("remove")}
                          handleRemove={handleRemove}
                          handleClick={handleClick}
                          checkAll
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="list-purchase col-md-6">
                        {listPurchase.map((item, index) => {
                          return (
                            <div key={index}>
                              <div className="purchase">
                                <img
                                  src={item.product.product_image[0]}
                                  alt=""
                                />
                                <div className="info">
                                  <span className="name">
                                    {item.product.name}
                                  </span>
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
                                    onChange={() =>
                                      handleChangeOptionPay(item.value)
                                    }
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
                          <span className="header">
                            {t("medthod_delivery")}
                          </span>
                          <div className="option">
                            {ship.map((item, index) => {
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
                                    onChange={() =>
                                      handleChangeOptionDelivery(item)
                                    }
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
                      </div>
                    </>
                  )}
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
                          <span>
                            {checkedVoucher
                              ? -currencyFormatting(checkedVoucher)
                              : currencyFormatting()}
                          </span>
                        </div>
                        {pay && (
                          <div className="fee-delivery">
                            <span>{t("ship_fee")}</span>
                            <span>
                              {currencyFormatting(methodDelivery?.price)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="fee-total">
                        <span>{t("total")}</span>
                        {checkBox && checkBox.length > 0 ? (
                          <span className="total">
                            {currencyFormatting(feeTemporary - checkedVoucher + (methodDelivery?.price || 0))}
                          </span>
                        ) : (
                          <span className="please-choose">
                            {t("please_choose_product")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="order">
                      {!pay ? (
                        <Button
                          className="red w-100"
                          onClick={handlePurchase}
                          disabled={!checkBox || checkBox?.length === 0}
                        >
                          {t("purchase")}
                        </Button>
                      ) : (
                        <Button className="red w-100" onClick={handlePayment}>
                          {t("payment")}
                        </Button>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="no-product">
                  <h2>{t("no_product_in_cart")}</h2>
                  <Button
                    className="primary"
                    onClick={() => navigate(PATH.PRODUCT.LIST_PRODUCT)}
                  >
                    {t("shopping")}
                  </Button>
                </div>
              )}
            </div>
            <ModalCommon
              show={show}
              modalTitle={t("confirm_remove", { param: t("product") })}
              modalBody={t("messge_confirm_remove")}
              handleConfirm={handleClose}
              handleCloseModal={() => setShow(!show)}
              isButton
            />
            <ModalCommon
              show={showMessage}
              modalTitle={modalTitle}
              modalBody={modalBody}
              handleConfirm={handleCloseMessage}
              handleCloseModal={() => setShowMessage(!showMessage)}
              isButton
            />
            <ModalCommon
              show={showVoucher}
              modalTitle={t("voucher")}
              modalBody={modalBodyVoucher}
              handleConfirm={handleConfirmVoucher}
              handleCloseModal={() => setShowVoucher(!showVoucher)}
              isButton
            />
          </>
        </Formik>
      </>
    ),
    [
      cart,
      checkBox,
      checkedVoucher,
      chooseVoucher,
      cols,
      feeTemporary,
      handleChangeOptionPay,
      handleClick,
      handleClose,
      handleCloseMessage,
      handleConfirmVoucher,
      handlePayment,
      handlePurchase,
      handleRemove,
      initialValues,
      listPurchase,
      modalBody,
      modalBodyVoucher,
      modalTitle,
      navigate,
      pay,
      rows,
      ship,
      show,
      showMessage,
      showVoucher,
      t,
      user?.address,
      user?.name,
      user?.phone,
    ]
  );
}
export default Cart;
