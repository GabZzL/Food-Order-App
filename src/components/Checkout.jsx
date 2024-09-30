import { useContext } from "react";

import { CartContext } from "../store/meal-cart-context";
import { UserProgressContext } from "../store/user-progress-context";
import { getTotal, currencyFormatter } from "../util/formatting";
import Modal from "./UI/Modal";
import { Input } from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export function Checkout() {
  const { userCart, cleanCart } = useContext(CartContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const { progress, hideCheckout } = useContext(UserProgressContext);

  function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: [...userCart],
          customer: { ...data },
        },
      })
    );
  }

  function handleFinish() {
    cleanCart();
    hideCheckout();
    clearData();
  }

  let actions = (
    <>
      <Button textOnly type="button" onClick={hideCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={hideCheckout}>
        <h2>Success</h2>
        <p>Your order was submitted successfully.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Close</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === "checkout"} onClose={hideCheckout}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(getTotal(userCart))}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="text" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="control-row">
          <Input label="Postal code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
