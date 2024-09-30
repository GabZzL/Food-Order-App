export function getTotal(orders) {
  const total = orders.reduce(
    (acc, order) => acc + order.price * order.quantity,
    0
  );
  const formatedTotal = Number(total).toFixed(2);

  return formatedTotal;
}

export function getItemsNumber(orders) {
  const totalNumber = orders.reduce((acc, order) => acc + order.quantity, 0);

  return totalNumber;
}

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
