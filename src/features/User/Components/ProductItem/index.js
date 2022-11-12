import { Link, useLocation } from "react-router-dom";
import { product } from "../../../../assets/img";
import Icons from "../../../../components/Icons";
import "./ProductItem.scss";

function ProductItem() {
  const { pathname } = useLocation();
  return (
    <div
      class={
        pathname === "/Home"
          ? "col-md-12 col-lg-3 mb-5 mb-lg-0"
          : "col-12 col-md-4 col-lg-3 mb-5"
      }
    >
      <Link class="product-item" href="/">
        <img src={product} alt="product" class="img-fluid product-thumbnail" />
        <h3 class="product-title">Nordic Chair</h3>
        <strong class="product-price">$50.00</strong>
        <span class="icon-cross">
          <Icons.Cross />
        </span>
      </Link>
    </div>
  );
}

export default ProductItem;
