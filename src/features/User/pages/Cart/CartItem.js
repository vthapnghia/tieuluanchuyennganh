import { product } from "../../../../assets/img";
import { Link } from "react-router-dom";
import Input from "./../../../../components/Input/index";
import Icons from "../../../../components/Icons";
function CartItem() {
  return (
    <>
      <tr>
        <td className="product-thumbnail">
          <img src={product} alt="product" className="img-fluid" />
        </td>
        <td className="product-name">
          <h2 className="h5 text-black">Product 1</h2>
        </td>
        <td>$49.00</td>
        <td>
          <div className="input-group-prepend d-flex align-items-center justify-content-around">
            <div className="cursor">
              <Icons.Minus />
            </div>
            <div className="w-10">
              <Input name="test" customStyle={{width: '50px', height: '40px'}} type="text"/>
            </div>
            <div className="cursor">
              <Icons.Plus />
            </div>
          </div>
        </td>
        <td>$49.00</td>
        <td>
          <div className="cursor">
            <Icons.Remove />
          </div>
        </td>
      </tr>
    </>
  );
}

export default CartItem;
