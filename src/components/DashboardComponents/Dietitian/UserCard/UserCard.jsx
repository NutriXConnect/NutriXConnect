import { User, Calendar, Ruler, Weight } from "lucide-react";
import { Link } from "react-router-dom";

const statusStyles = {
  created: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    label: "Pending",
    buttonText: "Create Plan",
  },
  inprogress: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    label: "In Progress",
    buttonText: "Check Progress",
  },
  completed: {
    bg: "bg-green-100",
    text: "text-green-600",
    label: "Completed",
    buttonText: "Check",
  },
};

const calculateDaysLeft = (endDate) => {
  const today = new Date();
  const end = new Date(endDate);
  const timeDiff = end - today;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};

const UserSubscriptionCard = ({ user }) => {
  const status = statusStyles[user.subscriptionStatus] || statusStyles.created;
  const daysLeft =
    user.subscriptionStatus === "inprogress" && user.subscriptionEndDate
      ? calculateDaysLeft(user.subscriptionEndDate)
      : null;

  const openSubscriptionPage = () => {};

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Header with name and basic info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{user.name}</h3>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              <span className="text-sm">{user.age} years</span>
              <span className="mx-2">•</span>
              <span className="text-sm capitalize">{user.gender}</span>
            </div>
          </div>
        </div>
        <div className={`${status.bg} px-3 py-1 rounded-full`}>
          <span className={`text-sm font-medium ${status.text}`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Contact Information (Commented for future use) */}
      {/* <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          <span className="text-sm">{user.email}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Phone className="w-4 h-4 mr-2" />
          <span className="text-sm">{user.mobile}</span>
        </div>
      </div> */}

      {/* Physical Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        <div className="flex items-center">
          <Ruler className="w-4 h-4 mr-2 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">Height</p>
            <p className="font-medium text-gray-700">{user.height} cm</p>
          </div>
        </div>
        <div className="flex items-center">
          <Weight className="w-4 h-4 mr-2 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">Weight</p>
            <p className="font-medium text-gray-700">{user.weight} kg</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 flex items-center justify-center rounded-full bg-blue-100">
            <span className="text-xs font-bold text-blue-600">B</span>
          </div>
          <div>
            <p className="text-xs text-gray-500">BMI</p>
            <p className="font-medium text-gray-700">
              {((user.weight / (user.height * user.height)) * 10000).toFixed(1)}
            </p>
          </div>
        </div>
      </div>

      {/* Days Left for In Progress Users */}
      {daysLeft !== null && (
        <div className="mt-4 text-sm text-gray-700">
          Days Left: <span className="font-semibold">{daysLeft}</span>
        </div>
      )}

      {/* Action Button */}
      <Link
        to={{
          pathname: "./subscription",
          search: `?query=${user.subscriptionId}`,
        }}
      >
        <button
          className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          // onClick={openSubscriptionPage}
        >
          {status.buttonText}
        </button>
      </Link>
    </div>
  );
};

export default UserSubscriptionCard;
