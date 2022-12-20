import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Formik } from "formik";
import "./Cart.scss";
import Input from "../../../../components/Input";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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

function Cart() {
  const formikRef = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart?.cart);
  const [idRow, setIdRow] = useState(0);
  const [show, setShow] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [modalBody, setModalBody] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const checkBox = useSelector((state) => state.cart?.checkBox);
  const [intoMoney, setIntoMoney] = useState("");

  const handleIconQuantity = useCallback(
    async (action, data) => {
      data.quantity = action;
      await dispatch(editQuantity({ data, noLoading: true })).then((res) => {
        if (res.payload.status === 200) {
          dispatch(arrayCheckBox(null));
          dispatch(getAllCart());
        }
      });
    },
    [dispatch]
  );

  const cols = [
    { label: t("image"), align: "center", width: "10%" },
    { label: t("product"), align: "center", width: "15%" },
    { label: t("price"), align: "center", width: "15%" },
    { label: t("size"), align: "center", width: "10%" },
    { label: t("quantity"), align: "center", width: "12%" },
    { label: t("total"), align: "center", width: "15%" },
  ];

  const rows = useMemo(() => {
    let productInCart = [];

    cart?.forEach((element) => {
      if (element.status === 1) {
        productInCart.push({
          id: `${element.product._id}_${element.size}_${element.quantity}_${element.product.price}`,
          columns: [
            {
              label: (
                <img
                  src={element.product.product_image[0]}
                  alt="product"
                  width="100"
                  height="100"
                  style={{ objectFit: "cover", borderRadius: "10px" }}
                />
              ),
              align: "center",
              width: "10%",
            },
            { label: element.product.name, align: "center", width: "15%" },
            {
              label: `${element.product.price} ₫`,
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
                  data={{ product_id: element.product._id, size: element.size }}
                />
              ),
              align: "center",
              width: "12%",
            },
            {
              label: `${element.product.price * element.quantity} ₫`,
              align: "center",
              width: "15%",
            },
          ],
        });
      }
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

  const handlePay = useCallback((e) => {
    if (intoMoney === 0) {
      e.preventDefault();
    } else {
      navigate(PATH.ORDER, { state: { intoMoney: intoMoney, product: checkBox } });
    }
  }, [intoMoney, checkBox, navigate]);

  useEffect(() => {
    dispatch(getAllCart());
  }, [dispatch]);

  useEffect(() => {
    let total = 0;
    checkBox?.forEach((element) => {
      const elementSplit = element.split("_");
      const price = Number(elementSplit[2]);
      const quantity = Number(elementSplit[3]);
      total = total + price * quantity;
    });
    setIntoMoney(total);
  }, [checkBox]);
  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handelOnSubmit}
        innerRef={formikRef}
      >
        <>
          <div className="Cart">
            <div className="untree_co-section before-footer-section">
              <div className="container">
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
                <div className="row into-money">
                  <span>{`${t("into_money")}: ${intoMoney}`}</span>
                </div>
                <div className="row">
                  <div className="btn-continue-shopping ">
                    <div className="btn-group">
                      <div>
                        <Button
                          className="primary"
                          onClick={() => navigate(PATH.PRODUCT.LIST_PRODUCT)}
                        >
                          {t("continue_shopping")}
                        </Button>
                      </div>
                      <div>
                        <Button className="btn primary" onClick={handlePay}>
                          {t("pay")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ModalCommon
            show={show}
            modalTitle={t("confirm_remove", { param: t("product") })}
            modalBody={t("messge_confirm_remove")}
            handleConfirm={handleClose}
            isButton
          />
          <ModalCommon
            show={showMessage}
            modalTitle={modalTitle}
            modalBody={modalBody}
            handleConfirm={handleCloseMessage}
            isButton
          />
        </>
      </Formik>
    </>
  );
}
export default Cart;
