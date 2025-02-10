import { useEffect } from "react";
import DietitianCard from "../../../DietitianCard/DietitianCard";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "../../../Common/LoadingOverlay";
import { getUserSubscriptionDetails } from "../../../../middleware/subscriptionMiddleware";
import SubscribedPlanCard from "../SubscribedPlanCard/SubscribedPlanCard";
import { ExternalLink } from "lucide-react";
import ErrorComponent from "../../../Common/Error";

const UserDashboardComponent = () => {
  const { userSubscriptionDetails, loading, error } = useSelector(
    (state) => state.subscription
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserSubscriptionDetails());
  }, [dispatch]);

  if (loading) {
    return <LoadingOverlay message={"Fetching your dashboard"} />;
  }

  return (
    // <div className="container mx-auto px-4 py-8">
    <>
      {!error && (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Your Subscription
            </h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2 space-x-2">
              Track
              <ExternalLink height={18} />
            </button>
          </div>

          <div className="lg:flex lg:space-x-6">
            {/* Dietitian details card */}
            <div className="lg:w-1/2 w-full">
              <DietitianCard
                dietitian={userSubscriptionDetails.dietitian}
                inListing={false}
              />
            </div>
            {/* Plan Details Card */}
            <div className="lg:w-1/2 w-full">
              <SubscribedPlanCard plan={userSubscriptionDetails.plan} />
            </div>
          </div>
        </div>
      )}
      {error && (
        <ErrorComponent message="Some error occured. Please Login again" />
      )}
    </>
  );
};

export default UserDashboardComponent;
