import { useMutation, useQuery } from "@tanstack/react-query";
import { selectSelfStudTeacher, todaySelfStudTeacher } from "./type";
import { instance } from "..";
import { getFullToday } from "@/utils/date";

const router = "/self-study";

export const TodaySelfStudyList = () => {
  return useQuery<todaySelfStudTeacher[]>({
    queryKey: ["todaySelfStudTeacher"],
    queryFn: async () => {
      const { data } = await instance.get(
        `${router}/today?date=${getFullToday()}`
      );
      return data;
    },
  });
};

export const useSelectDaySelfStudyList = (date: string) => {
  return useQuery({
    queryKey: ["useSelectDaySelfStudyList", date],
    queryFn: async () => {
      const { data } = await instance.get<selectSelfStudTeacher[]>(
        `${router}/today?date=${date}`
      );
      return data;
    },
  });
};
