import { useState, createContext, useEffect } from "react"

import { getMealsData } from '../http';

export const CartContext = createContext({
    mealsData: [],
    mealsNumber: 0,
    addMealToCart: () => {},
    updateMealCartQuantity: () => {},
});

export default function CartContextProvider({ children }) {
    const [mealsData, setMealsData] = useState([]);
    const [userCart, setUserCart] = useState([]); // {id, name, price, quantiy}
    const [error, setError] = useState(false);

    // get meals data
    useEffect(() => {
        async function getData() {  
            try {
                const data = await getMealsData();
                console.log(data);
                setMealsData(data);
            } catch (error) {
                setError({ message: error.message || 'Failed to get meals data' });
            };
        }

        getData();
    }, []);

    console.log(userCart);

    function handleAddMealToCart(id) {
        const userCartItems = [...userCart];

        const itemIndex = userCartItems.findIndex((item) => item.id === id);
        const existingItem = userCartItems[itemIndex];

        if (existingItem) {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            };

            userCartItems[itemIndex] = updatedItem;
        } else {
            const item = mealsData.find((meal) => meal.id === id);
            userCartItems.push({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: 1,
            });
        };

        setUserCart(userCartItems);
    }

    function handleUpdateMealCartQuantity(id, amount) {
        console.log(`update cart amount`);
    }

    const ctxValue = {
        mealsData: mealsData,
        mealsNumber: userCart.length,
        addMealToCart: handleAddMealToCart,
        updateMealCartQuantity: handleUpdateMealCartQuantity,
    };

    return(
        <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
    );
}