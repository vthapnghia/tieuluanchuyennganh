import { t } from "i18next";
import { Link, useLocation } from "react-router-dom";
import PATH from "../../../../contanst/path";
import "./ProductItem.scss";

const url = "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"

function ProductItem() {
  const { pathname } = useLocation();
  return (
    <div
      className={
        pathname === "/home"
          ? "col-md-12 col-lg-3 mb-5 mb-lg-0"
          : "col-12 col-md-4 col-lg-3 mb-5"
      }
    >
      <div className="product-item" >
        <img src={url} alt="product" className="img-fluid product-thumbnail" />
        <h3 className="product-title">Nordic Chair</h3>
        <strong className="product-price">$50.00</strong>
        <Link className="icon-cross" to={PATH.PRODUCT.DETAIL_PRODUCT.replace(":id", 1)}>
          <p>{t("product_detail")}</p>
        </Link>
      </div>
    </div>
  );
}

export default ProductItem;
