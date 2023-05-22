import { t } from "i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductItem from "../../pages/Products/ProductItem";
import { getProduct, removeStateProduct } from "../Products/ProductSlice";
import Button from "../../../../components/Button";
import "./Home.scss";
import PATH from "../../../../constants/path";
import { shoe_bg } from "../../../../assets/img";
import Icons from "../../../../components/Icons";
import { getAllNews, removeStateNews } from "../News/NewsSlice";
import NewsItem from "../News/NewsItem";

function Home() {
  const products = useSelector((state) => state.product.products?.product);
  const allNews = useSelector((state) => state.news.allNews?.news);
  const [listNews, setListNews] = useState(allNews);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (allNews) {
      let listNewsTemp = [];
      allNews.forEach((itemNews, index) => {
        if (index === 3 && allNews.length > 3) {
          return;
        }
        listNewsTemp.push(itemNews);
      });
      setListNews(listNewsTemp);
    }
  }, [allNews]);

  useEffect(() => {
    dispatch(getProduct({ page: 1, pageSize: 12 }));
    dispatch(getAllNews());

    return () => {
      dispatch(removeStateProduct());
      dispatch(removeStateNews());
    };
  }, [dispatch]);

  return (
    <div className="home-page">
      <div className="product-section">
        <div className="title-section">
          <span>{t("product").toLocaleUpperCase()}</span>
        </div>
        <div className="row">
          {products?.map((itemProduct, index) => {
            return <ProductItem key={itemProduct._id} product={itemProduct} />;
          })}
        </div>
        <div className="view-add-product">
          <Button
            className="red"
            onClick={() => navigate(PATH.PRODUCT.LIST_PRODUCT)}
          >
            {t("add_view")}
          </Button>
        </div>
      </div>
      <div className="product-discount-section">
        <div className="title-section">
          <span>{t("product-discount").toLocaleUpperCase()}</span>
        </div>
        <div className="row">
          {products?.map((itemProduct, index) => {
            if (itemProduct.discount !== 0) {
              return <ProductItem key={index} product={itemProduct} />;
            }
            return null;
          })}
        </div>
        <div className="view-add-product-discount">
          <Button
            className="red"
            onClick={() => navigate(PATH.PRODUCT.LIST_PRODUCT)}
          >
            {t("add_view")}
          </Button>
        </div>
      </div>
      <div className="choose-us-session">
        <div className="title-section">
          <span>{t("why-choose-us").toLocaleUpperCase()}</span>
        </div>
        <div className="row justify-content-between">
          <div className="col-lg-6">
            <p>
              Niềm vui của bạn cũng là niềm vui của chúng tôi nếu bạn mua
              hàng...
            </p>

            <div className="row my-5">
              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <Icons.Truck className="imf-fluid" />
                  </div>
                  <h3>Nhanh &amp; miễn phí vận chuyển</h3>
                  <p>Tất cả sản phẩm đều được vận chuyển miễn phí</p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <Icons.Bag />
                  </div>
                  <h3>Dễ dàng mua sắm</h3>
                  <p>
                    Thanh toán đơn hàng bằng hình thức trực tiếp hoặc chuyển
                    khoảng
                  </p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <Icons.Support />
                  </div>
                  <h3>Hổ trợ trực tuyến</h3>
                  <p>
                    Mọi thắc mắc về sản phẩm hãy nhắn tin cho chúng tôi tại{" "}
                    <a href="" className="text-decoration-none">
                      đây
                    </a>
                  </p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <Icons.Return />
                  </div>
                  <h3>Chính sách hoàn tiền</h3>
                  <p>Sản phẩm được phép đổi trả trong vòng 7 ngày</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2"></div>
          <div className="col-lg-4">
            <div className="img-wrap">
              <img src={shoe_bg} alt="wrap" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
      <div className="blog-section">
        <div className="title-section">
          <span>{t("news").toLocaleUpperCase()}</span>
        </div>
        <div className="row">
          {listNews?.map((newsItem, index) => {
            return <NewsItem key={newsItem._id} newsItem={newsItem} />;
          })}
        </div>
        <div className="view-add-news">
          <Button className="red" onClick={() => navigate(PATH.NEWS.LIST_NEWS)}>
            {t("add_view")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
