import { useMutation, useQuery } from "@tanstack/react-query";
import { ApplicationListType, EarlyReturnType } from "./type";
import { instance } from "..";

const router = "/application";
const erouter = "/early-return";

export const useApplicationRequest = (
  grade: number,
  class_num: number,
  type: "application" | "early-return"
) => {
  return useQuery({
    queryKey: ["ApplicationRequest", grade, class_num, type],
    queryFn: async () => {
      const { data } = await instance.get<ApplicationListType[]>(
        `${type}/grade?grade=${grade}&class_num=${class_num}`
      );
      return data;
    },
  });
};

export const ApplicationChange = () => {
  return useMutation<
    void,
    Error,
    { status: "OK" | "NO"; ids: string[]; type: "application" | "early-return" }
  >({
    mutationFn: async (param) => {
      await instance.patch(`${param.type}/status`, {
        status: param.status,
        id_list: param.ids,
      });
    },
  });
};

export const ApplicationList = (floor: number, status: string) => {
  return useQuery({
    queryKey: ["ApplicationList", floor, status],
    queryFn: async () => {
      const { data } = await instance.get<ApplicationListType[]>(
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

export const useGetEarlyReturnList = () => {
  return useQuery({
    queryKey: ["EarlyReturnList"],
    queryFn: async () => {
      const { data } = await instance.get<EarlyReturnType[]>(`${erouter}/ok`);
      return data;
    },
  });
};
