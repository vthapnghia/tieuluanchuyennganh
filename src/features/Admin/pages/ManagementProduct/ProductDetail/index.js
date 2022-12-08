import { Formik } from "formik";
import { t } from "i18next";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import Button from "../../../../../components/Button";
import Input from "../../../../../components/Input";
import ModalCommon from "../../../../../components/ModalCommon";
import { OPTION_GENDER, OPTION_SIZE } from "../../../../../contanst/global";
import {
  addProduct,
  getProductById,
  uploadProduct,
} from "../../../../User/pages/Products/ProductSlice";
import { getAllBrand } from "../../ManagementBrand/BrandSlice";

import "./ProductDetail.scss";

function ProductDetailAdmin() {
  const formikRef = useRef();
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.productById?.product);
  const brand = useSelector((state) => state.brand.allBrand?.brands);
  const [showModal, setShowModal] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const brandOption = useMemo(() => {
    return brand?.map((brandItem) => {
      return { value: brandItem.name, label: brandItem.name };
    });
  }, [brand]);

  const handleSave = useCallback(
    async (values) => {
      const { image, name, brand, gender, description,price, ...rest } = values;
      const formData = new FormData();
      const files = Object.values(image);
      files.forEach((elmennt) => {
        formData.append("image", elmennt);
      });
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("gender", gender);
      formData.append("description", description);
      formData.append("size", JSON.stringify(rest));
      if (!id) {
        await dispatch(addProduct(formData)).then((res) => {
          console.log(res);
          if (res.payload?.status === 201) {
            setModalTitle(t("action_success", { param: t("add_product") }));
            setShowModal(!showModal);
          } else {
            setModalTitle(t("action_fail", { param: t("add_product") }));
            setModalBody(t("try_again"));
            setShowModal(!showModal);
          }
        });
      } else {
        await dispatch(uploadProduct({ formData: formData, id: id })).then(
          (res) => {
            if (res.payload?.status === 200) {
              setModalTitle(t("action_success", { param: t("update_product") }));
              setShowModal(!showModal);
            } else {
              setModalTitle(t("action_fail", { param: t("update_product") }));
              setModalBody(t("try_again"));
              setShowModal(!showModal);
            }
          }
        );
      }
    },
    [dispatch, id, showModal]
  );

  const handleClose = useCallback(() => {
    setShowModal(!showModal);
    if (id) {
      dispatch(getProductById(id));
    }
  }, [showModal, id, dispatch]);

  const initialValues = useMemo(() => {
    if (id) {
    return {
      image: product?.product_image,
      name: product?.name,
      description: product?.description,
      price: product?.price,
      brand: product?.brand,
      gender: product?.gender,
    }
    } else {
      const size = OPTION_SIZE.map((sizeItem) => {
        return [`size_${sizeItem.label}`, ""];
      });
      const initObject = Object.fromEntries(size);
      initObject.image = "";
      initObject.name = "";
      initObject.description = "";
      initObject.price = "";
      initObject.brand = "";
      initObject.gender = "";
      return initObject;
    }
  }, [id, product]);

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
    };
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getAllBrand());
  }, [dispatch])
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSave}
      innerRef={formikRef}
      validationSchema={Yup.object(validationSchema)}
    >
      <>
        <div className="product-detail-admin">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col col-md-8 col-sm-12 ">
                <div className="multiple-img">
                  <div id="images">
                    <div className="display-img">
                      {id &&
                        product?.product_image.map((img, index) => {
                          return (
                            <figure key={index}>
                              <img src={img} alt="img" />
                            </figure>
                          );
                        })}
                    </div>
                  </div>
                  <Input
                    name="image"
                    type="file"
                    className="img-upload"
                    textLabel={t("upload_img")}
                    multiple
                  />
                </div>
                <div className="input">
                  <Input
                    name="name"
                    placeholder={t("name_product")}
                    type="text"
                  />
                </div>
                <div className="input">
                  <Input
                    name="price"
                    placeholder={t("price")}
                    type="number"
                    style={{ textAlign: "left" }}
                  />
                </div>
                <div className="input">
                  <Input
                    name="brand"
                    placeholder={t("brand")}
                    type="select"
                    options={brandOption}
                    align="left"
                  />
                </div>
                <div className="input">
                  <Input
                    name="description"
                    placeholder={t("description")}
                    type="textarea"
                  />
                </div>
                <div className="input">
                  <Input
                    name="gender"
                    placeholder={t("gender")}
                    type="select"
                    options={OPTION_GENDER}
                    align="left"
                  />
                </div>
                <div className="row input">
                  {OPTION_SIZE.map((sizeItem, index) => {
                    return (
                      <div
                        className="d-flex flex-column col col-md-3 col-sm-2 mt-2"
                        key={index}
                      >
                        <label>
                          {t("size")} {sizeItem.value}
                        </label>
                        <Input
                          name={`size_${sizeItem.value}`}
                          placeholder={t("quanlity")}
                          type="number"
                          style={{ padding: "16px 30px" }}
                          marginNone
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="btn-upload">
                  <Button
                    className="primary float-end"
                    onClick={() => formikRef.current.submitForm()}
                  >
                    {t("save")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalCommon
          show={showModal}
          modalTitle={modalTitle}
          modalBody={modalBody}
          handleClose={handleClose}
          isButton
        />
      </>
    </Formik>
  );
}

export default ProductDetailAdmin;
