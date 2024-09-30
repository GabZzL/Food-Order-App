import { Header } from "./components/Header";
import { MealMenu } from "./components/mealMenu.JSX";
import { Cart } from "./components/Cart";
import { Checkout } from "./components/Checkout";

import CartContextProvider from "./store/meal-cart-context";
import UserProgressContextProvider from "./store/user-progress-context";

function App() {
  return (
    <CartContextProvider>
      <UserProgressContextProvider>
        <Header />
        <MealMenu />
        <Cart />
        <Checkout />
      </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
