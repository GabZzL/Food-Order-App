// GET meals data
export async function getMealsData() {
    const res = await fetch('http://localhost:3000/meals');
    const data = await res.json();

    if(!res.ok) {
        throw new Error('Failed to get meals data');
    };

    return data;
}