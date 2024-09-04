export interface TodayMealsType {
  date: string;
  meals: {
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
