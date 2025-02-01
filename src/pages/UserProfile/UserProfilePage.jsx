import React, { useState } from "react";
import { User, Target, Package, ChevronDown } from "lucide-react";
import HeaderComponent from "../../components/Common/Header/HeaderComponent";
import { useSelector } from "react-redux";
import GoalsTab from "../../components/ProfileComponents/Goals/GoalsTab";
import OrdersTab from "../../components/ProfileComponents/Orders";
import InformationTab from "../../components/ProfileComponents/Information/InformationTab";
import FloatingBar from "../../components/Common/FloatingInfoBar/FloatingBar";

// Main Profile Page
const UserProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const { error } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("information");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabs = [
    {
      name: "information",
      label: "Your Information",
      icon: <User className="w-5 h-5" />,
    },
    {
      name: "goals",
      label: "Goals",
      icon: <Target className="w-5 h-5" />,
    },
    {
      name: "orders",
      label: "Orders",
      icon: <Package className="w-5 h-5" />,
    },
  ];

  return (
    <>
      <HeaderComponent />
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl overflow-hidden">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              {tabs.find((tab) => tab.name === activeTab)?.icon}
              <span>{tabs.find((tab) => tab.name === activeTab)?.label}</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 transform transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 w-[calc(100%-3rem)] bg-white rounded-lg shadow-lg mt-2">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => {
                    setActiveTab(tab.name);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2 p-4 hover:bg-gray-50 ${
                    activeTab === tab.name ? "bg-blue-50 text-blue-500" : ""
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex mb-6 bg-white rounded-lg shadow-md">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex-1 flex items-center justify-center p-4 space-x-2 ${
                activeTab === tab.name
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "information" && <InformationTab />}
        {activeTab === "goals" && <GoalsTab />}
        {activeTab === "orders" && <OrdersTab />}
      </div>
      {error && (
        <FloatingBar
          type="error"
          isVisible={true}
          message={error?.message}
          duration={0}
        />
      )}
    </>
  );
};

export default UserProfilePage;
