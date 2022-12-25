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
import { addVoucher, getAllVoucher } from "./voucherSlice";
import moment from "moment";

function ManagementVoucher(params) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [modalTitleMessage, setModalTitleMessage] = useState(null);
  const [modalBodyMessage, setModalBodyMessage] = useState(null);
  const formikRef = useRef();
  const allVoucher = useSelector(
    (state) => state.voucher.allVoucher?.promotions
  );

  const voucherBystatus = useCallback(
    (status) => {
      if (status === 0) {
        return allVoucher;
      } else {
        if (status === 1) {
          const voucherFiter = allVoucher?.filter((voucherItem) => {
            const dateFrom = new Date(voucherItem.use_date_from);
            const datoTo = new Date(voucherItem.use_date_to);
            const currentDate = new Date();
            return (
              voucherItem.amount > 0 &&
              datoTo - currentDate > 0 &&
              currentDate - dateFrom > 0
            );
          });
          return voucherFiter;
        } else {
          const voucherFiter = allVoucher?.filter((voucherItem) => {
            const dateFrom = new Date(voucherItem.use_date_from);
            const datoTo = new Date(voucherItem.use_date_to);
            const currentDate = new Date();
            return (voucherItem.amount =
              0 || datoTo - currentDate <= 0 || currentDate - dateFrom <= 0);
          });
          return voucherFiter;
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
      await dispatch(addVoucher(values)).then((res) => {
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
    },
    [dispatch, showMessage]
  );

  const modalBody = useMemo(() => {
    return (
      <div>
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
        <Input
          name="use_date_from"
          type="date"
          placeholder={t("use_date_from")}
          style={{ textAlign: "left" }}
        />
        <Input name="use_date_to" type="date" placeholder={t("use_date_to")} />
        <Input
          name="amount"
          type="number"
          placeholder={t("amount")}
          style={{ textAlign: "left" }}
        />
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
    formikRef.current.resetForm();
  }, [show]);

  const handleCloseModalMessage = useCallback(() => {
    setShowMessage(!showMessage);
    formikRef.current.resetForm();
  }, [showMessage]);

  const handleConfirmMessage = useCallback(() => {
    setShowMessage(!showMessage);
    dispatch(getAllVoucher());
    formikRef.current.resetForm();
  }, [showMessage, dispatch]);

  useEffect(() => {
    dispatch(getAllVoucher());
  }, [dispatch]);

  return (
    <Formik
      initialValues={{
        code: "",
        min_order: "",
        discount_price: "",
        use_date_from: "",
        use_date_to: "",
        amount: "",
      }}
      validationSchema={Yup.object({
        code: Yup.string().required(t("MS_01", { param: t("code") })),
        min_order: Yup.string().required(t("MS_01", { param: t("code") })),
        discount_price: Yup.string().required(t("MS_01", { param: t("code") })),
        use_date_from: Yup.string().required(t("MS_01", { param: t("code") })),
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
            {t("add_news")}
          </Button>
        </div>

        <Tabs
          defaultActiveKey="voucher-all"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="voucher-all" title={t("all")}>
            <TabVoucher vouchers={voucherBystatus(0)} />
          </Tab>
          <Tab eventKey="is_still" title={t("is_still")}>
            <TabVoucher vouchers={voucherBystatus(0)} />
          </Tab>
          <Tab eventKey="no_longer" title={t("no_longer")}>
            <TabVoucher vouchers={voucherBystatus(0)} />
          </Tab>
        </Tabs>
        <ModalCommon
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
      </div>
    </Formik>
  );
}

export default ManagementVoucher;
