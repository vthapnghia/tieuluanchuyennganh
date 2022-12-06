import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Carousel, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../../../../../components/Button";
import Input from "../../../../../components/Input";
import { getProductById } from "../../Products/ProductSlice";
import Comment from "./Comment";
import "./ProductDetail.scss";

const options = [
  { value: 1, label: "option 1" },
  { value: 2, label: "option 2" },
  { value: 3, label: "option 3" },
];

function ProductDetail() {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { products } = useSelector((state) => state.product.productById);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    id && dispatch(getProductById(id));
  }, [id, dispatch]);

  return (
    <>
      <Formik
        initialValues={{ size: 2, color: 1, quanlity: 1 }}
        enableReinitialize
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
              <h2>Title</h2>

              <div class="price">
                <span>7.93 </span>
              </div>
              <p>
                Welcome to the tutorial! We'll be building a small, but
                feature-rich app that lets you keep track of your contacts. We
                expect it to take between 30-60m if you're following along.
              </p>
              <div className="d-flex align-items-center w-50">
                <div style={{ minWidth: "max-content", marginRight: "10px" }}>
                  <b>Số lượng:</b>{" "}
                </div>
                <Input name="size" type="select" options={options} />
              </div>
              <div className="d-flex align-items-center w-50">
                <div style={{ minWidth: "max-content", marginRight: "10px" }}>
                  <b>Số lượng: </b>{" "}
                </div>
                <Input name="color" type="select" options={options} />
              </div>

              <div className="d-flex align-items-center w-50 mr-5">
                <div style={{ minWidth: "max-content", marginRight: "10px" }}>
                  <b>Số lượng:</b>{" "}
                </div>
                <Input name="quanlity" type="number" quanlity={true} />
              </div>
              <div className="action">
                <Button className="primary add-cart">Thêm vào giỏ hàng</Button>
                <Button className="primary buy-now">Thêm vào giỏ hàng</Button>
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
        </>
      </Formik>
    </>
  );
}

export default ProductDetail;
