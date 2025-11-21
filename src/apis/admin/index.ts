import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { instance } from "..";
import { useState } from "react";
import { cookie } from "@/utils/auth";
import useHomeRoomInformation from "@/stores/hoomroom";
import { toast } from "react-toastify";

const router = "/admin";

interface Login {
  admin_id: string;
  password: string;
  device_token: string;
}

interface Token {
  access_token: string;
  refresh_token: string;
}

export interface Signup {
  account_id: string;
  password: string;
  name: string;
  grade: number;
  class_num: number;
  code: string;
  secret_key: string;
}

const BASEURL = import.meta.env.VITE_SERVER_BASE_URL;

export const useLogin = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  alert("로그인 api 로직 시작"); //테스트

  const loginMutation = useMutation<Token, Error, Login>({
    mutationFn: (param: Login) => {
      return axios
        .post<Token>(`${BASEURL}${router}/login`, {
          ...param,
        })
        .then((response) => {
          const data = response.data;
          setAccessToken(data.access_token);
          setRefreshToken(data.refresh_token);
          alert("로그인 api 성공"); //테스트
          return data;
        })
        .catch((error) => {
          const errorMessage = (error.response?.data as any)?.message;
          if (errorMessage) toast.error(errorMessage);
          alert("로그인 api 실패"); //테스트
          throw error;
        });
    },
  });

  if (loginMutation.isError) {
    cookie.remove("access_token");
    cookie.remove("refresh_token");
    cookie.remove("part");
    console.error(loginMutation);
  }

  return {
    mutate: loginMutation.mutate,
    accessToken,
    refreshToken,
  };
};

export const useSignup = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const signupMutation = useMutation<Token, Error, Signup>({
    mutationFn: (param: Signup) => {
      return axios
        .post<Token>(`${BASEURL}${router}/signup`, {
          ...param,
        })
        .then((response) => {
          const data = response.data;
          setAccessToken(data.access_token);
          setRefreshToken(data.refresh_token);
          cookie.set("access_token", data.access_token);
          cookie.set("refresh_token", data.refresh_token);
          return data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });

  if (signupMutation.isError) {
    cookie.remove("access_token");
    cookie.remove("refresh_token");
    cookie.remove("part");
    console.error(signupMutation.error);
  }

  return {
    mutate: signupMutation.mutate,
    accessToken,
    refreshToken,
  };
};

export const useGetTeacherinfo = () => {
  const { teacherInfo } = useHomeRoomInformation();
  return useQuery({
    queryKey: ["teachername"],
    queryFn: async () => {
      const { data } = await instance.get(`${router}/my-name`);
      return data;
    },
    enabled: !teacherInfo,
  });
};
