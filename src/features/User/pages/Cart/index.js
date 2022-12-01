import { useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./Cart.scss";
import Input from "../../../../components/Input";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../contanst/path";
import Button from "../../../../components/Button";
import { product } from "../../../../assets/img";
import TableCommon from "../../../../components/TableCommon";

function Cart() {
  const formikRef = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const cols = [
    { label: t("image"), align: "center", width: "20%" },
    { label: t("product"), align: "center", width: "20%" },
    { label: t("price"), align: "center", width: "15%" },
    { label: t("quanlity"), align: "center", width: "20%" },
    { label: t("total"), align: "center", width: "15%" },
  ];

  const rows = [
    {
      id: 1,
      columns: [
        {
          label: (
            <img
              src={product}
              alt="product"
              width="100"
              height="100"
              style={{ objectFit: "cover" }}
            />
          ),
          align: "center",
          width: "20%",
        },
        { label: "Product 1", align: "center", width: "20%" },
        { label: "$49.00", align: "center", width: "15%" },
        {
          label: (
            <Input
              name="quanlity"
              type="number"
              quanlity={true}
            />
          ),
          align: "center",
          width: "20%",
        },
        { label: "$49.00", align: "center", width: "20%" },
      ],
    },
    {
      id: 2,
      columns: [
        {
          label: (
            <img
              src={product}
              alt="product"
              width="100"
              height="100"
              style={{ objectFit: "cover" }}
            />
          ),
          align: "center",
          width: "20%",
        },
        { label: "Product 1", align: "center", width: "20%" },
        { label: "$49.00", align: "center", width: "15%" },
        {
          label: (
            <Input
              name="quanlity"
              type="number"
              quanlity={true}
            />
          ),
          align: "center",
          width: "20%",
        },
        { label: "$49.00", align: "center", width: "20%" },
      ],
    },
  ];

  const handelOnSubmit = (values) => {
    console.log(values);
  };

  const handleRemove = (id) => () => {
    console.log("remove: ", id);
  };
  return (
    <>
      <Formik
        initialValues={{ product: "" }}
        enableReinitialize
        onSubmit={handelOnSubmit}
        validationSchema={Yup.object({
          text: Yup.string().required("Require"),
        })}
        innerRef={formikRef}
      >
        <>
          <div className="Cart">
            <div className="untree_co-section before-footer-section">
              <div className="container">
                <div className="row mb-5">
                  <TableCommon
                    cols={cols}
                    rows={rows}
                    oneButton={true}
                    labelHeader={t("remove")}
                    handleRemove={handleRemove}
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="row mb-5">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <Button className="primary">{t("update_cart")}</Button>
                      </div>
                      <div className="col-md-6">
                        <Button
                          className="primary"
                          onClick={() => navigate(PATH.PRODUCT.LIST_PRODUCT)}
                        >
                          {t("continue_shopping")}
                        </Button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label className="text-black h4" htmlFor="coupon">
                          {t("code_coupon")}
                        </label>
                        <p>{t("have_code_coupon")}</p>
                      </div>
                      <div className="col-md-8 mb-3 mb-md-0 d-flex">
                        <Input name="coupon" type="text" />
                      </div>
                      <div className="col-md-4 d-flex align-items-center">
                        <Button className="btn primary " onClick={() => {}}>
                          {t("apply")}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 pl-5">
                    <div className="row justify-content-end">
                      <div className="col-md-7">
                        <div className="row">
                          <div className="col-md-12 text-right border-bottom mb-5">
                            <h3 className="text-black h4 text-uppercase">
                              {t("cart_totals")}
                            </h3>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <span className="text-black">Subtotal</span>
                          </div>
                          <div className="col-md-6 text-right">
                            <strong className="text-black">$230.00</strong>
                          </div>
                        </div>
                        <div className="row mb-5">
                          <div className="col-md-6">
                            <span className="text-black">{t("total")}</span>
                          </div>
                          <div className="col-md-6 text-right">
                            <strong className="text-black">$230.00</strong>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12">
                            <Button
                              className="btn primary"
                              onClick={() => {}}
                            >
                              {t("pay")}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </Formik>
    </>
  );
}
export default Cart;
