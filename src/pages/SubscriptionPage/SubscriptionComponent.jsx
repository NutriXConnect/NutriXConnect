import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  X,
  Plus,
  Clock,
  User,
  Calendar,
  Edit,
  BanIcon,
  ListIcon,
  PlusCircle,
} from "lucide-react";
import HeaderComponent from "../../components/Common/Header";
import {
  createDietPlan,
  getSubscriptionPageDetails,
  updateMeals,
  updateSubscriptionDates,
  updateSubscriptionStatus,
} from "../../middleware/subscriptionMiddleware";
import LoadingOverlay from "../../components/Common/LoadingOverlay";
import FloatingBar from "../../components/Common/FloatingInfoBar/FloatingBar";

const SubscriptionDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const [showMealForm, setShowMealForm] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [editStartDate, setEditStartDate] = useState(false);
  const [mealItems, setMealItems] = useState([]);
  const [mealForm, setMealForm] = useState({
    name: "",
    time: "",
    meals: [...mealItems],
  });

  const [mealItemsUpdated, setMealItemsUpdated] = useState(false);
  const dispatch = useDispatch();
  const { selectedSubscription, loading, infoMessage } = useSelector(
    (state) => state.subscription
  );
  const subscriptionId = searchParams.get("query");
  useEffect(() => {
    if (subscriptionId) {
      dispatch(getSubscriptionPageDetails(subscriptionId));
    }
  }, [dispatch, subscriptionId]);

  const calculateEndDate = () => {
    if (!startDate) return "";
    const start = new Date(startDate);
    start.setDate(start.getDate() + selectedSubscription.durationInMonths * 30);
    return start.toISOString().split("T")[0];
  };

  const handleStartDateChange = (e) => {
    setEditStartDate(false);
    dispatch(updateSubscriptionDates(e.target.value, selectedSubscription._id));
  };

  const handleAddItem = () => {
    setMealItems([
      ...mealItems,
      {
        name: "",
        quantity: "",
        unit: "g",
        calories: "",
        protein: "",
        fiber: "",
        fats: "",
      },
    ]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...mealItems];
    updatedItems[index][field] = value;
    setMealItems(updatedItems);
    setMealItemsUpdated(true);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = mealItems.filter((_, idx) => idx !== index);
    setMealItems(updatedItems);
  };

  const calculateBmiValue = () => {
    if (
      !selectedSubscription.user?.height ||
      !selectedSubscription.user?.weight
    ) {
      return "";
    }
    const heightInMeters = selectedSubscription.user.height / 100;
    return (
      Math.round(
        (selectedSubscription.user.weight / (heightInMeters * heightInMeters)) *
          100
      ) / 100
    ).toFixed(2);
  };

  const handleCreateDietPlan = (e) => {
    e.preventDefault();
    dispatch(
      createDietPlan(selectedSubscription.user._id, selectedSubscription._id)
    );
  };

  const handleMealChanges = (e) => {
    e.preventDefault();
    setMealForm((prevForm) => ({
      ...prevForm,
      meals: [...mealItems],
    }));
    dispatch(
      updateMeals(
        { ...mealForm, meals: [...mealItems] },
        selectedSubscription.dietPlan._id
      )
    );
  };

  const handleSubscriptionUpdateStatus = (e) => {
    e.preventDefault();
    return (e) => {
      dispatch(
        updateSubscriptionStatus(selectedSubscription._id, e.target.value)
      );
    };
  };

  if (loading || !selectedSubscription) {
    return <LoadingOverlay />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {infoMessage.length > 0 && (
        <FloatingBar message={infoMessage} duration={5000} isVisible={true} />
      )}
      <HeaderComponent />
      <main className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedSubscription.plan.name}
          </h1>

          <div className="space-y-8">
            {/* User Details Section */}
            <section className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <User className="h-5 w-5" />
                User Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: "Name", value: selectedSubscription.user?.name },
                  { label: "Email", value: selectedSubscription.user?.email },
                  { label: "Mobile", value: selectedSubscription.user?.mobile },
                  {
                    label: "Height",
                    value: `${selectedSubscription.user?.height} cm`,
                  },
                  {
                    label: "Weight",
                    value: `${selectedSubscription.user?.weight} kg`,
                  },
                  { label: "BMI", value: calculateBmiValue() },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg transition-all duration-200 hover:shadow-md"
                  >
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="font-medium text-gray-900">
                      {item.value || "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Subscription Details */}
            <section className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semi.target.valuebold mb-4 flex items-center gap-2 text-gray-800">
                <Calendar className="h-5 w-5" />
                Subscription Timeline
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Start Date</p>
                  <div className="flex justify-between">
                    <input
                      type="date"
                      value={
                        selectedSubscription.subscriptionStartDate
                          ? new Date(selectedSubscription.subscriptionStartDate)
                              .toISOString()
                              .split("T")[0] // Ensure YYYY-MM-DD format
                          : startDate
                      }
                      onChange={handleStartDateChange}
                      className="w-3/4 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
                      disabled={!editStartDate}
                    />
                    <button onClick={() => setEditStartDate((prev) => !prev)}>
                      {!editStartDate ? <Edit /> : <X />}
                    </button>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">End Date</p>
                  <div className="flex justify-between">
                    <input
                      type="date"
                      value={
                        selectedSubscription.subscriptionEndDate
                          ? new Date(selectedSubscription.subscriptionEndDate)
                              .toISOString()
                              .split("T")[0]
                          : calculateEndDate()
                      }
                      onChange={handleStartDateChange}
                      className="w-3/4 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
                      disabled={true}
                    />
                  </div>
                  <p className="font-medium text-gray-900">{}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <p className="font-medium text-gray-900">
                    {selectedSubscription.plan.price} INR
                  </p>
                </div>
              </div>
            </section>

            {/* Meal Plans */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <ListIcon className="h-5 w-5" />
                Diet Plan Details
              </h3>
              {!selectedSubscription?.dietPlan && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <p>No Diet plan created yet. Please create a new one.</p>
                  <button
                    onClick={handleCreateDietPlan}
                    className="bg-blue-50 text-blue-600 p-4 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 hover:shadow-md mt-2"
                  >
                    <Plus className="h-5 w-5" />
                    Create Plan
                  </button>
                </div>
              )}

              {selectedSubscription?.dietPlan && (
                <section className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                    <Clock className="h-5 w-5" />
                    Meal Plans
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedSubscription.dietPlan?.mealPlan.map(
                      (meal, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-lg transition-all duration-200 hover:shadow-md"
                        >
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-semibold text-gray-900">
                              {meal.name}
                            </h4>
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                              Edit
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {meal.time}
                          </p>
                          <ul className="space-y-1">
                            {meal.meals.map((item, idx) => (
                              <li key={idx} className="text-sm text-gray-700">
                                • {item.name} - {item.quantity} {item.unit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                    <button
                      onClick={() => setShowMealForm(!showMealForm)}
                      className="bg-blue-50 text-blue-600 p-4 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 hover:shadow-md"
                    >
                      <Plus className="h-5 w-5" />
                      Add Meal
                    </button>
                  </div>
                </section>
              )}

              {/* Add Meal Form */}
              {showMealForm && (
                <section className="bg-gray-50 rounded-lg p-6 transition-all duration-200">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Add/Update Meal
                  </h3>
                  <form className="space-y-6">
                    <div className="flex">
                      <div className="w-1/2 pr-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Meal Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={mealForm.name}
                          onChange={(e) =>
                            setMealForm({ ...mealForm, name: e.target.value })
                          }
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div className="w-1/2 pr-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Time
                        </label>
                        <input
                          type="time"
                          name="time"
                          value={mealForm.time}
                          onChange={(e) =>
                            setMealForm({ ...mealForm, time: e.target.value })
                          }
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-800">Meal Items</h4>
                      {mealItems.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-center bg-white p-4 rounded-lg"
                        >
                          <input
                            type="text"
                            placeholder="Item Name"
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={item.name}
                            onChange={(e) =>
                              handleItemChange(index, "name", e.target.value)
                            }
                          />
                          <input
                            type="number"
                            placeholder="Quantity"
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={item.quantity}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "quantity",
                                e.target.value
                              )
                            }
                          />
                          <select
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={item.unit}
                            onChange={(e) =>
                              handleItemChange(index, "unit", e.target.value)
                            }
                          >
                            <option value="pcs">pcs</option>
                            <option value="g">gms</option>
                            <option value="ml">ml</option>
                            <option value="cups">cups</option>
                            <option value="tbsp">tbsp</option>
                            <option value="tsp">tsp</option>
                            <option value="oz">oz</option>
                            <option value="lbs">lbs</option>
                          </select>
                          {["calories", "protein", "fiber", "fats"].map(
                            (field) => (
                              <input
                                key={field}
                                type="number"
                                placeholder={
                                  field.charAt(0).toUpperCase() + field.slice(1)
                                }
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) =>
                                  handleItemChange(index, field, e.target.value)
                                }
                              />
                            )
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(index)}
                            className="flex items-center justify-center p-2 text-gray-50 bg-red-400 hover:bg-red-500 rounded-md"
                          >
                            <BanIcon className="h-5 w-5 mr-2" /> Delete
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={handleAddItem}
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add Item
                      </button>
                    </div>

                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={() => setShowMealForm(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        onClick={handleMealChanges}
                      >
                        Save Meal
                      </button>
                    </div>
                  </form>
                </section>
              )}
              {/* Update Diet plan Status buttons */}
              <div className="flex justify-start gap-4">
                {selectedSubscription.status === "pending" && (
                  <button
                    onClick={handleSubscriptionUpdateStatus()}
                    className={`px-4 py-2 ${
                      selectedSubscription.status === "pending"
                        ? "bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        : "bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition-colors"
                    }`}
                    value="inprogress"
                  >
                    Activate
                  </button>
                )}
                {selectedSubscription.status === "inprogress" && (
                  <button
                    // onClick={handleSubscriptionUpdateStatus("completed")}
                    className={`px-4 py-2 ${
                      selectedSubscription.dietPlan.status === "active"
                        ? "bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        : "bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition-colors hover:cursor-not-allowed"
                    }`}
                    disabled={
                      selectedSubscription.subscriptionEndDate < Date.now()
                    }
                    value="completed"
                  >
                    End Subscription
                  </button>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubscriptionDetailsPage;
