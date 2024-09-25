import { Header } from "./components/Header";
import { MealMenu } from "./components/mealMenu.JSX";

import CartContextProvider from "./store/meal-cart-context";

function App() {
  return (
    <CartContextProvider>   
      <Header />
      <MealMenu />
    </CartContextProvider>
  );
}

export default App;
