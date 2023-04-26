import { useTranslation } from "react-i18next";
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import Button from "../../../../components/Button";
import "./ManagementProduct.scss";
import Icons from "../../../../components/Icons";
import ModalCommon from "../../../../components/ModalCommon";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../constants/path";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  getProductById,
  searchProduct,
  setPage,
  uploadProduct,
} from "../../../User/pages/Products/ProductSlice";
import TableAdminCommon from "../../../../components/TableAdminCommon";
import Pagination from "../../../../components/Pagination";
import ProductDetailAdmin from "./ProductDetail";
import { Formik } from "formik";
import { OPTION_SIZE } from "../../../../constants/global";
import * as Yup from "yup";

function ManagementProduct() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.products?.product);
  const count = useSelector((state) => state.product.products?.count);
  const pageNumber = useSelector((state) => state.product.pageNumber);
  const page = useSelector((state) => state.product.page);
  const [listProduct, setListProduct] = useState(product);
  const [idProduct, setIdProduct] = useState(null);
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalTitleAdd, setModalTitleAdd] = useState("");
  const ref = useRef();
  const formikRef = useRef();
  const productById = useSelector(
    (state) => state.product.productById?.product
  );

  const cols = useMemo(
    () => [
      { label: t("name_product"), align: "center", width: "20%" },
      { label: t("brand"), align: "center", width: "20%", sort: true },
      { label: t("price"), align: "center", width: "20%" },
    ],
    [t]
  );

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

  const handleCloseModalAdd = useCallback(
    (event) => {
      setIdProduct(null);
      formikRef.current.resetForm();
      setShowModalAdd(!showModalAdd);
    },
    [showModalAdd]
  );

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
    (id) => {
      dispatch(getProductById(id));
      setIdProduct(id);
      setShowModalAdd(!showModalAdd);
    },
    [dispatch, showModalAdd]
  );

  const handleOnkeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        dispatch(searchProduct(ref.current.value));
      }
    },
    [dispatch]
  );

  const handleSearch = useCallback(() => {
    dispatch(searchProduct(ref.current.value));
  }, [dispatch]);

  const handlePageClick = useCallback(
    (event) => {
      dispatch(
        getProduct({ page: event.selected + 1, pageSize: pageNumber })
      ).then((res) => {
        if (res.payload.status === 200) {
          dispatch(setPage(event.selected + 1));
        }
      });
    },
    [dispatch, pageNumber]
  );

  const initialValues = useMemo(() => {
    if (idProduct) {
      const init = { ...productById?.size };
      init.image = productById?.product_image;
      init.name = productById?.name;
      init.description = productById?.description;
      init.price = productById?.price;
      init.brand = productById?.brand;
      init.gender = productById?.gender;
      init.discount = productById?.discount;
      init.type = productById?.type;
      init.color = productById?.color;
      return init;
    } else {
      const size = OPTION_SIZE.map((sizeItem) => {
        return [sizeItem.label, 0];
      });
      const initObject = Object.fromEntries(size);
      initObject.image = "";
      initObject.name = "";
      initObject.description = "";
      initObject.price = "";
      initObject.brand = "";
      initObject.gender = "";
      initObject.discount = "";
      initObject.type = "";
      initObject.color = "";
      return initObject;
    }
  }, [
    idProduct,
    productById?.size,
    productById?.product_image,
    productById?.name,
    productById?.description,
    productById?.price,
    productById?.brand,
    productById?.gender,
    productById?.discount,
    productById?.type,
    productById?.color,
  ]);

  const handleSave = useCallback(
    async (values) => {
      const {
        image,
        name,
        brand,
        gender,
        description,
        price,
        discount,
        type,
        color,
        ...rest
      } = values;
      const formData = new FormData();
      const size = await JSON.stringify(rest);
      const files = Object.values(image);
      files.forEach((element) => {
        formData.append("image", element);
      });
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("gender", gender);
      formData.append("description", description);
      formData.append("discount", discount);
      formData.append("type", type);
      formData.append("color", color);
      formData.append("size", size);
      if (!idProduct) {
        await dispatch(addProduct(formData)).then((res) => {
          if (res.payload?.status === 201) {
            setModalTitle(t("action_success", { param: t("add_product") }));
            setModalBody(null);
            setShowMessage(!showMessage);
          } else {
            setModalTitle(t("action_fail", { param: t("add_product") }));
            setModalBody(t("try_again"));
            setShowMessage(!showMessage);
          }
        });
      } else {
        await dispatch(
          uploadProduct({ formData: formData, id: idProduct })
        ).then((res) => {
          if (res.payload?.status === 200) {
            setModalTitle(t("action_success", { param: t("update_product") }));
            setModalBody(null);
            setShowMessage(!showMessage);
          } else {
            setModalTitle(t("action_fail", { param: t("update_product") }));
            setModalBody(t("try_again"));
            setShowMessage(!showMessage);
          }
        });
      }
      setIdProduct(null);
      formikRef.current.resetForm();
    },
    [dispatch, idProduct, showMessage, t]
  );

  const validationSchema = useMemo(() => {
    return {
      image: Yup.mixed().test(
        "file",
        t("MS_01", { param: "file" }),
        (value) => {
          if (!value) {
            return false;
          }
          return true;
        }
      ),
      name: Yup.string().required(t("MS_01", { param: t("name_product") })),
      description: Yup.string().required(
        t("MS_01", { param: t("description") })
      ),
      price: Yup.number().required(t("MS_01", { param: t("description") })),
      brand: Yup.string().required(t("MS_01", { param: t("brand") })),
      gender: Yup.string().required(t("MS_01", { param: t("gender") })),
      discount: Yup.number().required(t("MS_01", { param: t("description") })),
      type: Yup.string().required(t("MS_01", { param: t("type") })),
      color: Yup.string().required(t("MS_01", { param: t("color") })),
    };
  }, [t]);

  const handleShowModalAdd = useCallback(() => {
    setModalTitleAdd(t("add_product"));
    setShowModalAdd(!showModalAdd);
  }, [showModalAdd, t]);

  const handleConfirmModalAdd = useCallback(() => {
    setShowModalAdd(!showModalAdd);
    formikRef.current.submitForm();
  }, [showModalAdd]);

  useEffect(() => {
    dispatch(getProduct({ page: page, pageSize: pageNumber }));
  }, [dispatch, page, pageNumber]);

  useEffect(() => {
    setListProduct(product);
  }, [product]);

  return useMemo(
    () => (
      <>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleSave}
          innerRef={formikRef}
          validationSchema={Yup.object(validationSchema)}
        >
          <>
            <div className="manager-product">
              <div className="manager-action d-flex align-items-center justify-content-between">
                <div className="input-search-product">
                  <input
                    type="text"
                    placeholder={t("search")}
                    ref={ref}
                    onKeyDown={handleOnkeyDown}
                  ></input>
                  <div className="icon-search" onClick={handleSearch}>
                    <Icons.Search />
                  </div>
                </div>
                <div className="btn-add-product">
                  <Button className="green" onClick={handleShowModalAdd}>
                    {t("add_product")}
                  </Button>
                </div>
              </div>
              <TableAdminCommon
                cols={cols}
                rows={rows}
                oneButton={true}
                handleRemove={handleRemove}
                handleSort={handleSort}
                handleClick={handleClick}
              />
              {count && count > pageNumber && (
                <div className="d-flex justify-content-end">
                  <Pagination
                    page={page}
                    count={count}
                    pageNumber={pageNumber}
                    handlePageClick={handlePageClick}
                  />
                </div>
              )}
            </div>

            <ModalCommon
              show={showModalAdd}
              modalTitle={modalTitleAdd}
              modalBody={
                <ProductDetailAdmin
                  productImages={idProduct ? productById?.product_image : null}
                />
              }
              handleConfirm={handleConfirmModalAdd}
              handleCloseModal={handleCloseModalAdd}
              isButton
              size="lg"
            />

            <ModalCommon
              show={showModal}
              modalTitle={t("confirm_remove", { param: t("product") })}
              modalBody={t("messge_confirm_remove")}
              handleConfirm={handleCloseModal}
              handleCloseModal={() => setShowModal(!showModal)}
              isButton
            />
            <ModalCommon
              show={showMessage}
              modalTitle={modalTitle}
              modalBody={modalBody}
              handleConfirm={handleCloseMessage}
              handleCloseModal={() => setShowMessage(!showMessage)}
              isButton
            />
          </>
        </Formik>
      </>
    ),
    [
      cols,
      count,
      handleClick,
      handleCloseMessage,
      handleCloseModal,
      handleCloseModalAdd,
      handleConfirmModalAdd,
      handleOnkeyDown,
      handlePageClick,
      handleRemove,
      handleSave,
      handleSearch,
      handleShowModalAdd,
      handleSort,
      idProduct,
      initialValues,
      modalBody,
      modalTitle,
      modalTitleAdd,
      page,
      pageNumber,
      productById?.product_image,
      rows,
      showMessage,
      showModal,
      showModalAdd,
      t,
      validationSchema,
    ]
  );
}

export default ManagementProduct;
