import ProductItem from "../../Components/ProductItem";
import "./Shop.scss";

const arr = [
  1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4,
];
function Shop() {
  return (
    <div class="untree_co-section product-section before-footer-section">
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

export default Shop;
