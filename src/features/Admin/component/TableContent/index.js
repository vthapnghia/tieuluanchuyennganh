import { useTranslation } from "react-i18next";
import { useRef, useState, useCallback } from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import TableCommon from "../../../../components/TableCommon";
import { Formik } from "formik";
import Icons from "../../../../components/Icons";
import ModalCommon from "../../../../components/ModalCommon";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../contanst/path";
import "./TableContent.scss";

function TableContent({cols, rows, ...props}) {
    const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const formikRef = useRef();
  const navigate = useNavigate();
 

  const handleRemove = useCallback(
    (id) => () => {
      console.log("remove: ", id);
      setShowModal(!showModal);
    },
    [showModal]
  );

  const handleEdit = useCallback(
    (id) => () => {
      console.log("remove: ", id);
      navigate(PATH.ADMIN.PRODUCT_DETAIL.replace(":id", id));
    },
    [navigate]
  );

  const handleOnKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      console.log(formikRef.current?.values);
    }
  }, []);

  // const handleOnClickLeftIcon = 
  //   (values) => {
  //     console.log(values);
  //   }

  const handleCloseModal = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  const handleSort = useCallback((type, index) => {
    console.log(type, index);
  }, []);
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
                // handleOnClickLeftIcon={handleOnClickLeftIcon}
              />
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
            handleSort={handleSort}
          />
        </div>
        <ModalCommon
          show={showModal}
          handleClose={handleCloseModal}
          modaleTitle={t("confirm_remove")}
        />
      </>
    </Formik>
  );
}

export default TableContent;
