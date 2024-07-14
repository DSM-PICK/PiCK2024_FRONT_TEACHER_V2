import { useMutation } from "@tanstack/react-query";
import { ApplicaionList } from "./type";
import { instance } from "..";

const router = "/application";

export const ApplicationRequest = () => {
  return useMutation<ApplicaionList[], Error, { grade: number; class: number }>(
    {
      mutationFn: async (param) => {
        const { data } = await instance.get(
          `${router}/grade?grade=${param.grade}&class_num=${param.class}`
        );
        return data;
      },
    }
  );
};

export const ApplicationChange = () => {
  return useMutation<void, Error, { status: "OK" | "NO"; ids: string[] }>({
    mutationFn: async (param) => {
      await instance.patch(`${router}/status`, { ...param });
    },
  });
};

export const ApplicationList = () => {
  return useMutation<
    ApplicaionList[],
    Error,
    { floor: number; status: "QUITE" | "OK" | "NO" }
  >({
    mutationFn: async (param) => {
      const { data } = await instance.get(
        `${router}/floor?floor=${param.floor}&status=${param.status}`
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
