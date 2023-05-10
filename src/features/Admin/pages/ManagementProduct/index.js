import { useTranslation } from "react-i18next";
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import Button from "../../../../components/Button";
import "./ManagementProduct.scss";
import Icons from "../../../../components/Icons";
import ModalCommon from "../../../../components/ModalCommon";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  getProductById,
  searchProduct,
  setProduct,
  uploadProduct,
} from "../../../User/pages/Products/ProductSlice";
import TableAdminCommon from "../../../../components/TableAdminCommon";
import Pagination from "../../../../components/Pagination";
import ProductDetailAdmin from "./ProductDetail";
import { Formik } from "formik";
import { COLOR, OPTION_SIZE } from "../../../../constants/global";
import * as Yup from "yup";
import ReactSelect from "react-select";
import { getAllBrand } from "../ManagementBrand/BrandSlice";
import { currencyFormatting } from "../../../../until/common";

function ManagementProduct() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.products?.product);
  const count = useSelector((state) => state.product.products?.count);
  const [idProduct, setIdProduct] = useState(null);
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalTitleAdd, setModalTitleAdd] = useState("");
  const formikRef = useRef();
  const productById = useSelector(
    (state) => state.product.productById?.product
  );
  const brand = useSelector((state) => state.brand.allBrand?.brands);
  const [optionsBrand, setOptionsBrand] = useState([]);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(2);
  const [param, setParam] = useState();

  const colorDefaultStyles = useMemo(() => {
    return {
      container: (styles) => ({
        ...styles,
        height: "40px",
      }),
      control: (styles) => ({
        ...styles,
        backgroundColor: COLOR.WHITE,
        width: "100%",
        borderRadius: "4px",
        padding: "0 0 0 15px ",
        border: `none`,
        fontSize: "16px",
        transition: "none",
        height: "100%",
        textAlign: "left",
      }),
      valueContainer: (styles) => ({
        ...styles,
        padding: "0",
      }),
      option: (styles, { isFocused }) => {
        return {
          ...styles,
          backgroundColor: isFocused ? COLOR.PRIMARY : COLOR.WHITE,
          color: isFocused ? COLOR.WHITE : COLOR.BLACK,
          ":active": {
            ...styles[":active"],
            backgroundColor: COLOR.PRIMARY,
          },
          ":hover": {
            ...styles[":hover"],
            color: COLOR.WHITE,
          },
          display: "inline-block",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        };
      },
      menuPortal: (base) => ({
        ...base,
        zIndex: 9999,
        border: "10px",
      }),
      menu: (styles) => ({
        ...styles,
        width: "100%",
        position: "absolute",
      }),
      singleValue: (styles) => ({
        ...styles,
        color: COLOR.BLACK,
      }),
    };
  }, []);

  const cols = useMemo(
    () => [
      { label: t("name_product"), align: "center", width: "20%" },
      { label: t("brand"), align: "center", width: "20%" },
      { label: t("price"), align: "center", width: "20%", sort: true },
    ],
    [t]
  );

  const rows = useMemo(() => {
    return product?.map((productItem) => {
      return {
        id: productItem._id,
        columns: [
          { label: productItem.name, align: "center", width: "20%" },
          { label: productItem.brand, align: "center", width: "20%" },
          {
            label: currencyFormatting(productItem.price),
            align: "center",
            width: "20%",
          },
        ],
      };
    });
  }, [product]);

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
    (type) => {
      let list = [...product];
      
      if (list && list.length > 0) {
        list?.sort((a, b) => {
          return (a?.price - b?.price) * type;
        });
      }

      dispatch(setProduct(list));
    },
    [dispatch, product]
  );
console.log("asdfasdf",product);
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
        dispatch(searchProduct(e.target.value));
      }
    },
    [dispatch]
  );

  const initialValues = useMemo(() => {
    if (idProduct) {
      const init = { ...productById?.size };
      init.image = productById?.product_image;
      init.name = productById?.name;
      init.description = productById?.description;
      init.price = currencyFormatting(productById?.price);
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

  const handleChangePageNumber = useCallback((value) => {
    setPageNumber(value);
    setPage(1);
  }, []);

  useEffect(() => {
    dispatch(getProduct({ page: page, pageSize: pageNumber, ...param }));
  }, [dispatch, page, pageNumber, param]);

  useEffect(() => {
    dispatch(getAllBrand());
  }, [dispatch]);

  useEffect(() => {
    if (brand) {
      const brandMap = brand.map((item) => {
        return { value: item.name, label: item.name };
      });
      setOptionsBrand(brandMap);
    }
  }, [brand, dispatch, optionsBrand.length]);

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
              <div className="manager-action d-flex">
                <div className="input-search-product">
                  <input
                    type="text"
                    placeholder={t("search")}
                    onKeyDown={handleOnkeyDown}
                  ></input>
                  <Icons.Search color={COLOR.GRAY_2} />
                </div>
                <div className="brand-filter">
                  <ReactSelect
                    onChange={(e) => setParam({ brand: [e.value] })}
                    type="select"
                    options={optionsBrand}
                    styles={colorDefaultStyles}
                    isSearchable={false}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    menuPortalTarget={document.body}
                    placement="auto"
                    placeholder={t("filter_brand")}
                  />
                </div>
                <div className="btn-view-all">
                  <Button className="green" onClick={() => setParam(null)}>
                    {t("view_all")}
                  </Button>
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

              <div className="d-flex justify-content-end">
                <Pagination
                  page={page}
                  count={count || product?.length}
                  pageNumber={pageNumber}
                  handlePageClick={(e) => setPage(e.selected + 1)}
                  handleChangePageNumber={(value) =>
                    handleChangePageNumber(value)
                  }
                />
              </div>
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
      colorDefaultStyles,
      cols,
      count,
      handleChangePageNumber,
      handleClick,
      handleCloseMessage,
      handleCloseModal,
      handleCloseModalAdd,
      handleConfirmModalAdd,
      handleOnkeyDown,
      handleRemove,
      handleSave,
      handleShowModalAdd,
      handleSort,
      idProduct,
      initialValues,
      modalBody,
      modalTitle,
      modalTitleAdd,
      optionsBrand,
      page,
      pageNumber,
      product,
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
