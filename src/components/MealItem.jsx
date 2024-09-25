import { useContext } from "react";
import { CartContext } from "../store/meal-cart-context";

export function MealItem({ id, name, price, description, image, addMeal }) {
    const { addMealToCart } = useContext(CartContext);

    return(
        <div className="meal-item">
            <article>
                <img src={`http://localhost:3000/${image}`} alt={id} />
                <h3>{name}</h3>
                <p className="meal-item-price">{price}</p>
                <p className="meal-item-description">{description}</p>
                <button 
                    className="button" onClick={() => addMealToCart(id)}
                >
                        Add to cart
                </button>
            </article>
        </div>
    );
} 