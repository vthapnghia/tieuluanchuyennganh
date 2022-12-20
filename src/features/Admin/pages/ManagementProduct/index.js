import { useTranslation } from "react-i18next";
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import TableCommon from "../../../../components/TableCommon";
import { Formik } from "formik";
import "./ManagementProduct.scss";
import Icons from "../../../../components/Icons";
import ModalCommon from "../../../../components/ModalCommon";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../contanst/path";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProduct,
} from "../../../User/pages/Products/ProductSlice";

function ManagementProduct() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const formikRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.products);
  const [listProduct, setListProduct] = useState(product);
  const [idProduct, setIdProduct] = useState();
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");


  const cols = [
    { label: t("name_product"), align: "center", width: "20%" },
    { label: t("brand"), align: "center", width: "20%", sort: true },
    { label: t("price"), align: "center", width: "20%" },
  ];
  const rows = useMemo(() => {
    return listProduct?.map((productItem) => {
      return {
        id: productItem._id,
        columns: [
          { label: productItem.name, align: "center", width: "20%" },
          { label: productItem.brand, align: "center", width: "20%" },
          { label: productItem.price, align: "center", width: "20%" },
        ],
      };
    });
  }, [listProduct]);

  const handleRemove = useCallback(
    (id) => (e) => {
      e.stopPropagation();
      setShowModal(!showModal);
      setIdProduct(id);
    },
    [showModal]
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

  const handleCloseModal = useCallback(async () => {
    setShowModal(!showModal);
    await dispatch(deleteProduct(idProduct)).then((res) => {
      if (res.payload?.status === 200) {
        setModalTitle(t("action_success", { param: t("delete_product") }));
      } else {
        setModalTitle(t("action_fail", { param: t("delete_product") }));
        setModalBody(t("try_again"));
      }
      setShowMessage(!showMessage);
    });
  }, [showModal, dispatch, idProduct, showMessage, t]);

  const handleCloseMessage = useCallback(() => {
    setShowMessage(!showMessage);
    dispatch(getAllProduct());
  }, [showMessage, dispatch]);

  const handleSort = useCallback(
    (type, index) => {
      const list = [...product];
      setListProduct(
        list.sort((a, b) => {
          if (type === 1) {
            if (a.brand > b.brand) return 1;
            if (a.brand < b.brand) return -1;
          } else {
            if (a.brand < b.brand) return 1;
            if (a.brand > b.brand) return -1;
          }
          return 0;
        })
      );
    },
    [product]
  );

  const handleClick = useCallback(
    (id) => () => {
      navigate(PATH.ADMIN.PRODUCTS.PRODUCT_DETAIL.replace(":id", id));
    },
    [navigate]
  );

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  useEffect(() => {
    setListProduct(product);
  }, [product]);

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
              <Button
                className="primary"
                onClick={() => navigate(PATH.ADMIN.PRODUCTS.ADD_PRODUCT)}
              >
                {t("add_product")}
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
          modalTitle={t("confirm_remove", { param: t("product") })}
          modalBody={t("messge_confirm_remove")}
          handleConfirm={handleCloseModal}
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
  );
}

export default ManagementProduct;
