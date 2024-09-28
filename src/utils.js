export function formatPrice(orders) {
    const total = orders.reduce((acc, order) => acc + order.price*order.quantity, 0);
    const formatedTotal = Number(total).toFixed(2);

    return formatedTotal;
}