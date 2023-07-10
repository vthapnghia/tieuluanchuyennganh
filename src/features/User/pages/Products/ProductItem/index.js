import { t } from "i18next";
import { Link } from "react-router-dom";
import PATH from "../../../../../constants/path";
import "./ProductItem.scss";
import { currencyFormatting } from "../../../../../until/common";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useDispatch } from "react-redux";
import { getAllFavorites, like, unlike } from "./FavoriteSlice";

function ProductItem({ product, isLike = false }) {
  const dispatch = useDispatch();

  const handleFavorite = async () => {
    if (isLike) {
      await dispatch(unlike(product._id)).then((res) => {
        if (res.payload.status === 200) {
          dispatch(getAllFavorites());
        }
      });
    } else {
      await dispatch(like({ product_id: product._id })).then(async (res) => {
        if (res.payload.status === 201) {
          await dispatch(getAllFavorites());
        }
      });
    }
  };

  return (
    <div id="product-item">
      <div className="product-img">
        <img
          src={product?.product_image[1] || product?.product_image[0]}
          alt="no_1"
          className="no_1"
        />
        <img src={product?.product_image[0]} alt="no_2" className="no_2" />
        <div className="action">
          <div
            className={`icon-favorite ${isLike && "icon-like"}`}
            onClick={handleFavorite}
          >
            <FavoriteIcon />
          </div>
          <Link
            to={PATH.PRODUCT.DETAIL_PRODUCT.replace(":id", product?._id)}
            className="icon-eye"
          >
            <RemoveRedEyeIcon />
          </Link>
        </div>
        {product?.discount > 0 && (
          <div className="discount">
            {t("discount_label", { param: product?.discount })}
          </div>
        )}
      </div>

      <div className="product-info">
        <div className="name">{product?.name}</div>
        <div className="price">
          {product?.discount > 0 && (
            <span className="price-discount">
              {currencyFormatting(
                product?.price * (1 - product?.discount / 100)
              )}
            </span>
          )}
          <span
            className="price-init"
            style={{
              textDecoration: product?.discount > 0 ? "line-through" : "none",
              color: product?.discount > 0 ? "#ccc" : "$main_color",
              fontSize: product?.discount > 0 ? "12px" : "16px",
            }}
          >
            {currencyFormatting(product?.price)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
