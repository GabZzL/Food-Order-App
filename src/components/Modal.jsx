import { forwardRef, useImperativeHandle, useRef, useContext} from "react";
import { createPortal } from "react-dom";

import { Cart } from "./Cart";
import { Checkout } from "./Checkout";
import { CartContext } from "../store/meal-cart-context";

const Modal = forwardRef(function Modal(props, ref) {
    const { inCheckout } = useContext(CartContext);

    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return{
            open: () => {
                dialog.current.showModal();
            },
        };
    });

    return createPortal(
        <dialog className="modal" ref={dialog}>
            {inCheckout ? <Checkout /> : <Cart />}
        </dialog>,
       document.getElementById('modal')
    );
});

export default Modal;