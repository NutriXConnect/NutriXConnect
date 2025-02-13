import { useEffect, useState } from "react";
import HeaderComponent from "../../components/Common/Header";
import MealSectionComponent from "../../components/TrackingComponents/MealSectionComponent/MealSectionComponent";
import MonthlyCalendarComponent from "../../components/TrackingComponents/MonthlyCalendarComponent/MonthlyCalandarComponent";
import WeeklyProgressComponent from "../../components/TrackingComponents/WeeklyProgressComponent/WeeklyProgressComponent";
import { useDispatch, useSelector } from "react-redux";
import { getMealTrackingDetails } from "../../middleware/trackerMiddleware";
import LoadingOverlay from "../../components/Common/LoadingOverlay/LoadingOverlay";
import FloatingBar from "../../components/Common/FloatingInfoBar/FloatingBar";

const TrackPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();
  const { mealTracker, weeklyProgress, monthlyTracker, loading, error } =
    useSelector((state) => state.tracker);

  useEffect(() => {
    dispatch(getMealTrackingDetails(selectedDate));
  }, [dispatch, selectedDate]);

  if (loading) {
    return <LoadingOverlay message="Fetching details" />;
  }

  const handleDateChange = (date) => {
    console.log(date.toISOString());
    setSelectedDate(date);
  };

  return (
    <>
      <HeaderComponent />
      {mealTracker && (
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-3/4">
              {/* <WeeklyProgressComponent /> */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Today's Meal Plan</h2>
                {Object.values(mealTracker.mealPlans).map((meal, index) => (
                  <MealSectionComponent key={index} {...meal} />
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/4">
              <MonthlyCalendarComponent
                onDateChange={handleDateChange}
                currentDate={selectedDate}
              />
            </div>
          </div>
        </main>
      )}
      {error && (
        <FloatingBar
          isVisible={true}
          duration={0}
          type="error"
          message={error.message}
        />
      )}
    </>
  );
};

export default TrackPage;
