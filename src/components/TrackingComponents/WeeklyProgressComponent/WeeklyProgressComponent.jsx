import { AlertTriangle, Check } from "lucide-react";

const WeeklyProgressComponent = () => {
  const days = [
    { day: "Mon", status: "completed" },
    { day: "Tue", status: "completed" },
    { day: "Wed", status: "warning" },
    { day: "Thu", status: "today" },
    { day: "Fri", status: "upcoming" },
    { day: "Sat", status: "upcoming" },
    { day: "Sun", status: "upcoming" },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-600";
      case "warning":
        return "bg-yellow-100 text-yellow-600";
      case "today":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">Weekly Progress</h2>
      <div className="grid grid-cols-7 gap-4">
        {days.map(({ day, status }) => (
          <div key={day} className="text-center">
            <div className="text-sm text-gray-600 mb-2">{day}</div>
            <div
              className={`h-20 rounded-lg flex items-center justify-center ${getStatusStyles(
                status
              )}`}
            >
              {status === "completed" && <Check />}
              {status === "warning" && <AlertTriangle />}
              {status === "today" && <span className="font-bold">Today</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyProgressComponent;
