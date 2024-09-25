import { useRef, useContext } from 'react';

import { CartContext } from '../store/meal-cart-context';
import foodLogo from '../assets/logo.jpg';
import Modal from './Modal';

export function Header() {
    const modal = useRef();

    const { mealsNumber } = useContext(CartContext);

    function handleOpenCart() {
        modal.current.open();
    }

    return(
        <>
            <Modal 
                ref={modal}
            />
            <header id='main-header'>
                <div id='title'>
                    <img src={foodLogo} alt="food-logo" />
                    <h1>React Food</h1>
                </div>

                <button 
                    className='meal-item-price'
                    onClick={handleOpenCart}
                >
                    {mealsNumber === 0 ? 'Cart' : `Cart(${mealsNumber})`}
                </button>
            </header>
        </>
    )
}
