import { Formik } from "formik";
import { useState } from "react";
import { Carousel, Tab, Tabs } from "react-bootstrap";
import Button from "../../../../components/Button";
import Input from "./../../../../components/Input";
import Comment from "./Comment";
import "./ProductDetail.scss";

const options = [
  { value: 1, label: "option 1" },
  { value: 2, label: "option 2" },
  { value: 3, label: "option 3" },
];

function ProductDetail() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
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
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://i1-dulich.vnecdn.net/2022/05/27/du-lich-Viet-Nam-3-1653637304.jpg?w=1200&h=0&q=100&dpr=2&fit=crop&s=tKgsN3j--Yx684u-cGFF-A"
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://i1-dulich.vnecdn.net/2022/05/27/du-lich-Viet-Nam-3-1653637304.jpg?w=1200&h=0&q=100&dpr=2&fit=crop&s=tKgsN3j--Yx684u-cGFF-A"
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://i1-dulich.vnecdn.net/2022/05/27/du-lich-Viet-Nam-3-1653637304.jpg?w=1200&h=0&q=100&dpr=2&fit=crop&s=tKgsN3j--Yx684u-cGFF-A"
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
            <div className="content-detail ml-2 w-50">
              <h2>Title</h2>

              <p>
                <b>Giá: </b>500.000$
              </p>
              <p>
                Welcome to the tutorial! We'll be building a small, but
                feature-rich app that lets you keep track of your contacts. We
                expect it to take between 30-60m if you're following along.
              </p>
              <div className="d-flex align-items-center w-50">
                <div style={{ minWidth: "max-content", marginRight: "10px" }}>
                  <b>Số lượng</b>{" "}
                </div>
                <Input
                  name="size"
                  type="select"
                  options={options}
                />
              </div>
              <div className="d-flex align-items-center w-50">
                <div style={{ minWidth: "max-content", marginRight: "10px" }}>
                  <b>Số lượng</b>{" "}
                </div>
                <Input
                  name="color"
                  type="select"
                  options={options}
                />
              </div>

              <div className="d-flex align-items-center w-50 mr-5">
                <div style={{ minWidth: "max-content", marginRight: "10px" }}>
                  <b>Số lượng</b>{" "}
                </div>
                <Input
                  name="quanlity"
                  type="number"
                  quanlity={true}
                />
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
