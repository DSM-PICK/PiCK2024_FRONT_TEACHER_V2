import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { instance } from "..";
import { useState } from "react";
import { cookie } from "@/utils/auth";
import useHomeRoomInformation from "@/stores/hoomroom";

const router = "/admin";

interface Login {
  admin_id: string;
  password: string;
}

interface Token {
  access_token: string;
  refresh_token: string;
}

export const useLogin = () => {
  const BASEURL = process.env.VITE_SERVER_BASE_URL

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

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
          return data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });

  if (loginMutation.isError) {
    ("access_token");
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
