import { t } from "i18next";
import { Link, useLocation } from "react-router-dom";
import PATH from "../../../../contanst/path";
import "./ProductItem.scss";

function ProductItem({product}) {
  const { pathname } = useLocation();
  return (
    <div
      className={
        pathname === PATH.HOME
          ? "col-md-12 col-lg-3 mb-5 mb-lg-0"
          : "col-12 col-md-4 col-lg-3 mb-5"
      }
    >
      <div className="product-item" >
        <img src={product.product_image[0]} alt="product" className="img-fluid product-thumbnail" />
        <h3 className="product-title">{product.name}</h3>
        <strong className="product-price">{product.price} &#8363;</strong>
        <Link className="icon-cross" to={PATH.PRODUCT.DETAIL_PRODUCT.replace(":id", product._id)}>
          <p>{t("product_detail")}</p>
        </Link>
      </div>
    </div>
  );
}

export default ProductItem;
