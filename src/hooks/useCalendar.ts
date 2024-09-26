import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
  addWeeks,
} from "date-fns";
import { useState } from "react";

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );

  const startCurrentMonth = startOfMonth(currentDate);
  const endCurrentMonth = endOfMonth(currentDate);
  const startOfFirstWeek = startOfWeek(startCurrentMonth, { weekStartsOn: 0 });
  const endOfLastWeek = endOfWeek(endCurrentMonth, { weekStartsOn: 0 });

  const days = eachDayOfInterval({
    start: startOfFirstWeek,
    end: endOfLastWeek,
  });

  const startCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 0 });
  const endCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 0 });

  const daysInWeeks = eachDayOfInterval({
    start: startCurrentWeek,
    end: endCurrentWeek,
  }).map((day) => ({
    date: format(day, "yyyy-MM-dd"),
    year: format(day, "yyyy"),
    month: format(day, "MM"),
    day: format(day, "dd"),
    dayIndexOfWeek: getDay(day),
  }));

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  const handlePreWeeks = () => {
    setCurrentDate((prevDate) => subWeeks(prevDate, 1));
  };

  const handleNexTWeeks = () => {
    setCurrentDate((prevDate) => addWeeks(prevDate, 1));
  };

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
  };

  const daysInMonth = days.map((day) => ({
    date: format(day, "yyyy-MM-dd"),
    year: format(day, "yyyy"),
    month: format(day, "MM"),
    day: format(day, "dd"),
    dayIndexOfWeek: getDay(day),
  }));

  return {
    currentDate: {
      year: format(currentDate, "yyyy"),
      month: format(currentDate, "MM"),
      day: format(currentDate, "dd"),
    },
    daysInMonth,
    daysInWeeks,
    dispatch: {
      handlePrevMonth,
      handleNextMonth,
      handlePreWeeks,
      handleNexTWeeks,
    },
    selectedDate: {
      date: selectedDate,
      selectDate: handleSelectDate,
    },
  };
};

export default useCalendar;
