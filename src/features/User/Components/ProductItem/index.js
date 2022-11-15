import { t } from "i18next";
import { Link, useLocation } from "react-router-dom";
import { product } from "../../../../assets/img";
import Icons from "../../../../components/Icons";
import PATH from "../../../../contanst/path";
import "./ProductItem.scss";

function ProductItem() {
  const { pathname } = useLocation();
  console.log(PATH.PRODUCT.DETAIL_PRODUCT);
  return (
    <div
      class={
        pathname === "/Home"
          ? "col-md-12 col-lg-3 mb-5 mb-lg-0"
          : "col-12 col-md-4 col-lg-3 mb-5"
      }
    >
      <div class="product-item" >
        <img src={product} alt="product" class="img-fluid product-thumbnail" />
        <h3 class="product-title">Nordic Chair</h3>
        <strong class="product-price">$50.00</strong>
        <Link class="icon-cross" to={PATH.PRODUCT.DETAIL_PRODUCT.replace(':id', 1)}>
          <p>{t("product_detail")}</p>
        </Link>
      </div>
    </div>
  );
}

export default ProductItem;
