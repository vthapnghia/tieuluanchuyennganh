import { t } from "i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductItem from "../../Components/ProductItem";
import { getProduct } from "../Products/ProductSlice";
import Button from "../../../../components/Button";
import "./Home.scss";
import PATH from "../../../../contanst/path";
import { whyChooseUs } from "../../../../assets/img";
import Icons from "../../../../components/Icons";
import { getAllNews } from "../News/NewsSlice";
import NewsItem from "../../Components/NewsItem";

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
    dispatch(getProduct({ page: 1, pageSize: 4 }));
    dispatch(getAllNews());
  }, [dispatch]);

  return (
    <div className="home-page">
      <div className="product-section">
        <div className="container">
          <div className="title-section">
            <span>{t("product").toLocaleUpperCase()}</span>
          </div>
          <div className="row">
            {products?.map((itemProduct, index) => {
              return <ProductItem key={index} product={itemProduct} />;
            })}
          </div>
          <div className="view-add-product">
            <Button
              className="primary"
              onClick={() => navigate(PATH.PRODUCT.LIST_PRODUCT)}
            >
              {t("add_view")}
            </Button>
          </div>
        </div>
      </div>
      <div className="choose-us-session">
        <div className="container">
          <div className="title-section">
            <span>{t("why-choose-us").toLocaleUpperCase()}</span>
          </div>
          <div className="row justify-content-between">
            <div className="col-lg-6">
              <p>
                Bên cạnh việc phải thông thạo những kiến thức lập trình về ngôn
                ngữ, framework, thư viện thì lập trình viên Front-end cũng cần
                có...
              </p>

              <div className="row my-5">
                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon">
                      <Icons.Truck className="imf-fluid" />
                    </div>
                    <h3>Nhanh &amp; miễn phí vận chuyển</h3>
                    <p>
                      Bên cạnh việc phải thông thạo những kiến thức lập trình về
                      ngôn ngữ, framework, thư viện thì lập trình viên Front-end
                      cũng cần có...
                    </p>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon">
                      <Icons.Bag />
                    </div>
                    <h3>Dễ dàng mua sắm</h3>
                    <p>
                      Bên cạnh việc phải thông thạo những kiến thức lập trình về
                      ngôn ngữ, framework, thư viện thì lập trình viên Front-end
                      cũng cần có...
                    </p>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon">
                      <Icons.Support />
                    </div>
                    <h3>Hổ trợ 24/7 </h3>
                    <p>
                      Bên cạnh việc phải thông thạo những kiến thức lập trình về
                      ngôn ngữ, framework, thư viện thì lập trình viên Front-end
                      cũng cần có...
                    </p>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon">
                      <Icons.Return />
                    </div>
                    <h3>Chính sách hoàn tiền</h3>
                    <p>
                      Bên cạnh việc phải thông thạo những kiến thức lập trình về
                      ngôn ngữ, framework, thư viện thì lập trình viên Front-end
                      cũng cần có...
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="img-wrap">
                <img src={whyChooseUs} alt="wrap" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blog-section">
        <div className="container">
          <div className="title-section">
            <span>{t("news").toLocaleUpperCase()}</span>
          </div>
          <div className="row">
            {listNews?.map((newsItem, index) => {
              return <NewsItem key={index} newsItem={newsItem} />;
            })}
          </div>
          <div className="view-add-news">
            <Button
              className="primary"
              onClick={() => navigate(PATH.NEWS.LIST_NEWS)}
            >
              {t("add_view")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
