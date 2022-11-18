import { Formik } from "formik";
import { useState } from "react";
import { Carousel, Tab, Tabs } from "react-bootstrap";
import Icons from "./../../../../components/Icons";
import Input from "./../../../../components/Input";
import Comment from "./Comment";
import "./ProductDetail.scss";

function ProductDetail() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <Formik initialValues={{ size: "31", color: "", quanlity: 1 }}>
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
              
              <p>500.000$</p>
              <p>Welcome to the tutorial! We'll be building a small, but feature-rich app that lets you keep track of your contacts. We expect it to take between 30-60m if you're following along.</p>
              <div className="options d-flex">
                <Input
                  name="size"
                  label="size"
                  style={{ width: "50%", height: "40px" }}
                />
                <Input
                  name="color"
                  label="color"
                  style={{ width: "50%", height: "40px" }}
                />
              </div>
              <div className="quality d-flex flex-row align-items-center">
                <div className="d-flex align-items-center">
                  <div style={{ minWidth: "max-content" }}>Số lượng: </div>
                  <Input
                    name="quanlity"
                    type="number"
                    style={{ width: "40px", height: "40px" }}
                    binary
                    icon
                  />
                </div>
              </div>
              <div className="action">
                <button className="btn btn-primary add-cart">Thêm vào giỏ hàng</button>
                <button className="btn btn-primary buy-now">Thêm vào giỏ hàng</button>
              </div>
            </div>
          </div>
          <div className="container comment-description">
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="depscription" title="Description"></Tab>
              <Tab eventKey="reviews" title="Reviews"><Comment/></Tab>
            </Tabs>
          </div>
        </>
      </Formik>
    </>
  );
}

export default ProductDetail;
