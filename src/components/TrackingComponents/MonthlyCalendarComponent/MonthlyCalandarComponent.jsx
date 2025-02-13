import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const MonthlyCalendarComponent = ({ onDateChange, currentDate }) => {
  const [date, setDate] = useState(new Date());
  const handleDateChange = (selectedDate) => {
    const utcDate = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        0,
        0,
        0 // Setting time to 00:00 UTC
      )
    );
    setDate(utcDate);
    if (onDateChange) {
      onDateChange(utcDate);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">My Calendar</h1>
      <Calendar
        onChange={handleDateChange}
        value={new Date(currentDate)}
        className="react-calendar w-full border-none"
      />
    </div>
  );
};

export default MonthlyCalendarComponent;
