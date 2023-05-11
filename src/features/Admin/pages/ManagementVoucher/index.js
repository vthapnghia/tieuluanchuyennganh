import { Formik } from "formik";
import { t } from "i18next";
import { useCallback, useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import ModalCommon from "../../../../components/ModalCommon";
import "./ManagementVoucher.scss";
import TabVoucher from "./TabVoucher";
import {
  addVoucher,
  getAllVoucher,
  getVoucherById,
  updateVoucher,
} from "./voucherSlice";
import moment from "moment";
import { empty } from "../../../../assets/img";

function ManagementVoucher(params) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showView, setShowView] = useState(false);
  const [modalTitleMessage, setModalTitleMessage] = useState(null);
  const [modalBodyMessage, setModalBodyMessage] = useState(null);
  const formikRef = useRef();
  const allVoucher = useSelector(
    (state) => state.voucher.allVoucher?.promotions
  );
  const [id, setId] = useState();
  const voucherById = useSelector(
    (state) => state.voucher.voucherById?.promotion
  );
  const ref = useRef();
  const [tab, setTab] = useState(0);

  const voucherByStatus = useCallback(
    (status) => {
      if (status === 0) {
        return allVoucher;
      } else {
        if (status === 1) {
          const voucherFilter = allVoucher?.filter((voucherItem) => {
            const datoTo = new Date(voucherItem.use_date_to).getTime();
            const currentDate = new Date().getTime();
            return (
              voucherItem.amount > 0 &&
              datoTo - currentDate >= 0
            );
          });
          return voucherFilter;
        } else {
          const voucherFilter = allVoucher?.filter((voucherItem) => {
            const datoTo = new Date(voucherItem.use_date_to).getTime();
            const currentDate = new Date().getTime();
            return (voucherItem.amount === 0 || datoTo - currentDate < 0);
          });
          return voucherFilter;
        }
      }
    },
    [allVoucher]
  );

  const handleAddVoucher = useCallback(
    async (values) => {
      let data = { ...values };
      data.use_date_from = moment(new Date(values.use_date_from)).format(
        "MMMM DD, YYYY"
      );
      data.use_date_to = moment(new Date(values.use_date_to)).format(
        "MMMM DD, YYYY"
      );
      if (id) {
        await dispatch(updateVoucher({ data: data, id: id })).then((res) => {
          if (res.payload.status === 200) {
            setModalTitleMessage(
              t("action_success", { param: t("update_voucher") })
            );
            setModalBodyMessage(null);
            setShowMessage(!showMessage);
          } else {
            setModalTitleMessage(
              t("action_fail", { param: t("update_voucher") })
            );
            setModalBodyMessage(t("try_again"));
            setShowMessage(!showMessage);
          }
        });
      } else {
        await dispatch(addVoucher(data)).then((res) => {
          if (res.payload.status === 201) {
            setModalTitleMessage(
              t("action_success", { param: t("add_voucher") })
            );
            setModalBodyMessage(null);
            setShowMessage(!showMessage);
          } else {
            setModalTitleMessage(t("action_fail", { param: t("add_voucher") }));
            setModalBodyMessage(t("try_again"));
            setShowMessage(!showMessage);
          }
        });
      }
    },
    [dispatch, showMessage, id]
  );

  const modalBody = useMemo(() => {
    return (
      <div className="row">
        <div className="col col-md-6">
          <Input name="code" type="text" placeholder={t("code")} />
          <Input
            name="min_order"
            type="number"
            placeholder={t("min_order")}
            style={{ textAlign: "left" }}
          />
          <Input
            name="discount_price"
            type="number"
            placeholder={t("discount_price")}
            style={{ textAlign: "left" }}
          />
        </div>
        <div className="col col-md-6">
          <Input
            name="use_date_from"
            type="date"
            ref={ref}
            placeholder={t("use_date_from")}
          />
          <Input
            name="use_date_to"
            type="date"
            placeholder={t("use_date_to")}
          />
          <Input
            name="amount"
            type="number"
            placeholder={t("quantity")}
            style={{ textAlign: "left" }}
          />
        </div>
      </div>
    );
  }, []);

  const handleBtnAddVoucher = useCallback(() => {
    setShow(!show);
    setModalTitle(t("add_voucher"));
  }, [show]);

  const handleConfirm = useCallback(() => {
    setShow(!show);
    formikRef.current.submitForm();
  }, [show]);

  const handleCloseModal = useCallback(() => {
    setShow(!show);
    setId(null);
    formikRef.current.resetForm();
  }, [show]);

  const handleCloseModalMessage = useCallback(() => {
    setShowMessage(!showMessage);
    setId(null);
    formikRef.current.resetForm();
  }, [showMessage]);

  const handleConfirmMessage = useCallback(() => {
    setShowMessage(!showMessage);
    dispatch(getAllVoucher());
    formikRef.current.resetForm();
  }, [showMessage, dispatch]);

  const handleClick = useCallback(
    async (id) => {
      await dispatch(getVoucherById(id)).then((res) => {
        if (res.payload.status === 200) {
          setId(id);
          setShowView(!showView);
        } else {
          setModalTitleMessage(
            t("action_fail", { param: t("update_voucher") })
          );
          setModalBodyMessage(t("try_again"));
          setShowMessage(!showMessage);
        }
      });
    },
    [dispatch, showView, showMessage]
  );

  const modalBodyView = useMemo(() => {
    return (
      <div style={{ padding: "10px" }}>
        <div>
          <span style={{ fontWeight: "600" }}>{t("code")}&#58;&#160;</span>
          <span>{voucherById?.code}</span>
        </div>
        <div>
          <span style={{ fontWeight: "600" }}>{t("min_order")}&#58;&#160;</span>
          <span>{voucherById?.min_order}</span>
        </div>
        <div>
          <span style={{ fontWeight: "600" }}>
            {t("discount_price")}&#58;&#160;
          </span>
          <span>{voucherById?.discount_price}</span>
        </div>
        <div>
          <span style={{ fontWeight: "600" }}>
            {t("use_date_from")}&#58;&#160;
          </span>
          <span>
            {moment(new Date(voucherById?.use_date_from)).format("DD-MM-YYYY")}
          </span>
        </div>
        <div>
          <span style={{ fontWeight: "600" }}>
            {t("use_date_to")}&#58;&#160;
          </span>
          <span>
            {moment(new Date(voucherById?.use_date_to)).format("DD-MM-YYYY")}
          </span>
        </div>
        <div>
          <span style={{ fontWeight: "600" }}>{t("quantity")}&#58;&#160;</span>
          <span>{voucherById?.amount}</span>
        </div>
      </div>
    );
  }, [
    voucherById?.code,
    voucherById?.min_order,
    voucherById?.discount_price,
    voucherById?.use_date_from,
    voucherById?.use_date_to,
    voucherById?.amount,
  ]);

  const handleConfirmView = useCallback(() => {
    setShow(!show);
    setShowView(!showView);
  }, [show, showView]);

  const handleCloseModalView = useCallback(() => {
    setId(null);
    setShowView(!showView);
  }, [showView]);

  const initialValues = useMemo(() => {
    if (id) {
      return {
        code: voucherById?.code,
        min_order: voucherById?.min_order,
        discount_price: voucherById?.discount_price,
        use_date_from: moment(new Date(voucherById?.use_date_from)).format(
          "YYYY-MM-DD"
        ),
        use_date_to: moment(new Date(voucherById?.use_date_to)).format(
          "YYYY-MM-DD"
        ),
        amount: voucherById?.amount,
      };
    }
    return {
      code: "",
      min_order: "",
      discount_price: "",
      use_date_from: "",
      use_date_to: "",
      amount: "",
    };
  }, [
    voucherById?.code,
    voucherById?.min_order,
    voucherById?.discount_price,
    voucherById?.use_date_from,
    voucherById?.use_date_to,
    voucherById?.amount,
    id,
  ]);

  const handleClickTab = useCallback(
    (index) => {
      const elementTabClick = document.getElementById(`tab-${index}`);
      const elementTabCurrent = document.getElementById(`tab-${tab}`);
      if (elementTabClick && elementTabCurrent) {
        elementTabClick.classList.add("is-active");
        elementTabCurrent.classList.remove("is-active");
        setTab(index);
      }
    },
    [tab]
  );

  useEffect(() => {
    dispatch(getAllVoucher());
  }, [dispatch]);

  return useMemo(
    () => (
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          code: Yup.string().required(t("MS_01", { param: t("code") })),
          min_order: Yup.string().required(t("MS_01", { param: t("code") })),
          discount_price: Yup.string().required(
            t("MS_01", { param: t("code") })
          ),
          use_date_from: Yup.string().required(
            t("MS_01", { param: t("code") })
          ),
          use_date_to: Yup.string().required(t("MS_01", { param: t("code") })),
          amount: Yup.string().required(t("MS_01", { param: t("code") })),
        })}
        enableReinitialize
        innerRef={formikRef}
        onSubmit={handleAddVoucher}
      >
        <div id="management-voucher">
          <div className="btn-add-voucher">
            <Button className="primary" onClick={handleBtnAddVoucher}>
              {t("add_voucher")}
            </Button>
          </div>
          <div className="tab-header row">
            <div
              className="tab-header-item col-md-4 text-center is-active"
              id="tab-0"
              onClick={() => handleClickTab(0)}
            >
              {t("all")}
            </div>
            <div
              className="tab-header-item col-md-4 text-center"
              id="tab-1"
              onClick={() => handleClickTab(1)}
            >
              {t("is_still")}
            </div>
            <div
              className="tab-header-item col-md-4 text-center"
              id="tab-2"
              onClick={() => handleClickTab(2)}
            >
              {t("no_longer")}
            </div>
          </div>
          {allVoucher && allVoucher.length > 0 && (
            <div className="tab-content">
              {voucherByStatus(0) && voucherByStatus(0).length > 0 ? (
                <TabVoucher
                  vouchers={voucherByStatus(0)}
                  handleClick={handleClick}
                  className={`${tab !== 0 ? "no-active" : ""} tab-item`}
                />
              ) : (
                <div className={tab !== 0 ? "no-active" : "no-order"}>
                  <img src={empty} alt="empty" />
                  <span>{t("no_order")}</span>
                </div>
              )}
              {voucherByStatus(1) && voucherByStatus(1).length > 0 ? (
                <TabVoucher
                  vouchers={voucherByStatus(1)}
                  handleClick={handleClick}
                  className={`${tab !== 1 ? "no-active" : ""} tab-item`}
                />
              ) : (
                <div className={tab !== 1 ? "no-active" : "no-order"}>
                  <img src={empty} alt="empty" />
                  <span>{t("no_order")}</span>
                </div>
              )}
              {voucherByStatus(2) && voucherByStatus(2).length > 0 ? (
                <TabVoucher
                  vouchers={voucherByStatus(2)}
                  handleClick={handleClick}
                  className={`${tab !== 2 ? "no-active" : ""} tab-item`}
                />
              ) : (
                <div className={tab !== 2 ? "no-active" : "no-order"}>
                  <img src={empty} alt="empty" />
                  <span>{t("no_order")}</span>
                </div>
              )}
            </div>
          )}
          <ModalCommon
            className="modal-voucher"
            show={show}
            modalTitle={modalTitle}
            modalBody={modalBody}
            isButton
            handleConfirm={handleConfirm}
            handleCloseModal={handleCloseModal}
          />
          <ModalCommon
            show={showMessage}
            modalTitle={modalTitleMessage}
            modalBody={modalBodyMessage}
            isButton
            handleConfirm={handleConfirmMessage}
            handleCloseModal={handleCloseModalMessage}
          />

          <ModalCommon
            className="modal-voucher"
            show={showView}
            modalTitle={t("voucher")}
            modalBody={modalBodyView}
            isButton
            handleConfirm={handleConfirmView}
            handleCloseModal={handleCloseModalView}
            labelButton={t("update")}
          />
        </div>
      </Formik>
    ),
    [
      allVoucher,
      handleAddVoucher,
      handleBtnAddVoucher,
      handleClick,
      handleClickTab,
      handleCloseModal,
      handleCloseModalMessage,
      handleCloseModalView,
      handleConfirm,
      handleConfirmMessage,
      handleConfirmView,
      initialValues,
      modalBody,
      modalBodyMessage,
      modalBodyView,
      modalTitle,
      modalTitleMessage,
      show,
      showMessage,
      showView,
      tab,
      voucherByStatus,
    ]
  );
}

export default ManagementVoucher;
