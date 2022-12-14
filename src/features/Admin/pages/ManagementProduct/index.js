import { useTranslation } from "react-i18next";
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import Button from "../../../../components/Button";
import TableCommon from "../../../../components/TableCommon";
import "./ManagementProduct.scss";
import Icons from "../../../../components/Icons";
import ModalCommon from "../../../../components/ModalCommon";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../contanst/path";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProduct,
  getProduct,
  searchProduct,
} from "../../../User/pages/Products/ProductSlice";

function ManagementProduct() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.products?.product);
  const count = useSelector((state) => state.product.products?.count);
  const test = useSelector((state) => state.product.products)
  const [pageNumber, setPageNumber] = useState(10);
  const [listProduct, setListProduct] = useState(product);
  const [idProduct, setIdProduct] = useState();
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const ref = useRef();
  
console.log(test);

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

  const handleViewAdd = useCallback(() => {
    const number = (pageNumber / 10 + 1) * 10;
    setPageNumber(number)
  }, [pageNumber]);

  useEffect(() => {
    dispatch(getProduct({ page: 1, pageSize: pageNumber }));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    setListProduct(product);
  }, [product]);

  return (
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
        {listProduct?.length > 9 && count > listProduct?.length && (
          <div className="button-load text-center">
            <Button onClick={handleViewAdd} className="primary">
              {t("add_view")}
            </Button>
          </div>
        )}
      </div>
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
  );
}

export default ManagementProduct;
