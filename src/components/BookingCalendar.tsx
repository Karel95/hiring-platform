import React, { useState } from "react";
import Calendar from "react-calendar";
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
      <Calendar
        onChange={(selectedDate) => setDate(selectedDate as Date)}
        value={date}
        tileDisabled={({ date }) => isDateUnavailable(date)}
        tileClassName={({ date }) =>
          isDateUnavailable(date) ? "unavailable-day" : ""
        }
        className="rounded-lg shadow-md p-2"
      />
      {date && (
        <p className="mt-4 text-white">
          Appointment: <strong>{format(date, "dd/MM/yyyy")}</strong>
        </p>
      )}
      <style>
        {`
          .unavailable-day {
            background-color: #ffcccc !important;
            color: #ff0000 !important;
            text-decoration: line-through;
          }
        `}
      </style>
    </div>
  );
};

export default BookingCalendar;