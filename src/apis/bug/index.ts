import { instance } from "..";
import { useMutation } from "@tanstack/react-query";
import { BugProp } from "./type";
import { toast } from "react-toastify";

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

export const BugPost = () => {
  return useMutation({
    mutationFn: async (param: BugProp) => {
      await instance.post(`/bug/message`, {
        ...param,
        model: "TEACHER",
      });
    },
    onSuccess: () => {
      toast.success("버그제보가 완료되었습니다!");
    },
    onError: () => {
      toast.error("버그제보에 실패하였습니다. 잠시후 다시 시도해 주세요");
    },
  });
};
