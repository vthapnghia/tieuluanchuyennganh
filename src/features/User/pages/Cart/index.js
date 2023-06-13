import { useCallback, useEffect, useMemo, useState } from "react";
import "./Cart.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../constants/path";
import Button from "../../../../components/Button";
import TableCommon from "../../../../components/TableCommon";
import { useDispatch, useSelector } from "react-redux";
import {
  editQuantity,
  getAllCart,
  removeCart,
  removeToCart,
  updateCart,
} from "./cartSlice";
import ModalCommon from "../../../../components/ModalCommon";
import { getUser } from "../../../Authentication/authSlice";
import Icons from "../../../../components/Icons";
import {
  getAllVoucher,
  removeStateVoucher,
} from "../../../Admin/pages/ManagementVoucher/voucherSlice";
import { COLOR } from "../../../../constants/global";
import { currencyFormatting } from "../../../../until/common";
import { empty } from "../../../../assets/img/index";

function Cart() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart?.cart);
  const voucher = useSelector((state) => state.voucher.allVoucher?.promotions);
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
  const [minusDisabled, setMinusDisabled] = useState(false);
  const [plusDisabled, setPlusDisabled] = useState(false);

  const handleIconQuantity = useCallback(
    async (action, element) => {
      let data = {
        product_id: element.product._id,
        size: element.size,
        quantity: action,
      };

      await dispatch(editQuantity({ data, noLoading: true })).then((res) => {
        if (res.payload.status === 200) {
          const tag = document.getElementById(
            `quantity_${element.product._id}_${element.size}`
          );
          if (tag) {
            let value = Number(tag.value) + Number(action);
            tag.value = value;
            let newCart = cart.map((item) => {
              if (item.product._id === element.product._id) {
                return { ...item, quantity: value };
              }
              return item;
            });
            dispatch(updateCart(newCart));
          }
        }
      });
    },
    [cart, dispatch]
  );

  const handleRemove = useCallback(
    (id) => (e) => {
      e.stopPropagation();
      setIdRow(id);
      setShow(!show);
    },
    [show]
  );

  const handleQuantity = useCallback(
    (e, option, element) => {
      e.stopPropagation();
      if (option === -1) {
        if (element.quantity - 1 >= 1) {
          handleIconQuantity(-1, element);
        } else {
          setIdRow(`${element.product._id}_${element.size}`);
          setShow(!show);
        }
      } else {
        if (element.quantity + 1 <= element.product.size[element.size]) {
          handleIconQuantity(1, element);
        }
      }
    },
    [handleIconQuantity, show]
  );

  const cols = useMemo(
    () => [
      { label: t("product"), align: "center", width: "25%" },
      { label: t("price"), align: "center", width: "15%" },
      { label: t("size"), align: "center", width: "10%" },
      { label: t("quantity"), align: "center", width: "12%" },
      { label: t("title_total"), align: "center", width: "15%" },
    ],
    [t]
  );

  const rows = useMemo(() => {
    let productInCart = [];

    cart?.forEach((element) => {
      productInCart.push({
        id: `${element.product._id}_${element.size}_${element.quantity}_${
          element.product.price * (1 - element.product.discount / 100)
        }`,
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
              <div className="d-flex quantity">
                <button
                  className="minus"
                  onClick={(e) => handleQuantity(e, -1, element)}
                >
                  <Icons.Minus color={minusDisabled ? COLOR.GRAY : ""} />
                </button>
                <div onClick={(e) => e.stopPropagation()}>
                  <input
                    id={`quantity_${element.product._id}_${element.size}`}
                    type="text"
                    disabled
                    value={element.quantity}
                    className="w-100 text-center"
                  />
                </div>
                <button
                  className="plus"
                  onClick={(e) => handleQuantity(e, 1, element)}
                >
                  <Icons.Plus color={plusDisabled ? COLOR.GRAY : ""} />
                </button>
              </div>
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
  }, [cart, handleQuantity, minusDisabled, plusDisabled]);

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
    setIdRow(id_product);
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
    let cartTemp = cart.filter((item) => item.product._id !== idRow);
    dispatch(updateCart(cartTemp));
  }, [showMessage, cart, dispatch, idRow]);

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
    return voucherFilter.map((item) => {
      return (
        <div
          key={item._id}
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
    let purchase = [];
    checkBox.forEach((item) => {
      let findProduct = cart?.find((element) => {
        return element.product._id === item.split("_")[0];
      });
      if (findProduct) {
        purchase.push(findProduct);
      }
    });
    navigate(PATH.ORDER, {
      state: { listPurchase: purchase, fastBuy: false, isChecked: isChecked },
    });
  }, [cart, checkBox, isChecked, navigate]);

  useEffect(() => {
    dispatch(getAllCart());
    dispatch(getUser());
    dispatch(getAllVoucher());

    return () => {
      dispatch(removeStateVoucher());
      dispatch(removeCart());
    };
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

  return useMemo(
    () => (
      <>
        <div className="Cart row">
          {cart && cart.length > 0 ? (
            <>
              <div className="product col-sm-12 col-lg-8">
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

              <div className="info-purchase col-sm-12 col-lg-4">
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
                  </div>
                  <div className="fee-total">
                    <span>{t("total")}</span>
                    {checkBox && checkBox.length > 0 ? (
                      <span className="total">
                        {currencyFormatting(feeTemporary - checkedVoucher)}
                      </span>
                    ) : (
                      <span className="please-choose">
                        {t("please_choose_product")}
                      </span>
                    )}
                  </div>
                </div>
                <div className="order">
                  <Button
                    className="red w-100"
                    onClick={handlePurchase}
                    disabled={!checkBox || checkBox?.length === 0}
                  >
                    {t("purchase")}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="no-product">
              <img src={empty} alt="no product" />
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
    ),
    [
      cart,
      checkBox,
      checkedVoucher,
      chooseVoucher,
      cols,
      feeTemporary,
      handleClick,
      handleClose,
      handleCloseMessage,
      handleConfirmVoucher,
      handlePurchase,
      handleRemove,
      modalBody,
      modalBodyVoucher,
      modalTitle,
      navigate,
      rows,
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
