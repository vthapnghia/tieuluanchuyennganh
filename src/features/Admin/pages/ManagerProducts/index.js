import { useTranslation } from "react-i18next";
import { useRef, useState, useCallback } from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import TableCommon from "../../../../components/TableCommon";
import { Formik } from "formik";
import "./ManagerProducts.scss";
import Icons from "../../../../components/Icons";
import ModalCommon from "../../../../components/ModalCommon";

function ManagerProducts(props) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const formikRef = useRef();
  const cols = [
    { label: "column 1", align: "center", width: "20%" },
    { label: "column 1", align: "center", width: "20%" },
    { label: "column 1", align: "center", width: "20%" },
    { label: "column 1", align: "center", width: "20%" },
  ];
  const rows = [
    {
      columns: [
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
      ],
    },
    {
      columns: [
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
      ],
    },

    {
      columns: [
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
      ],
    },
    {
      columns: [
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
      ],
    },
    {
      columns: [
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
      ],
    },
    {
      columns: [
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
      ],
    },
  ];

  const handleRemove = (id) => () => {
    console.log("remove: ", id);
  };

  const handleEdit = (id) => () => {
    console.log("remove: ", id);
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log(formikRef.current?.values);
    }
  };

  const handleOnClickLeftIcon = (values) => () => {
    console.log(values);
  };

  const handleCloseModal = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);
  return (
    <Formik
      initialValues={{ search: "" }}
      enableReinitialize
      innerRef={formikRef}
    >
      <>
        <div className="manager-product">
          <div className="manager-action d-flex align-items-center justify-content-between">
            <div className="input-search-product">
              <Input
                name="search"
                placeholder="Tìm kiếm sản phẩm"
                type="text"
                leftIcon={<Icons.Search />}
                onKeyDown={handleOnKeyDown}
                handleOnClickLeftIcon={handleOnClickLeftIcon}
              ></Input>
            </div>
            <div className="btn-add-product">
              <Button className="primary">Thêm sản phẩm</Button>
            </div>
          </div>
          <TableCommon
            cols={cols}
            rows={rows}
            trueButton={true}
            labelHeader={t("action")}
            handleRemove={handleRemove}
            handleEdit={handleEdit}
          />
        </div>
        <ModalCommon show={showModal} handleClose={handleCloseModal} />
      </>
    </Formik>
  );
}

export default ManagerProducts;
