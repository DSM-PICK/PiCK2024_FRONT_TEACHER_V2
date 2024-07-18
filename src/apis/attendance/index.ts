import { useMutation } from "@tanstack/react-query";
import { AttendType } from "./type";
import { instance } from "..";

const router = "/attendance";

export const AttendanceCheck = () => {
  return useMutation<AttendType[], Error, { grade: number; class_num: number }>(
    {
      mutationFn: async (param) => {
        const { data } = await instance.get(
          `${router}/grade?grade=${param.grade}&class_num=${param.class_num}`
        );
        return data;
      },
    }
  );
};
