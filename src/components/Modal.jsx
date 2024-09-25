import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

import { Cart } from "./Cart";

const Modal = forwardRef(function Modal(props, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return{
            open: () => {
                dialog.current.showModal();
            },
        };
    });

    return createPortal(
        <dialog id="modal" ref={dialog}>
            <Cart />
        </dialog>,
       document.getElementById('modal')
    );
});

export default Modal;