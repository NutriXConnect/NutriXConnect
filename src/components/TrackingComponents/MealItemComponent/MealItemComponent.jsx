import { useState } from "react";
import { useDispatch } from "react-redux";
import { trackMealProgress } from "../../../middleware/trackerMiddleware";

const MealItemComponent = ({ meal, tracked, mealPlanId }) => {
  const [mealTracked, setMealTracked] = useState(tracked);

  const dispatch = useDispatch();
  const handleCheck = () => {
    dispatch(trackMealProgress(mealPlanId, meal._id, !mealTracked));
    setMealTracked(!mealTracked);
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="h-5 w-5 text-blue-600 rounded"
        checked={mealTracked}
        onChange={handleCheck}
      />
      <div className="ml-4">
        <p className="font-medium">{meal.name}</p>
        <p className="text-gray-600">
          {meal.nutritionalContent.calories} calories -{" "}
          {meal.nutritionalContent.fiber}g fiber -{" "}
          {meal.nutritionalContent.protein}g protein
        </p>
      </div>
    </div>
  );
};

export default MealItemComponent;
