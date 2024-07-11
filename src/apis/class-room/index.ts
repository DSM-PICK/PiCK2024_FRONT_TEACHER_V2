import { useMutation } from "@tanstack/react-query";
import { instance } from "..";
import { RequestClassRoomType, SubmitClassroom } from "./type";

const router = "/class-room";

export const RequestClassRoom = () => {
  return useMutation<
    RequestClassRoomType[],
    Error,
    { floor: number; status: "OK" | "QUIET" }
  >({
    mutationFn: async (param) => {
      const { data } = await instance.get(
        `${router}/floor?floor=${param.floor}&status=${param.status}`
      );
      return data;
    },
  });
};

export const AcceptClassroom = () => {
  return useMutation<void, Error, SubmitClassroom>({
    mutationFn: async (param) => {
      await instance.patch(`${router}/status`, {
        ...param,
      });
    },
  });
};
