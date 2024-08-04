import { instance } from "..";
import { useMutation, MutateOptions } from "@tanstack/react-query";
import { BugProp } from "./type";

export const BugImg = () => {
  return useMutation<string[], Error, { file: File[] }>({
    mutationFn: async (param) => {
      try {
        const formData = new FormData();
        param.file.forEach((file) => {
          formData.append("file", file);
        });
        const result = await instance.post(`/bug/upload`, formData);
        return result.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const BugPost = (param: BugProp, option: MutateOptions) => {
  return useMutation({
    ...option,
    mutationFn: async () => {
      try {
        await instance.post(`/bug/message`, {
          ...param,
          model: "WEB",
        });
      } catch (error) {
        throw error;
      }
    },
  });
};
