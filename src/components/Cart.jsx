import { useContext } from "react"

import { CartContext } from "../store/meal-cart-context"
import { formatPrice } from "../utils";

export function Cart() {
    const { userCart, updateMealCartQuantity, openCheckout } = useContext(CartContext);

    return(
        <div className="cart">
            <h2>Your Cart</h2>
            {userCart.length === 0 
                ? 
                <p>Your cart is empty. Please select some items from the menu.</p> 
                : 
                <ul>
                    {userCart.map((item) => (
                        <li key={item.id} className="cart-item">
                            <div>
                                <p>{item.name} - {item.price}</p>
                            </div>
                            <div className="cart-item-actions">
                                <button onClick={() => updateMealCartQuantity(item.id, -1)}>
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateMealCartQuantity(item.id, 1)}>
                                    +
                                </button>
                            </div>
                        </li>
                    ))}
                    <p className="cart-total">
                        {formatPrice(userCart)}
                    </p>
                </ul>
            }
            <form method="dialog" className="modal-actions">
                <button className="text-button">Go Back</button>
                <button 
                    className="button" 
                    onClick={openCheckout}
                    disabled={userCart.length === 0} 
                >
                    Checkout
                </button>
            </form>
        </div>
    )
}