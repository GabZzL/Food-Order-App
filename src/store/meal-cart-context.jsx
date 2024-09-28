import { useState, createContext, useEffect } from "react"

import { getMealsData, submitUserOrder } from '../http';

export const CartContext = createContext({
    mealsData: [],
    userCart: [],
    isSubmitData: false,
    inCheckout: false,
    error: false,
    addMealToCart: () => {},
    updateMealCartQuantity: () => {},
    submitOrder: () => {},
    openCheckout: () => {},
    closeCheckout: () => {},
    restartUserOrder: () => {},
});

export default function CartContextProvider({ children }) {
    const [mealsData, setMealsData] = useState([]);
    const [userCart, setUserCart] = useState([]); // {id, name, price, quantiy}
    const [inCheckout, setInCheckout] = useState(false);
    const [isSubmitData, setIsSubmitData] = useState();
    const [error, setError] = useState(false);

    // GET meals data
    useEffect(() => {
        async function getData() {  
            try {
                const data = await getMealsData();
                console.log(data);
                setMealsData(data);
            } catch (error) {
                setError({ message: error.message || 'Failed to GET meals data' });
            };
        }

        getData();
    }, []);

    // show meals data
    console.log(userCart);

    // POST user order
    async function handleSubmitOrder(e) {
        e.preventDefault();

        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd.entries());

        const userOrder = {
            order: {
                items: [...userCart],
                customer: {...data},
            },
        };

        try {
            const message = await submitUserOrder(userOrder);

            console.log(message);
            console.log(userOrder);
            
            setIsSubmitData(true);
        } catch (error) {
            setError({ message: error.message || 'Failed to POST the order' })
        };
    }

    // add a selected meal to the user cart
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

    // Restart user order
    function handleRestartUserOrder() {
        setUserCart([]);
        setIsSubmitData(false)
        setInCheckout(false);
        setError(false);
    }

    // go to the checkout page
    function handleOpenCheckout() {
        setInCheckout(true);
    }

    // close the checkout page
    function handleCloseCheckout() {
        setInCheckout(false);
    }

    const ctxValue = {
        mealsData: mealsData,
        userCart: userCart,
        isSubmitData: isSubmitData,
        inCheckout: inCheckout,
        error: error,
        addMealToCart: handleAddMealToCart,
        updateMealCartQuantity: handleUpdateMealCartQuantity,
        submitOrder: handleSubmitOrder,
        openCheckout: handleOpenCheckout,
        closeCheckout: handleCloseCheckout,
        restartUserOrder: handleRestartUserOrder,
    };

    return(
        <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
    );
}