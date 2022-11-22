import { product } from "../../../../assets/img";
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
          <div className="w-50">
            <Input
              name="quanlity"
              type="number"
              leftIcon={<Icons.Minus />}
              rightIcon={<Icons.Plus />}
              quanlity={true}
            />
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
