import { useMutation, useQuery } from "@tanstack/react-query";
import { ApplicationListType } from "./type";
import { instance } from "..";

const router = "/application";

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

export const outList = (
  floor: number,
  status: string,
  type: "application" | "early-return"
) => {
  return useQuery({
    queryKey: ["ApplicationList", floor, status, type],
    queryFn: async () => {
      const { data } = await instance.get<ApplicationListType[]>(
        `${type}/floor?floor=${floor}&status=${status}`
      );
      return data;
    },
  });
};

export const ReturnSchool = () => {
  return useMutation<void, Error, string[]>({
    mutationFn: async (param: string[]) => {
      await instance.patch(`${router}/return`, param);
    },
  });
};
