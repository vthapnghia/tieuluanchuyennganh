import { t } from "i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import ProductItem from "../../pages/Products/ProductItem";
import { getProduct, removeStateProduct } from "../Products/ProductSlice";
import Button from "../../../../components/Button";
import "./Home.scss";
import PATH from "../../../../constants/path";
import { card_image_1, card_image_2, card_image_3, card_image_4, card_image_5, card_image_6, slide_1 } from "../../../../assets/img";
import Icons from "../../../../components/Icons";
import { getAllNews, removeStateNews } from "../News/NewsSlice";
import NewsItem from "../News/NewsItem";
import { Container, Grid } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { getAllFavorites } from "../Products/ProductItem/FavoriteSlice";

function Home() {
  const products = useSelector((state) => state.product.products?.product);
  const favorites = useSelector((state) => state.favorite.favorites);
  const allNews = useSelector((state) => state.news.allNews?.news);
  const [listNews, setListNews] = useState(allNews);
  const [dotActive, setDocActive] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLike = (id) => {
    const check = favorites?.find((item) => {
      return item._id === id;
    });
    if (check) {
      return true;
    }
    return false;
  };

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
    dispatch(getAllFavorites());

    return () => {
      dispatch(removeStateProduct());
      dispatch(removeStateNews());
    };
  }, [dispatch]);

  return (
    <div id="home-page">
      <Container maxWidth="lg">
        <div>
          <div className="slider">
            <Grid
              container
              columnSpacing={2}
              className={`slider-item slider-item-1 ${
                dotActive ? "active-1" : "slider-1"
              }`}
            >
              <Grid item xs={6}>
                <div className="advertisement">
                  <div className="advertisement-title">
                    <span className="title-span">Stylish shoes for women</span>
                    <Link className="title-link" to={PATH.PRODUCT.LIST_PRODUCT}>
                      Mua ngay <ArrowRightAltIcon className="icon-row" />
                    </Link>
                  </div>
                  <img
                    className="advertisement-img"
                    src={card_image_1}
                    style={{ width: "100%", height: "100%" }}
                    alt="anh"
                  />
                </div>
              </Grid>
              <Grid item xs={6} container rowSpacing={1.5}>
                <Grid item xs={12}>
                  <div className="advertisement">
                    <div className="advertisement-title">
                      <span className="title-span">Sports Wear</span>
                      <Link
                        className="title-link"
                        to={PATH.PRODUCT.LIST_PRODUCT}
                      >
                        Mua ngay <ArrowRightAltIcon className="icon-row" />
                      </Link>
                    </div>
                    <img
                      className="advertisement-img"
                      src={card_image_2}
                      style={{ height: "100%", width: "100%" }}
                      alt="anh"
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="advertisement">
                    <div className="advertisement-title">
                      <span className="title-span">Fashion Shoes</span>
                      <Link
                        className="title-link"
                        to={PATH.PRODUCT.LIST_PRODUCT}
                      >
                        Mua ngay <ArrowRightAltIcon className="icon-row" />
                      </Link>
                    </div>
                    <img
                      className="advertisement-img"
                      src={card_image_3}
                      style={{ height: "100%", width: "100%" }}
                      alt="anh"
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              columnSpacing={2}
              className={`slider-item slider-item-2 ${
                !dotActive ? "active-2" : "slider-2"
              }`}
            >
              <Grid item xs={6} container rowSpacing={1.5}>
                <Grid item xs={12}>
                  <div className="advertisement">
                    <div className="advertisement-title">
                      <span className="title-span">Sports Wear</span>
                      <Link
                        className="title-link"
                        to={PATH.PRODUCT.LIST_PRODUCT}
                      >
                        Mua ngay <ArrowRightAltIcon className="icon-row" />
                      </Link>
                    </div>
                    <img
                      className="advertisement-img"
                      src={card_image_4}
                      style={{ height: "100%", width: "100%" }}
                      alt="anh"
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="advertisement">
                    <div className="advertisement-title">
                      <span className="title-span">Fashion Shoes</span>
                      <Link
                        className="title-link"
                        to={PATH.PRODUCT.LIST_PRODUCT}
                      >
                        Mua ngay <ArrowRightAltIcon className="icon-row" />
                      </Link>
                    </div>
                    <img
                      className="advertisement-img"
                      src={card_image_5}
                      style={{ height: "100%", width: "100%" }}
                      alt="anh"
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <div className="advertisement">
                  <div className="advertisement-title">
                    <span className="title-span">Stylish shoes for women</span>
                    <Link className="title-link" to={PATH.PRODUCT.LIST_PRODUCT}>
                      Mua ngay <ArrowRightAltIcon className="icon-row" />
                    </Link>
                  </div>
                  <img
                    className="advertisement-img"
                    src={card_image_6}
                    style={{ width: "100%", height: "100%" }}
                    alt="anh"
                  />
                </div>
              </Grid>
            </Grid>
          </div>

          <div className="dot-action">
            <div
              className={`dot-item ${dotActive ? "dot-active" : ""}`}
              onClick={() => {
                setDocActive(!dotActive);
              }}
            ></div>
            <div
              className={`dot-item ${!dotActive ? "dot-active" : ""}`}
              onClick={() => {
                setDocActive(!dotActive);
              }}
            ></div>
          </div>
        </div>

        <div className="product-section">
          <div className="title-section">
            <span>{t("product").toLocaleUpperCase()}</span>
          </div>
          <Grid container spacing={2}>
            {products?.map((itemProduct) => {
              return (
                <Grid item xs={3} key={itemProduct._id}>
                  <ProductItem
                    product={itemProduct}
                    isLike={isLike(itemProduct._id)}
                  />
                </Grid>
              );
            })}
          </Grid>
          <div className="view-add-product">
            <Button
              className="red"
              onClick={() => navigate(PATH.PRODUCT.LIST_PRODUCT)}
            >
              {t("add_view")}
            </Button>
          </div>
        </div>
        <img
          src={slide_1}
          alt="anh"
          width={"100%"}
          height={"auto"}
          style={{ margin: "40px 0 0" }}
        />
        <div className="product-discount-section">
          <div className="title-section">
            <span>{t("product-discount").toLocaleUpperCase()}</span>
          </div>
          <Grid item xs={12} container rowSpacing={2} columnSpacing={2}>
            {products?.map((itemProduct) => {
              if (itemProduct.discount !== 0) {
                return (
                  <Grid item xs={3} key={itemProduct._id}>
                    <ProductItem
                      product={itemProduct}
                      isLike={isLike(itemProduct._id)}
                    />
                  </Grid>
                );
              }
              return null;
            })}
          </Grid>
          <div className="view-add-product">
            <Button
              className="red"
              onClick={() => navigate(PATH.PRODUCT.LIST_PRODUCT)}
            >
              {t("add_view")}
            </Button>
          </div>
        </div>
        <Grid container columnSpacing={1} className="choose-us-session">
          <Grid item xs={3}>
            <div className="feature">
              <div className="icon">
                <Icons.Truck />
              </div>
              <div className="title">Vận chuyển</div>
              <p>Tất cả sản phẩm đều được vận chuyển nhanh nhất tới tay bạn</p>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="feature">
              <div className="icon">
                <Icons.Bag />
              </div>
              <div className="title">Dễ dàng mua sắm</div>
              <p>
                Thanh toán đơn hàng bằng hình thức trực tiếp hoặc chuyển khoảng
              </p>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="feature">
              <div className="icon">
                <Icons.Support />
              </div>
              <div className="title">Hổ trợ trực tuyến</div>
              <p>
                Mọi thắc mắc về sản phẩm hãy nhắn tin cho chúng tôi để được hộ
                trợ
              </p>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="feature">
              <div className="icon">
                <Icons.Return />
              </div>
              <div className="title">Chính sách hoàn tiền</div>
              <p>Sản phẩm được phép đổi trả trong vòng 7 ngày</p>
            </div>
          </Grid>
        </Grid>
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
            <Button
              className="red"
              onClick={() => navigate(PATH.NEWS.LIST_NEWS)}
            >
              {t("add_view")}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
