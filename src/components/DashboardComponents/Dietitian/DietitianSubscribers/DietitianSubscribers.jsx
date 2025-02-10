import { useEffect, useState } from "react";
import { getSubscriptionsList } from "../../../../middleware/subscriptionMiddleware";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "../../../Common/LoadingOverlay";
import { ChevronDown, ChevronUp } from "lucide-react";
import UserSubscriptionCard from "../UserCard/UserCard";
import ErrorComponent from "../../../Common/Error";

const DietitianSubscribers = () => {
  const { users, loading, error } = useSelector((state) => state.subscription);
  const dispatch = useDispatch();
  const [expandedSections, setExpandedSections] = useState({});

  const sections = [
    {
      title: "Pending Subscribers",
      status: "created",
      emptyMessage: "No pending subscribers found",
    },
    {
      title: "Active Subscribers",
      status: "inprogress",
      emptyMessage: "No in-progress subscribers found",
    },
    {
      title: "Completed Subscribers",
      status: "completed",
      emptyMessage: "No completed subscribers found",
    },
  ];

  useEffect(() => {
    dispatch(getSubscriptionsList());
  }, [dispatch]);

  const toggleSection = (status) => {
    setExpandedSections((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  if (loading) {
    return <LoadingOverlay message={"Fetching your subscribers"} />;
  }

  return (
    <>
      {error && <ErrorComponent message={error.message} />}
      <div className="container mx-auto px-4 py-8">
        {sections.map(({ title, status, emptyMessage }) => {
          const filteredUsers = users.filter(
            (user) => user.subscriptionStatus === status
          );
          return (
            <div
              key={status}
              className="mb-4 border rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold"
                onClick={() => toggleSection(status)}
              >
                <span>{title}</span>
                {expandedSections[status] ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSections[status] && (
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map((user) => (
                      <UserSubscriptionCard key={user._id} user={user} />
                    ))}
                  </div>
                  {filteredUsers.length === 0 && (
                    <p className="text-center py-4 text-gray-500">
                      {emptyMessage}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DietitianSubscribers;
