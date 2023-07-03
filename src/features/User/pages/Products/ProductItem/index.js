import { t } from "i18next";
import { Link } from "react-router-dom";
import PATH from "../../../../../constants/path";
import "./ProductItem.scss";
import { currencyFormatting } from "../../../../../until/common";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

function ProductItem({ product }) {
  return (
    <div id="product-item">
      <div className="product-img">
        <img
          src={product?.product_image[1] || product?.product_image[0]}
          alt="no_1"
          className="no_1"
        />{" "}
        <img src={product?.product_image[0]} alt="no_2" className="no_2" />
        <div className="action">
          {/* <div className="icon-card">
            <AddShoppingCartIcon />
          </div> */}
          <Link
            to={PATH.PRODUCT.DETAIL_PRODUCT.replace(":id", product?._id)}
            className="icon-eye"
          >
            <RemoveRedEyeIcon />
          </Link>
        </div>
      </div>

      <div className="product-info">
        <div className="name">{product?.name}</div>
        <span className="price">{currencyFormatting(20000)}</span>
      </div>
    </div>
  );
}

export default ProductItem;
