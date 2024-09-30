import { useState, createContext } from "react"

export const CartContext = createContext({
    userCart: [],
    addMealToCart: () => {},
    updateMealCartQuantity: () => {},
    cleanCart: () => {},
});

export default function CartContextProvider({ children }) {
    const [userCart, setUserCart] = useState([]); // {id, name, price, quantiy}

    // add a selected meal to the user cart
    function handleAddMealToCart(meal) {
        const userCartItems = [...userCart];

        const itemIndex = userCartItems.findIndex((item) => item.id === meal.id);
        const existingItem = userCartItems[itemIndex];

        if (existingItem) {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            };

            userCartItems[itemIndex] = updatedItem;
        } else {
            userCartItems.push({
                ...meal,
                quantity: 1,
            });
        };

        setUserCart(userCartItems);
    }

    // add or rest an item from the user cart
    function handleUpdateMealCartQuantity(id, amount) {
        const userCartItems = [...userCart];

        const itemIndex = userCartItems.findIndex((item) => item.id === id);
        const existingItem = {...userCartItems[itemIndex]};

        existingItem.quantity += amount;

        if (existingItem.quantity <= 0) {
            userCartItems.splice(itemIndex, 1);
        } else {
            userCartItems[itemIndex] = existingItem;
        };

        setUserCart(userCartItems);
    }

    function cleanCart() {
        setUserCart([]);
    }

    const ctxValue = {
        userCart: userCart,
        addMealToCart: handleAddMealToCart,
        updateMealCartQuantity: handleUpdateMealCartQuantity,
        cleanCart,
    };

    return(
        <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
    );
}