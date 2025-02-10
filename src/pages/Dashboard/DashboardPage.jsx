import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import HeaderComponent from "../../components/Common/Header";
import { getUserSubscriptionDetails } from "../../middleware/subscriptionMiddleware";
import DietitianCard from "../../components/DietitianCard/DietitianCard";
import DietitianSubscribers from "../../components/DashboardComponents/Dietitian/DietitianSubscribers/DietitianSubscribers";
import UserDashboardComponent from "../../components/DashboardComponents/User/UserDashboardComponent/UserDashboardComponent";
import ErrorComponent from "../../components/Common/Error/ErrorComponent";

const DashboardPage = () => {
  const { role } = useSelector((state) => state.auth.user);

  const isDietitian = role.includes("dietitian");
  const isUser = role.includes("user");

  return (
    <>
      <HeaderComponent />
      {isDietitian && <DietitianSubscribers />}
      {isUser && <UserDashboardComponent />}
    </>
  );
};

export default DashboardPage;
