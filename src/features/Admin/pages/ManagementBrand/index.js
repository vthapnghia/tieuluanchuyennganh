import { useTranslation } from "react-i18next";
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import TableCommon from "../../../../components/TableCommon";
import { Formik } from "formik";
import "./ManagementBrand.scss";
import Icons from "../../../../components/Icons";
import ModalCommon from "../../../../components/ModalCommon";
import { useDispatch, useSelector } from "react-redux";
import { addBrand, getAllBrand, removeBrand } from "./BrandSlice";
import * as yup from "yup";

function ManagementBrand(props) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const formikRef = useRef();
  const dispatch = useDispatch();
  const brand = useSelector((state) => state.brand.allBrand?.brands);
  // const brandById = useSelector(state => state.brand.brandById)
  const [idBrand, setIdBrand] = useState();
  const [messageTitle, setMessageTitle] = useState();
  const [messageBody, setMessageBody] = useState();

  const cols = [{ label: t("name_brand"), align: "center", width: "50%" }];

  const rows = useMemo(() => {
    return brand?.map((brandItem) => {
      return {
        id: brandItem._id,
        columns: [{ label: brandItem.name, align: "center", width: "50%" }],
      };
    });
  }, [brand]);

  const handleRemove = useCallback(
    (id) => (e) => {
      e.stopPropagation();
      setIdBrand(id);
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
    (id) => () => {
      setIdBrand(id);
    },
    []
  );

  const modalBody = useMemo(() => {
    return (
      <div>
        <Input name="name" type="text" placeholder={t("brand")} />
      </div>
    );
  }, [t]);

  const handleBrand = useCallback(
    async (values) => {
      await setShowModal(!showModal);
      await dispatch(addBrand({ name: values.name })).then((res) => {
        if (res.payload.status === 201) {
          setMessageTitle(t("action_success", { param: t("add_brand") }));
          setShowModalMessage(!showModalMessage);
        } else {
          setMessageTitle(t("action_fail", { param: t("add_brand") }));
          setMessageBody(t("try_again"));
          setShowModalMessage(!showModalMessage);
        }
      });
    },
    [dispatch, showModalMessage, showModal, t]
  );

  const handleCloseModalRemove = useMemo(
    () => (e) => {
      e.stopPropagation();
      setShowModalRemove(!showModalRemove);
      dispatch(removeBrand(idBrand)).then((res) => {
        if (res.payload.status === 200) {
          setMessageTitle(t("action_success", { param: t("delete_brand") }));
          setShowModalMessage(!showModalMessage);
        } else {
          setMessageTitle(t("action_fail", { param: t("delete_brand") }));
          setMessageBody(t("try_again"));
          setShowModalMessage(!showModalMessage);
        }
      });
    },
    [idBrand, dispatch, showModalRemove, t, showModalMessage]
  );

  const handleCloseModalMessage = useCallback(() => {
    setShowModalMessage(!showModalMessage);
    formikRef.current.resetForm();
    dispatch(getAllBrand());
  }, [showModalMessage, dispatch]);

  useEffect(() => {
    dispatch(getAllBrand());
  }, [dispatch]);

  return (
    <Formik
      initialValues={{ search: "", name: "" }}
      enableReinitialize
      innerRef={formikRef}
      onSubmit={handleBrand}
      validationSchema={yup.object({
        name: yup.string().required(t("MS_01", { param: t("brand") })),
      })}
    >
      <>
        <div className="manager-brand">
          <div className="manager-action d-flex align-items-center justify-content-between">
            <div className="input-search-brand">
              <Input
                name="search"
                placeholder="Tìm kiếm sản phẩm"
                type="text"
                leftIcon={<Icons.Search />}
                onKeyDown={handleOnKeyDown}
                // handleOnClickLeftIcon={handleOnClickLeftIcon}
              />
            </div>
            <div className="btn-add-brand">
              <Button
                className="primary"
                onClick={() => setShowModal(!showModal)}
              >
                {t("add_brand")}
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
          modalTitle={t("add_brand")}
          modalBody={modalBody}
          labelButton={t("add")}
          isButton
        />
        <ModalCommon
          show={showModalRemove}
          handleClose={handleCloseModalRemove}
          modalTitle={t("delete_brand")}
          modalBody={t("messge_confirm_remove")}
          isButton
        />
        <ModalCommon
          show={showModalMessage}
          handleClose={handleCloseModalMessage}
          modalTitle={messageTitle}
          modalBody={messageBody}
          isButton
        />
      </>
    </Formik>
  );
}

export default ManagementBrand;
