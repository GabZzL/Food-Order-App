import { useContext } from "react";

import { CartContext } from "../store/meal-cart-context";
import { UserProgressContext } from "../store/user-progress-context";
import { getTotal, currencyFormatter } from "../util/formatting";
import Modal from "./UI/Modal";
import Button from "./UI/Button";

export function Cart() {
  const { userCart, updateMealCartQuantity } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? hideCart : null}
    >
      <h2>Your Cart</h2>
      {userCart.length === 0 ? (
        <p>Your cart is empty. Please select some items from the menu.</p>
      ) : (
        <ul>
          {userCart.map((item) => (
            <li key={item.id} className="cart-item">
              <p>
                {item.name} - {currencyFormatter.format(item.price)}
              </p>
              <p className="cart-item-actions">
                <button onClick={() => updateMealCartQuantity(item.id, -1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateMealCartQuantity(item.id, 1)}>
                  +
                </button>
              </p>
            </li>
          ))}
        </ul>
      )}
      <p className="cart-total">
        {currencyFormatter.format(getTotal(userCart))}
      </p>
      <p className="modal-actions">
        <Button textOnly onClick={hideCart}>
          Close
        </Button>
        <Button disabled={userCart.length === 0} onClick={showCheckout}>
          Go to Checkout
        </Button>
      </p>
    </Modal>
  );
}
