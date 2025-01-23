import React from "react";
import { useNavigate } from "react-router-dom";

const DietitianCard = ({ dietitian }) => {
  const { _id, name, title, rating, summary, clientsServed, startingPrice } =
    dietitian;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/home/dietitian-profile/${_id}`);
  };
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-gray-600">{title}</p>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1">{rating}</span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-600">{summary}</p>
          <div className="mt-2 text-sm">
            <span className="font-bold">
              {dietitian.experience}+ years experience
            </span>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span>{clientsServed} clients served</span>
            <span className="font-semibold">From Rs. {startingPrice}/mo</span>
          </div>
        </div>
        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          onClick={handleNavigate}
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default DietitianCard;
