import { t } from "i18next";
import moment from "moment/moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Icons from "../../../../../components/Icons";
import ModalCommon from "../../../../../components/ModalCommon";
import TableCommon from "../../../../../components/TableCommon";
import { deleteAccount, getAllAccount } from "../AccountSlice";

function TabAccount({ accounts }) {
  const [listAccount, setListAccount] = useState(accounts);
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalBody, setModalBody] = useState(null);
  const [id, setId] = useState(null);

  const cols = [
    { label: t("email"), align: "center", width: "20%" },
    { label: t("created_at"), align: "center", width: "20%", sort: true },
    { label: t("role"), align: "center", width: "20%" },
    { label: t("status"), align: "center", width: "10%" },
  ];

  const rows = useMemo(() => {
    return listAccount?.map((itemAccount) => {
      return {
        id: itemAccount._id,
        columns: [
          {
            label: itemAccount.email,
            align: "center",
            width: "20%",
          },
          {
            label: moment(new Date(itemAccount.created_at)).format(
              "DD-MM-YYYY"
            ),
            align: "center",
            width: "20%",
          },
          {
            label: itemAccount.is_admin
              ? t("admin")
              : itemAccount.is_seler
              ? t("seller")
              : t("user"),
            align: "center",
            width: "20%",
          },
          {
            label: (
              <Icons.Dots color={itemAccount.is_active ? "#31a24c" : "#ccc"} />
            ),
            align: "center",
            width: "10%",
          },
        ],
      };
    });
  }, [listAccount]);

  const handleSort = useCallback(
    (type, index) => {
      const list = [...listAccount];
      setListAccount(
        list.sort((a, b) => {
          const date_a = new Date(a.created_at);
          const date_b = new Date(b.created_at);
          return (date_a - date_b) * type;
        })
      );
    },
    [listAccount]
  );

  const handleRemove = useCallback(
    (id) => () => {
      setId(id);
      setShowMessage(!showMessage);
    },
    [showMessage]
  );

  const handleConfirm = useCallback(() => {
    setShow(!show);
    dispatch(getAllAccount());
  }, [dispatch, show]);

  const handleConfirmMessage = useCallback(async () => {
    setShowMessage(!showMessage);
    await dispatch(deleteAccount(id)).then((res) => {
      if (res.payload.status === 200) {
        setModalTitle(t("action_success", { param: t("lock_account") }));
        setModalBody(null);
        setShow(!show);
      } else {
        setModalTitle(t("action_fail", { param: t("lock_account") }));
        setModalBody(t("try_again"));
        setShow(!show);
      }
    });
  }, [dispatch, show, showMessage, id]);

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setListAccount(accounts);
    }
  }, [accounts]);

  return (
    <div id="account-by-active">
      {accounts && accounts.length > 0 ? (
        <TableCommon
          cols={cols}
          rows={rows}
          oneButton={true}
          labelHeader={t("action")}
          handleRemove={handleRemove}
          handleSort={handleSort}
          handleClick={() => {}}
        />
      ) : (
        <></>
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
        modalTitle={t("confirm_lock")}
        modalBody={t("message_confirm_lock")}
        isButton
        handleCloseModal={() => setShowMessage(!showMessage)}
        handleConfirm={handleConfirmMessage}
      />
    </div>
  );
}

export default TabAccount;
