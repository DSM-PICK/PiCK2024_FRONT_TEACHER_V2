export interface TodayMealsType {
  date: string;
  meal_list: {
    breakfast: {
      cal: string;
      menu: string[];
    };
    lunch: {
      cal: string;
      menu: string[];
    };
    dinner: {
      cal: string;
      menu: string[];
    };
  };
}
