import { Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { Carousel, Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../../../../components/Button";
import Input from "../../../../../components/Input";
import { getProductById } from "../../Products/ProductSlice";
import Comment from "./Comment";
import "./ProductDetail.scss";
import { useRef } from "react";
import Icons from "../../../../../components/Icons";
import { addToCart, getAllCart } from "../../Cart/cartSlice";
import { useAuth } from "../../../../../until/hooks";
import PATH from "../../../../../contanst/path";
import { KEY_STORAGE } from "../../../../../contanst/global";
import ModalCommon from "../../../../../components/ModalCommon";

function ProductDetail() {
  const { userAuth } = useAuth();
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const products = useSelector((state) => state.product.productById?.product);
  const { t } = useTranslation();
  const [sizeArray, setSizeArray] = useState([]);
  const [quantityOfSize, setQuanlityOfSize] = useState(0);
  const [size, setSize] = useState(null);
  const formikRef = useRef();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleSelect = useCallback((selectedIndex) => {
    setIndex(selectedIndex);
  }, []);

  const handleSize = useCallback((item) => {
    setMessage(null);
    setQuanlityOfSize(item[1]);
    setSize(item[0]);
  }, []);

  const handleAddToCart = useCallback(
    async (values) => {
      const data = { ...values };
      data.product_id = id;
      data.size = Number(size);
      await dispatch(addToCart(data)).then((res) => {
        if (res.payload.status === 201 || res.payload.status === 200) {
          setModalTitle(t("action_success", { param: t("add_to_cart") }));
          setShow(!show);
          dispatch(getAllCart());
        } else {
          setModalTitle(t("action_fail", { param: t("add_to_cart") }));
          setModalBody(t("try_again"));
          setShow(!show);
        }
      });
    },
    [size, id, dispatch, show, t]
  );

  const checkAddToCart = useCallback(() => {
    if (!userAuth) {
      localStorage.setItem(KEY_STORAGE.OLD_PATH, pathname);
      navigate(PATH.LOGIN);
    } else {
      if (!size) {
        setMessage(t("MS_09", { param: t("size") }));
      } else {
        formikRef.current.submitForm();
      }
    }
  }, [size, t, navigate, userAuth, pathname]);

  const handleClose = useCallback(() => {
    setShow(!show);
  }, [show]);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (products?.size) {
      setSizeArray(Object.entries(products?.size));
    }
  }, [products]);

  return (
    <>
      <Formik
        initialValues={{ quantity: 1 }}
        enableReinitialize
        validationSchema={Yup.object({
          quantity: Yup.number()
            .min(1, t("MS_06", { param: t("quantity"), min: 1 }))
            .max(
              quantityOfSize,
              t("MS_07", { param: "quantity", max: quantityOfSize })
            ),
        })}
        onSubmit={handleAddToCart}
        innerRef={formikRef}
      >
        <>
          <div className="product-detail p-5 d-flex justify-content-around">
            <div className="img-slider">
              <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                interval="2000"
                slide
              >
                {products?.product_image.map((image, i) => (
                  <Carousel.Item key={i}>
                    <img
                      className="d-block w-100"
                      src={image}
                      alt="First slide"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <div className="content-detail ml-2 w-50 d-flex flex-column">
              {products?.discount > 0 && (
                <div className="discount">
                  {" "}
                  {t("discount_label", { param: products?.discount })}
                </div>
              )}
              <h2>{products?.name}</h2>

              <div className="d-flex align-items-center mt-3 mb-3">
                <div
                  style={{
                    minWidth: "max-content",
                    marginRight: "20px",
                    fontSize: "20px",
                  }}
                >
                  <b className="label">{t("price")}&#58;</b>
                </div>
                {products?.discount !== 0 ? (
                  <>
                    <div className="price-initial">
                      {products?.price} &#8363;
                    </div>
                    <div
                      className="price-discount"
                      style={{ color: "red", fontSize: "20px" }}
                    >
                      {products?.price * (1 - products?.discount / 100)} &#8363;
                    </div>
                  </>
                ) : (
                  <b style={{ color: "red", fontSize: "20px" }}>
                    {products?.price} &#8363;
                  </b>
                )}
              </div>
              <div className="d-flex align-items-center mt-3 mb-3">
                <div style={{ minWidth: "max-content", marginRight: "20px" }}>
                  <b className="label">{t("description")}&#58;</b>
                </div>
                <div>{products?.description}</div>
              </div>

              <div className="d-flex align-items-center w-100">
                <div style={{ minWidth: "max-content", marginRight: "10px" }}>
                  <b className="label">{t("size")}&#58;</b>
                </div>
                <div className="d-flex flex-wrap option-size">
                  {sizeArray?.map((item, index) => {
                    return (
                      <input
                        label={item[0]}
                        type="radio"
                        name="size"
                        key={index}
                        onClick={() => handleSize(item)}
                        disabled={item[1] === 0 ? true : false}
                      />
                    );
                  })}
                  {message && (
                    <div className="d-flex align-items-center warning-size">
                      <Icons.Exclamation />{" "}
                      <span className="tooltiptext">{message}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="d-flex align-items-center w-50 mr-5">
                <div style={{ minWidth: "max-content", marginRight: "20px" }}>
                  <b className="label">{t("quantity")}&#58;</b>
                </div>
                <Input
                  name="quantity"
                  type="number"
                  quantity={true}
                  max={quantityOfSize}
                />
              </div>
              <div className="action">
                <Button className="primary add-cart" onClick={checkAddToCart}>
                  {t("add_to_cart")}
                </Button>
                <Button className="primary buy-now">{t("buy_now")}</Button>
              </div>
            </div>
          </div>
          <div className="comment-description">
            <div className="container">
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3 "
              >
                <Tab eventKey="depscription" title="Description"></Tab>
                <Tab eventKey="reviews" title="Reviews">
                  <Comment />
                </Tab>
              </Tabs>
            </div>
          </div>
          <ModalCommon
            show={show}
            modalTitle={modalTitle}
            modalBody={modalBody}
            handleConfirm={handleClose}
            isButton
          />
        </>
      </Formik>
    </>
  );
}

export default ProductDetail;
