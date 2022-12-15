import { useTranslation } from "react-i18next";
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import TableCommon from "../../../../components/TableCommon";
import { Formik } from "formik";
import "./ManagementShip.scss";
import Icons from "../../../../components/Icons";
import ModalCommon from "../../../../components/ModalCommon";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { addShip, getAllShip, getShipById, removeShip, uploadShip } from "./ShipSlice";

function ManagementShip(props) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const formikRef = useRef();
  const dispatch = useDispatch();
  const ship = useSelector((state) => state.ship.allShip?.ships);
  const shipById = useSelector((state) => state.ship.shipById);
  const [idShip, setIdShip] = useState(null);
  const [messageTitle, setMessageTitle] = useState(null);
  const [messageBody, setMessageBody] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);

  const cols = [
    { label: t("type_ship"), align: "left", width: "10%" },
    { label: t("price"), align: "center", width: "10%" },
    { label: t("description"), align: "center", width: "20%" },
  ];

  const rows = useMemo(() => {
    return ship?.map((shipItem) => {
      return {
        id: shipItem._id,
        columns: [
          { label: shipItem.type, align: "left", width: "10%" },
          { label: shipItem.price, align: "center", width: "10%" },
          { label: shipItem.description, align: "center", width: "20%" },
        ],
      };
    });
  }, [ship]);

  const handleRemove = useCallback(
    (id) => (e) => {
      e.stopPropagation();
      setIdShip(id);
      setShowModalRemove(!showModalRemove);
    },
    [showModalRemove]
  );

  const handleOnKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      console.log(formikRef.current?.values);
    }
  }, []);

  const handleSort = useCallback((type, index) => {
    console.log(type, index);
  }, []);

  const handleClick = useCallback(
    (id) => async () => {
      setIdShip(id);
      await dispatch(getShipById(id)).then((res) => {
        if (res.payload.status === 200) {
          setModalTitle(t("update_ship"));
          setShowModal(!showModal);
        }
      });
    },
    [dispatch, showModal, t]
  );

  const modalBody = useMemo(() => {
    return (
      <div>
        <Input name="type" type="text" placeholder={t("type_ship")} />
        <Input
          name="price"
          type="number"
          placeholder={t("price")}
          style={{ textAlign: "left" }}
        />
        <Input
          name="description"
          type="textarea"
          placeholder={t("description")}
        />
      </div>
    );
  }, [t]);

  const handleShip = useCallback(
    async (values) => {
      setShowModal(!showModal);
      if (idShip) {
        await dispatch(uploadShip({data: values, id: idShip})).then((res) => {
          if (res.payload.status === 200) {
            setMessageTitle(t("action_success", { param: t("update_ship") }));
            setMessageBody(t(null));
            setShowModalMessage(!showModalMessage);
          } else {
            setMessageTitle(t("action_fail", { param: t("update_ship") }));
            setMessageBody(t("try_again"));
            setShowModalMessage(!showModalMessage);
          }
        });
      } else {
        await dispatch(addShip(values)).then((res) => {
          if (res.payload.status === 201) {
            setMessageTitle(t("action_success", { param: t("add_ship") }));
            setMessageBody(t(null));
            setShowModalMessage(!showModalMessage);
          } else {
            setMessageTitle(t("action_fail", { param: t("add_ship") }));
            setMessageBody(t("try_again"));
            setShowModalMessage(!showModalMessage);
          }
        });
      }
    },
    [dispatch, showModalMessage, showModal, t, idShip]
  );

  const handleCloseModalRemove = useMemo(
    () => (e) => {
      e.stopPropagation();
      setShowModalRemove(!showModalRemove);
      dispatch(removeShip(idShip)).then((res) => {
        if (res.payload.status === 200) {
          setMessageTitle(t("action_success", { param: t("delete_ship") }));
          setMessageBody(null);
          setShowModalMessage(!showModalMessage);
        } else {
          setMessageTitle(t("action_fail", { param: t("delete_ship") }));
          setMessageBody(t("try_again"));
          setShowModalMessage(!showModalMessage);
        }
      });
    },
    [idShip, dispatch, showModalRemove, t, showModalMessage]
  );

  const handleCloseModalMessage = useCallback(() => {
    setShowModalMessage(!showModalMessage);
    formikRef.current.resetForm();
    dispatch(getAllShip());
  }, [showModalMessage, dispatch]);

  const closeModal = useCallback(() => {
    setShowModal(!showModal);
    formikRef.current.resetForm();
  }, [showModal]);

  const closeModalMessage = useCallback(() => {
    setShowModalMessage(!showModalMessage);
    formikRef.current.resetForm();
  }, [showModalMessage]);

  const closeModalRemove = useCallback(() => {
    setShowModalRemove(!showModalRemove);
    formikRef.current.resetForm();
  }, [showModalRemove]);

  const initialValues = useMemo(() => {
    if (idShip) {
      return {
        type: shipById?.type,
        price: shipById?.price,
        description: shipById?.description,
      };
    } else {
      return {
        type: "",
        price: "",
        description: "",
      };
    }
  }, [idShip, shipById]);

  const handleAddShip = useCallback(() => {
    setIdShip(null);
    setModalTitle(t("add_ship"));
    setShowModal(!showModal);
  }, [showModal, t]);

  useEffect(() => {
    dispatch(getAllShip());
  }, [dispatch]);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      innerRef={formikRef}
      onSubmit={handleShip}
      validationSchema={yup.object({
        type: yup.string().required(t("MS_01", { param: t("type_ship") })),
        price: yup.number().required(t("MS_01", { param: t("price") })),
        description: yup
          .string()
          .required(t("MS_01", { param: t("description") })),
      })}
    >
      <>
        <div className="manager-ship">
          <div className="manager-action d-flex align-items-center justify-content-between">
            <div className="input-search-ship">
              <Input
                name="search"
                placeholder="Tìm kiếm sản phẩm"
                type="text"
                leftIcon={<Icons.Search />}
                onKeyDown={handleOnKeyDown}
                // handleOnClickLeftIcon={handleOnClickLeftIcon}
              />
            </div>
            <div className="btn-add-ship">
              <Button className="primary" onClick={handleAddShip}>
                {t("add_ship")}
              </Button>
            </div>
          </div>
          <TableCommon
            cols={cols}
            rows={rows}
            oneButton={true}
            labelHeader={t("action")}
            handleRemove={handleRemove}
            handleSort={handleSort}
            handleClick={handleClick}
          />
        </div>
        <ModalCommon
          show={showModal}
          handleClose={() => formikRef.current.submitForm()}
          modalTitle={modalTitle}
          modalBody={modalBody}
          labelButton={idShip ? t("update") : t("add")}
          handleCloseModal={closeModal}
          isButton
        />
        <ModalCommon
          show={showModalRemove}
          handleClose={handleCloseModalRemove}
          modalTitle={t("delete_ship")}
          modalBody={t("messge_confirm_remove")}
          handleCloseModal={closeModalRemove}
          isButton
        />
        <ModalCommon
          show={showModalMessage}
          handleClose={handleCloseModalMessage}
          modalTitle={messageTitle}
          modalBody={messageBody}
          handleCloseModal={closeModalMessage}
          isButton
        />
      </>
    </Formik>
  );
}

export default ManagementShip;
