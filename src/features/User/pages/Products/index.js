import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../Components/ProductItem";
import "./Products.scss";
import { getAllProduct } from "./ProductSlice";

function Products() {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  console.log(products);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);
  return (
    <div className="untree_co-section product-section before-footer-section">
      <div className="search-product"></div>
      <div className="container">
        <div className="row">
          {products?.products.map((product, index) => {
            return <ProductItem key={index} product={product}/>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
