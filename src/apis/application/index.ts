import { useMutation, useQuery } from "@tanstack/react-query";
import { ApplicaionList } from "./type";
import { instance } from "..";

const router = "/application";

export const useApplicationRequest = (grade: number, class_num: number) => {
  return useQuery({
    queryKey: ["ApplicationRequest", grade, class_num],
    queryFn: async () => {
      const { data } = await instance.get<ApplicaionList[]>(
        `${router}/grade?grade=${grade}&class_num=${class_num}`
      );
      return data;
    },
  });
};

export const ApplicationChange = () => {
  return useMutation<void, Error, { status: "OK" | "NO"; ids: string[] }>({
    mutationFn: async (param) => {
      await instance.patch(`${router}/status`, { ...param });
    },
  });
};

export const ApplicationList = (floor: number, status: string) => {
  return useQuery({
    queryKey: ["ApplicationList", floor, status],
    queryFn: async () => {
      const { data } = await instance.get<ApplicaionList[]>(
        `${router}/floor?floor=${floor}&status=${status}`
      );
      return data;
    },
  });
};

export const ReturnSchool = () => {
  return useMutation<void, Error, string[]>({
    mutationFn: async (...param) => {
      await instance.patch(`${router}/return`, ...param, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  });
};
