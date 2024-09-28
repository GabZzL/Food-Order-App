import { useContext, useState } from "react"

import { CartContext } from "../store/meal-cart-context"
import { formatPrice } from "../utils";

export function Checkout() {
    const { 
        userCart, 
        isSubmitData, 
        error, 
        submitOrder, 
        closeCheckout, 
        restartUserOrder 
    } = useContext(CartContext);

    if (isSubmitData) {
        return(
            <div>
                <h2>Your order was submitted successfully.</h2>
                <p>We will get back to you with more details via email within the next few minutes.</p>
                <form method="dialog" className="modal-actions">
                    <button className="button" onClick={restartUserOrder}>Okay</button>
                </form>
            </div>
        );
    }

    if (error) {
        return(
            <div>
                <h2>We can't procede with you order.</h2>
                <p>{error.message}</p>
                <form method="dialog" className="modal-actions">
                    <button className="button">Close</button>
                </form>
            </div>
        );
    }

    return(
        <form onSubmit={submitOrder}>
            <div className="control">
                <h2>Checkout</h2>
                <p>{formatPrice(userCart)}</p>
            </div>

            <div className="control">
                <label htmlFor="name">Full Name</label>
                <input id="name" type="text" name="name" />
            </div>

            <div className="control">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" />
            </div>

            <div className="control">
                <label htmlFor="street">Street</label>
                <input id="street" type="text" name="street" />
            </div>

            <div className="control-row">
                <div className="control">
                    <label htmlFor="postal-code">Postal Code</label>
                    <input id="postal-code" type="text" name="postal-code" />
                </div>

                <div className="control">
                    <label htmlFor="city">City</label>
                    <input id="city" type="text" name="city" />
                </div>
            </div>

            <div className="modal-actions">
                <button className="text-button" onClick={closeCheckout}>Close</button>
                <button type="submit" className="button">Submit Order</button>
            </div>
        </form>
    );
}