import { t } from "i18next";
import { Link } from "react-router-dom";
import PATH from "../../../../../contanst/path";
import "./ProductItem.scss";

function ProductItem({ product }) {
  return (
    <div className="col-12 col-md-4 col-lg-3 mb-5">
      <div className="product-item">
        {product.discount > 0 && (
          <div className="discount">
            {t("discount_label", { param: product.discount })}
          </div>
        )}
        <img
          src={product.product_image[0]}
          alt="product"
          className="img-fluid product-thumbnail"
        />
        <h3 className="product-title">{product.name}</h3>
        {product.discount > 0 ? (
          <div className="d-flex flex-column align-items-center">
            <div className="product-price-initial">{product.price} &#8363;</div>
            <div className="product-price-discount">
              {(product.price * (1 - product.discount / 100)).toFixed(2)} &#8363;
            </div>
          </div>
        ) : (
          <strong className="product-price">{product.price} &#8363;</strong>
        )}

        <Link
          className="icon-cross"
          to={PATH.PRODUCT.DETAIL_PRODUCT.replace(":id", product._id)}
        >
          <p>{t("product_detail")}</p>
        </Link>
      </div>
    </div>
  );
}

export default ProductItem;
