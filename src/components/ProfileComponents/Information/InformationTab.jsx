import { Edit, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfileDetails,
  updateUserProfileDetails,
} from "../../../middleware/userMiddleware";

const InformationTab = () => {
  const user = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Details
    name: "",
    email: "",
    phone: "",
    age: "",
    mobile: "",
    gender: "",
    // Physical Details
    height: "",
    weight: "",
    bodyFat: "",
    muscleMass: "",
  });

  useEffect(() => {
    if (!user) {
      dispatch(getUserProfileDetails());
    } else {
      setFormData({
        name: user.personal !== null ? user.personal.name : "",
        email: user.personal !== null ? user.personal.email : "",
        age: user.personal !== null ? user.personal.age : "",
        mobile: user.personal !== null ? user.personal.mobile : "",
        gender: user.personal !== null ? user.personal.gender : "",
        height: user.fitness !== null ? user.fitness.height : "",
        weight: user.fitness !== null ? user.fitness.weight : "",
        bodyFat: user.fitness !== null ? user.fitness.bodyFat : "",
        muscleMass: user.fitness !== null ? user.fitness.muscleMass : "",
      });
    }
  }, [user, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfileDetails(formData));
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Your Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 flex items-center gap-2"
        >
          {isEditing ? <X className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
          {isEditing ? "Close" : "Edit"}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Details Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border rounded p-2 mt-1 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border rounded p-2 mt-1 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="text-gray-600">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border rounded p-2 mt-1 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="text-gray-600">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border rounded p-2 mt-1 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="text-gray-600">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border rounded p-2 mt-1 disabled:bg-gray-50"
              >
                <option value="" disabled selected>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>
        </div>

        {/* Physical Details Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Physical Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border rounded p-2 mt-1 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="text-gray-600">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border rounded p-2 mt-1 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="text-gray-600">Body Fat %</label>
              <input
                type="number"
                name="bodyFat"
                value={formData.bodyFat}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border rounded p-2 mt-1 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="text-gray-600">Muscle Mass (%)</label>
              <input
                type="number"
                name="muscleMass"
                value={formData.muscleMass}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border rounded p-2 mt-1 disabled:bg-gray-50"
              />
            </div>
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

export default InformationTab;
