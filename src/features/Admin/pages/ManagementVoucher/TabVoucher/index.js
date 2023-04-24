import { t } from "i18next";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import ModalCommon from "../../../../../components/ModalCommon";
import TableAdminCommon from "../../../../../components/TableAdminCommon";
import { deleteVoucher, getAllVoucher } from "../voucherSlice";

function TabVoucher({ vouchers, handleClick, className }) {
  const [listVoucher, setListVoucher] = useState(vouchers);
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalBody, setModalBody] = useState(null);
  const [id, setId] = useState(null);

  const cols = [
    { label: t("code"), align: "center", width: "15%" },
    { label: t("use_date_from"), align: "center", width: "20%", sort: true },
    { label: t("use_date_to"), align: "center", width: "20%" },
    { label: t("quantity"), align: "center", width: "10%" },
  ];

  const rows = useMemo(() => {
    return listVoucher?.map((itemVoucher) => {
      return {
        id: itemVoucher._id,
        columns: [
          {
            label: itemVoucher.code,
            align: "center",
            width: "15%",
          },
          {
            label: moment(new Date(itemVoucher.use_date_from)).format(
              "DD-MM-YYYY"
            ),
            align: "center",
            width: "20%",
          },
          {
            label: moment(new Date(itemVoucher.use_date_to)).format(
              "DD-MM-YYYY"
            ),
            align: "center",
            width: "20%",
          },
          {
            label: itemVoucher.amount,
            align: "center",
            width: "10%",
          },
        ],
      };
    });
  }, [listVoucher]);

  const handleSort = useCallback(
    (type, index) => {
      const list = [...listVoucher];
      setListVoucher(
        list.sort((a, b) => {
          const date_a = new Date(a.use_date_from);
          const date_b = new Date(b.use_date_from);
          return (date_a - date_b) * type;
        })
      );
    },
    [listVoucher]
  );

  const handleRemove = useCallback(
    (id) => (e) => {
      e.stopPropagation();
      setId(id);
      setShowMessage(!showMessage);
    },
    [showMessage]
  );

  const handleConfirm = useCallback(() => {
    setShow(!show);
    dispatch(getAllVoucher());
  }, [dispatch, show]);

  const handleConfirmMessage = useCallback(async () => {
    setShowMessage(!showMessage);
    await dispatch(deleteVoucher(id)).then((res) => {
      if (res.payload.status === 200) {
        setModalTitle(t("action_success", { param: t("delete_voucher") }));
        setModalBody(null);
        setShow(!show);
      } else {
        setModalTitle(t("action_fail", { param: t("delete_voucher") }));
        setModalBody(t("try_again"));
        setShow(!show);
      }
    });
  }, [showMessage, id, dispatch, show]);

  const voucherItemClick = useCallback(
    (id) => (e) => {
      handleClick(e, id);
    },
    [handleClick]
  );

  useEffect(() => {
    if (vouchers && vouchers.length > 0) {
      setListVoucher(vouchers);
    }
  }, [vouchers]);

  return (
    <div id="voucher-by-status" className={className}>
      {vouchers && vouchers.length > 0 && (
        <TableAdminCommon
          cols={cols}
          rows={rows}
          oneButton={true}
          handleRemove={handleRemove}
          handleSort={handleSort}
          handleClick={voucherItemClick}
        />
      )}

      <ModalCommon
        show={show}
        modalTitle={modalTitle}
        modalBody={modalBody}
        isButton
        handleCloseModal={() => setShow(!show)}
        handleConfirm={handleConfirm}
      />
      <ModalCommon
        show={showMessage}
        modalTitle={t("delete_voucher")}
        modalBody={t("messge_confirm_remove")}
        isButton
        handleCloseModal={() => setShowMessage(!showMessage)}
        handleConfirm={handleConfirmMessage}
      />
    </div>
  );
}

export default TabVoucher;
