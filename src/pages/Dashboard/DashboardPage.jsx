import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import HeaderComponent from "../../components/Common/Header";
import UserSubscriptionCard from "../../components/DashboardComponents/UserCard/UserCard";
import { getSubscriptionsList } from "../../middleware/subscriptionMiddleware";
import LoadingOverlay from "../../components/Common/LoadingOverlay/LoadingOverlay";
import { ChevronDown, ChevronUp } from "lucide-react";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth.user);
  const { users, loading } = useSelector((state) => state.subscription);
  const [expandedSections, setExpandedSections] = useState({});

  const isDietitian = role.includes("dietitian");

  useEffect(() => {
    if (isDietitian) {
      dispatch(getSubscriptionsList());
    }
  }, [isDietitian, dispatch]);

  if (loading) {
    return (
      <LoadingOverlay
        message={
          isDietitian ? "Fetching your subscribers" : "Fetching your details"
        }
      />
    );
  }

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

  const toggleSection = (status) => {
    setExpandedSections((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  return (
    <>
      <HeaderComponent />
      {isDietitian && (
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
      )}
    </>
  );
};

export default DashboardPage;
