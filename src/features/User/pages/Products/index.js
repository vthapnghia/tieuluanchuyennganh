import ProductItem from "../../Components/ProductItem";
import "./Products.scss";

const arr = [
  1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4,
];
function Products() {
  return (
    <div class="untree_co-section product-section before-footer-section">
      <div className="search-product">
        
      </div>
      <div class="container">
        <div class="row">
          {arr.map((item, index) => {
            return <ProductItem key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
