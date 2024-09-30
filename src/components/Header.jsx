import { useContext } from "react";

import { CartContext } from "../store/meal-cart-context";
import { UserProgressContext } from "../store/user-progress-context";
import { getItemsNumber } from "../util/formatting";
import foodLogo from "../assets/logo.jpg";
import Button from "./UI/Button";

export function Header() {
  const { userCart } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={foodLogo} alt="food-logo" />
          <h1>React Food</h1>
        </div>
        <nav>
          <Button
            textOnly // set to true automatically
            onClick={showCart}
          >
            {userCart.length === 0
              ? "Cart"
              : `Cart(${getItemsNumber(userCart)})`}
          </Button>
        </nav>
      </header>
    </>
  );
}
