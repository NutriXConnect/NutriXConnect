import React, { useEffect } from "react";
import { StarIcon, Users, Clock, CreditCard, MoveLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getDietitianProfile } from "../../middleware/dietitianMiddleware";
import { useDispatch, useSelector } from "react-redux";
import HeaderComponent from "../../components/Common/Header";

const DietitianProfilePage = () => {
  const { dietitianId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.dietitians.selectedDietitian);

  useEffect(() => {
    if (!profile || dietitianId !== profile._id) {
      dispatch(getDietitianProfile(dietitianId));
    }
  }, [dietitianId]);

  const handleGoback = () => {
    navigate(-1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };
  if (!profile) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <HeaderComponent />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <button
          onClick={handleGoback}
          className="bg-gray-100 rounded-lg shadow-md p-2 flex items-centers"
        >
          <MoveLeft />
        </button>
        {/* Header Section */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {profile.name}
              </h1>
              <p className="text-xl text-gray-600 mt-2">{profile.title}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end">
                <StarIcon className="w-5 h-5 text-yellow-400" />
                <span className="ml-1 text-lg font-semibold">
                  {profile.rating}/5
                </span>
              </div>
              <div className="flex items-center mt-2 text-gray-600 justify-end">
                <Users className="w-4 h-4 mr-1" />
                <span>{profile.clientsServed} clients served</span>
              </div>
            </div>
          </div>
        </div>

        {/* Experience and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <Clock className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Experience</p>
              <p className="text-lg font-semibold">
                {profile.experience} Years
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <CreditCard className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Starting Price</p>
              <p className="text-lg font-semibold">₹{profile.startingPrice}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <Users className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="text-lg font-semibold">
                {formatDate(profile.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <p className="text-gray-600 whitespace-pre-wrap">
              {profile.description}
            </p>
          </div>
        </div>

        {/* Plans */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.plans.map((plan) => (
              <div key={plan._id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold">
                      {plan.duration} {plan.duration === 1 ? "Month" : "Months"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-xl font-bold text-green-600">
                      ₹{plan.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DietitianProfilePage;
