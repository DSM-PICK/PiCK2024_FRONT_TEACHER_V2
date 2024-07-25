import useCalendarContext from "./useCalendarContext";

const SelectedDate = () => {
  const { selectedDate } = useCalendarContext();
  return <div>{selectedDate.date}</div>;
};

export default SelectedDate;
