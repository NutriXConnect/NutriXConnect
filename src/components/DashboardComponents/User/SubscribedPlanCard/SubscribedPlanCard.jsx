import { Calendar, Clock } from "lucide-react";

const SubscribedPlanCard = ({ plan }) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Plan Details
          </h2>

          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span className="font-semibold text-gray-900">{plan.name}</span>
              </div>
              <span className="text-green-600 font-bold">Rs. {plan.price}</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span>{plan.duration} months duration</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                <span>Weekly personalized meal plans</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                <span>Bi-weekly progress tracking</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                <span>24/7 chat support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscribedPlanCard;
