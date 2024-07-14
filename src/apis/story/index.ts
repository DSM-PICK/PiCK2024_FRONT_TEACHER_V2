import { useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { DetailStory, StoryProps } from "./type";

const router = "/story";

export const StoryAll = () => {
  return useQuery<StoryProps[]>({
    queryKey: ["StoryAll"],
    queryFn: async () => {
      const { data } = await instance.get(`${router}/all`);
      return data;
    },
  });
};

export const DetailList = (id: string) => {
  return useQuery<DetailStory>({
    queryKey: ["DetailList"],
    queryFn: async () => {
      const { data } = await instance.get(`${router}/query/${id}`);
      return data;
    },
  });
};
