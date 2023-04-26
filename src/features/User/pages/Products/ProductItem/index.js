import { t } from "i18next";
import { Link } from "react-router-dom";
import PATH from "../../../../../constants/path";
import "./ProductItem.scss";
import { currencyFormatting } from "../../../../../constants/common";

function ProductItem({ product }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-5">
      <div className="product-item ">
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
        <div className="product-title">{product.name}</div>
        {product.discount > 0 ? (
          <div className="d-flex flex-column align-items-center mh-">
            <div className="product-price-discount">
              {currencyFormatting((product.price * (1 - product.discount / 100)).toFixed(2))}
            </div>
          </div>
        ) : (
          <div className="product-price">{currencyFormatting(product.price)}</div>
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
