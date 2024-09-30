import { MealItem } from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {};

export function MealMenu() {
  const {
    data: mealsData,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Loading meals data...</p>;
  }

  if (error) {
    return <Error title="fail to fail meals" message={error} />;
  }

  return (
    <>
      {error ? (
        <div id="meals">
          <p>{error.message}</p>
        </div>
      ) : (
        <ul id="meals">
          {mealsData.map((meal) => (
            <MealItem
              key={meal.id}
              meal={meal}
            />
          ))}
        </ul>
      )}
    </>
  );
}
