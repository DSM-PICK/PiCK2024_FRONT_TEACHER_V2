import { useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { getFullToday } from "@/utils/date";
import { TodayMealsType } from "./type";

const router = "/meal";

export const TodayMeals = () => {
  return useQuery<TodayMealsType>({
    queryKey: ["todayMeals"],
    queryFn: async () => {
      const { data } = await instance.get(
        `${router}/date?date=${getFullToday()}`
      );
      return data;
    },
  });
};

export function useMonthMeals(date: string) {
  return useQuery<TodayMealsType>({
    queryKey: ["monthMeals", date],
    queryFn: async () => {
      const { data } = await instance.get(`${router}/date?date=${date}`);
      return data;
    },
  })
}