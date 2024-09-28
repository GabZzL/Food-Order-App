import { useRef, useContext } from 'react';

import { CartContext } from '../store/meal-cart-context';
import foodLogo from '../assets/logo.jpg';
import Modal from './Modal';

export function Header() {
    const modal = useRef();

    const { userCart } = useContext(CartContext);

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
                    {userCart.length === 0 ? 'Cart' : `Cart(${userCart.length})`}
                </button>
            </header>
        </>
    )
}
