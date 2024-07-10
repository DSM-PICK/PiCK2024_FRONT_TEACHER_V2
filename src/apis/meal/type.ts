export interface TodayMealsType {
  date: string;
  meals: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
  };
}
