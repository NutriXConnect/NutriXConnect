import React, { useEffect, useState } from "react";
import { Edit, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDietitianProfile,
  updateDietitianProfile,
} from "../../../middleware/dietitianMiddleware";

const DietitianProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    description: "",
  });

  const dispatch = useDispatch();
  const { selectedDietitian } = useSelector((state) => state.dietitians);

  useEffect(() => {
    if (selectedDietitian) {
      setFormData({ ...formData, ...selectedDietitian });
    }
  }, [selectedDietitian]);

  useEffect(() => {
    dispatch(getDietitianProfile("", "title summary description -_id"));
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateDietitianProfile(formData));
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Summary and Description</h2>
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 flex items-center gap-2"
        >
          {isEditing ? <X className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-3 py-2 border rounded-md 
              ${
                isEditing
                  ? "border-gray-300 bg-white"
                  : "border-transparent bg-gray-100"
              }
              transition-colors duration-200`}
          />
        </div>

        {/* Summary Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Summary</label>
          <input
            type="text"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-3 py-2 border rounded-md 
              ${
                isEditing
                  ? "border-gray-300 bg-white"
                  : "border-transparent bg-gray-100"
              }
              transition-colors duration-200`}
          />
        </div>

        {/* Description Textarea */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={!isEditing}
            rows="4"
            className={`w-full px-3 py-2 border rounded-md 
              ${
                isEditing
                  ? "border-gray-300 bg-white"
                  : "border-transparent bg-gray-100"
              }
              transition-colors duration-200`}
          />
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default DietitianProfile;
