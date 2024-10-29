import { useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { DetailStory, StoryProps } from "./type";

const router = "/story";

export const StoryAll = () => {
  return useQuery({
    queryKey: ["StoryAll"],
    queryFn: async () => {
      const { data } = await instance.get<StoryProps[]>(`${router}/all`);
      return data;
    },
  });
};

export const DetailList = (id: string) => {
  return useQuery({
    queryKey: ["DetailList"],
    queryFn: async () => {
      const { data } = await instance.get<DetailStory>(`${router}/query/${id}`);
      return data;
    },
  });
};
