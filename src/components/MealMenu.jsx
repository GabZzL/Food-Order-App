import { useContext} from "react";

import { CartContext } from "../store/meal-cart-context";
import { MealItem } from "./MealItem";

export function MealMenu() {
    const { mealsData, error } = useContext(CartContext);

    return(
        <div id="meals">
            {error 
                ? 
                    <p>{error.message}</p> 
                : 
                    mealsData.map((meal) => 
                        <MealItem
                            key={meal.id}
                            id={meal.id}
                            name={meal.name}
                            price={meal.price}
                            description={meal.description}
                            image={meal.image}
                        />
                    )
            } 
        </div>
    )
}