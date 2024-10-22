import { useMutation, useQuery } from "@tanstack/react-query";
import { AttendType } from "./type";
import { instance } from "..";

const router = "/attendance";

export const AttendanceCheck = (
  grade: number,
  class_num: number,
  period: number
) => {
  return useQuery({
    queryKey: ["AttendanceCheck", grade, class_num, period],
    queryFn: async () => {
      const { data } = await instance.get<AttendType[]>(
        `${router}/grade?grade=${grade}&class_num=${class_num}&period=${period}`
      );
      return data;
    },
  });
};
