import { Award, Calendar, Clock, Mail, Phone, Star, User } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import SubscribedPlanCard from "../DashboardComponents/User/SubscribedPlanCard/SubscribedPlanCard";

const DietitianCard = ({ dietitian, inListing = true }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/home/dietitian-profile/${_id}`);
  };

  return (
    <>
      {inListing && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{dietitian?.name}</h3>
                <p className="text-gray-600">{dietitian?.title}</p>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{dietitian?.rating}</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">{dietitian?.summary}</p>
              <div className="mt-2 text-sm">
                <span className="font-bold">
                  {dietitian?.experience}+ years experience
                </span>
              </div>
              <div className="mt-4 flex justify-between text-sm">
                <span>{dietitian?.clientsServed} clients served</span>
                <span className="font-semibold">
                  From Rs. {dietitian?.startingPrice}/mo
                </span>
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
      )}
      {!inListing && (
        <>
          {/* <div className="max-w-4xl mx-auto p-4 space-y-6"> */}
          {/* Dietitian Profile Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {dietitian?.name}
                  </h2>
                  {/* <div className="flex items-center space-x-1 text-yellow-500"> */}
                  {/* <Star className="h-4 w-4 fill-current" /> */}
                  {/* <Star className="h-4 w-4 fill-current" /> */}
                  {/* <Star className="h-4 w-4 fill-current" /> */}
                  {/* <Star className="h-4 w-4 fill-current" /> */}
                  {/* <Star className="h-4 w-4 fill-current" /> */}
                  {/* <span className="text-gray-600 ml-2">(124 reviews)</span> */}
                  {/* </div> */}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Award className="h-5 w-5" />
                  <span>{dietitian?.title}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="h-5 w-5" />
                  <span>{dietitian?.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="h-5 w-5" />
                  <span>{dietitian?.mobile}</span>
                </div>
              </div>
            </div>
          </div>

          {/* </div> */}
        </>
      )}
    </>
  );
};

export default DietitianCard;
