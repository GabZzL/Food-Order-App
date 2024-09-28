// GET meals data
export async function getMealsData() {
    const res = await fetch('http://localhost:3000/meals');
    const data = await res.json();

    if(!res.ok) {
        throw new Error('Failed to get meals data');
    };

    return data;
}

// POST user order
export async function submitUserOrder(order) {
    const res = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!res.ok) {
        throw new Error('Failed to submit the user order');
    };

    return {message: 'the order was submitted'}
}