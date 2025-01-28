import { Edit, Save } from "lucide-react";
import { useState } from "react";

const GoalsTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [goals, setGoals] = useState({
    weightGoal: "65",
    timeframe: "3",
    dietaryPreferences: "Vegetarian",
    fitnessGoal: "Weight loss and muscle toning",
  });

  const handleChange = (e) => {
    setGoals({ ...goals, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Fitness Goals</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 flex items-center gap-2"
        >
          {isEditing ? (
            <Save className="w-5 h-5" />
          ) : (
            <Edit className="w-5 h-5" />
          )}
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="text-gray-600">Target Weight (kg)</label>
            <input
              type="number"
              name="weightGoal"
              value={goals.weightGoal}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded p-2 mt-1 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="text-gray-600">Timeframe (months)</label>
            <input
              type="number"
              name="timeframe"
              value={goals.timeframe}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded p-2 mt-1 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="text-gray-600">Dietary Preferences</label>
            <select
              name="dietaryPreferences"
              value={goals.dietaryPreferences}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded p-2 mt-1 disabled:bg-gray-50"
            >
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
          </div>
          <div>
            <label className="text-gray-600">Fitness Goal Description</label>
            <textarea
              name="fitnessGoal"
              value={goals.fitnessGoal}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded p-2 mt-1 disabled:bg-gray-50"
              rows="3"
            />
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default GoalsTab;
