import { useQuery } from "@tanstack/react-query";
import { SelfStudTeacher } from "./type";
import { instance } from "..";
import { getFullToday } from "@/utils/date";

const router = "/self-study";

export const TodaySelfStudyList = () => {
  return useQuery<SelfStudTeacher[]>({
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
      const { data } = await instance.get<SelfStudTeacher[]>(
        `${router}/today?date=${date}`
      );
      return data;
    },
  });
};

export const useCheckToday = () => {
  return useQuery({
    queryKey: ["useCheck"],
    queryFn: async () => {
      const { data } = await instance.get<string>(`${router}/admin`);
      return data;
    },
  });
};
