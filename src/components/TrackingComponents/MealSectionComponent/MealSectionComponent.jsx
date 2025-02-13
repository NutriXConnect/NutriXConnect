import MealItemComponent from "../MealItemComponent/MealItemComponent";

const MealSectionComponent = ({ _id, name, time, meals }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <span className="text-gray-600">{time}</span>
      </div>
      <div className="space-y-4">
        {meals.map((meal, index) => (
          <MealItemComponent
            key={index}
            meal={meal.meal}
            tracked={meal.tracked}
            mealPlanId={_id}
          />
        ))}
      </div>
    </div>
  );
};

export default MealSectionComponent;
