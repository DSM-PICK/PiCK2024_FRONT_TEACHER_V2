import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { RequestClassRoomType, SubmitClassroom } from "./type";

const router = "/class-room";

export const RequestClassRoom = (floor: number, status: "OK" | "QUIET") => {
  return useQuery({
    queryKey: ["RequestClassRoom"],
    queryFn: async () => {
      const { data } = await instance.get<RequestClassRoomType[]>(
        `${router}/floor?floor=${floor}&status=${status}`
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
