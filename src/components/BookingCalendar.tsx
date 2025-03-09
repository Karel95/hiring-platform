import React, { useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

interface BookingCalendarProps {
  unavailableDates: Date[];
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ unavailableDates }) => {
  const [date, setDate] = useState<Date | null>(new Date());

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(
      (unavailableDate) => format(unavailableDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

  return (
    <div className="flex flex-col items-center p-4 shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Select a date:</h2>
      <Calendar
        onChange={(selectedDate) => setDate(selectedDate as Date)}
        value={date}
        tileDisabled={({ date }) => isDateUnavailable(date)}
        className="rounded-lg shadow-md p-2"
      />
      {date && (
        <p className="mt-4 text-gray-700">
          Appointment: <strong>{format(date, "dd/MM/yyyy")}</strong>
        </p>
      )}
    </div>
  );
};

export default BookingCalendar;
