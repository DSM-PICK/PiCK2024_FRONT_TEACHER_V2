import { createContext, useContext } from "react";

interface DateInfo {
  year: string;
  month: string;
  day: string;
}
interface CalendarContextType {
  currentDate: DateInfo;
  daysInMonth: (DateInfo & { date: string; dayIndexOfWeek: number })[];
  daysInWeeks: (DateInfo & { date: string; dayIndexIfWeek: number })[];
  dispatch: {
    handlePrevMonth: () => void;
    handleNextMonth: () => void;
    handlePreWeeks: () => void;
    handleNextWeeks: () => void;
  };
  selectedDate: {
    date: string;
    selectDate: (date: string) => void;
  };
}

export const CalendarContext = createContext<CalendarContextType | null>(null);

export default function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendarContext must be used within CalendarProvider");
  }
  return context;
}
