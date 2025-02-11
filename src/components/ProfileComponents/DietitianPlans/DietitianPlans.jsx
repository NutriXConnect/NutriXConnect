import React, { useEffect, useState } from "react";
import {
  Pencil,
  Plus,
  Check,
  Calendar,
  Trash2,
  IndianRupee,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDietitianPlan,
  deleteDietitianPlan,
  getDietitianProfilePlans,
  updateDietitianPlan,
} from "../../../middleware/dietitianMiddleware";
import LoadingOverlay from "../../Common/LoadingOverlay/LoadingOverlay";
import FloatingBar from "../../Common/FloatingInfoBar/FloatingBar";
const DietitianPlans = () => {
  const [plans, setPlans] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editPlan, setEditPlan] = useState(null);
  const [isExisting, setIsExisting] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    description: "",
    price: "",
    duration: "",
  });

  const dispatch = useDispatch();
  const dietitianPlans = useSelector((state) => state.dietitians.plans);
  const { error, loading } = useSelector((state) => state.dietitians);

  useEffect(() => {
    dispatch(getDietitianProfilePlans());
  }, [dispatch]);

  useEffect(() => {
    setPlans([...dietitianPlans]);
  }, [dietitianPlans]);

  const handleEditClick = (plan) => {
    setIsEditing(true);
    setEditPlan(plan);
    setIsExisting(true);
    setFormData({
      _id: plan._id,
      name: plan.name,
      description: plan.description,
      price: plan.price,
      duration: plan.duration,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (isExisting) {
      dispatch(updateDietitianPlan(formData));
    } else {
      dispatch(createDietitianPlan(formData));
    }
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan._id === editPlan._id ? { ...plan, ...formData } : plan
      )
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteDietitianPlan(formData._id));
    setIsEditing(false);
  };

  const handleAddNewPlan = () => {
    const newPlan = {
      _id: new Date().toISOString(),
      name: "",
      description: "",
      price: "",
      duration: "",
    };
    setPlans([...plans, newPlan]);
    setIsExisting(false);
    setIsEditing(true);
    setEditPlan(newPlan);
    setFormData({
      _id: "",
      name: "",
      description: "",
      price: "",
      duration: "",
    });
  };

  if (loading) {
    return <LoadingOverlay message="Fetching Plans" />;
  }
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mx-auto max-w-6xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Dietitian Plans
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-800 flex-1 mr-2">
                {plan.name}
              </h3>
              <button
                onClick={() => handleEditClick(plan)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <Pencil className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {plan.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <IndianRupee className="w-4 h-4 mr-2 text-green-600" />
                <span className="text-sm font-medium">
                  {plan.price.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center text-gray-700">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-sm">
                  {plan.duration} {plan.duration === 1 ? "Month" : "Months"}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Plan Card */}
        <button
          onClick={handleAddNewPlan}
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center h-full min-h-[200px]"
        >
          <Plus className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-gray-600 font-medium">Add New Plan</span>
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {isExisting ? "Edit plan" : "Add new Plan"}
                </h2>
                {isExisting && (
                  <button
                    onClick={handleDelete}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">Delete</span>
                  </button>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Plan Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm resize-none"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Duration (months)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && (
        <FloatingBar
          type="error"
          duration={0}
          isVisible={true}
          message={error.message}
        />
      )}
    </div>
  );
};

export default DietitianPlans;
