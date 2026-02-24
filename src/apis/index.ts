import { cookie, saveToken } from "@/utils/auth";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const BASEURL = import.meta.env.VITE_SERVER_BASE_URL;

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

const removeToken = () => {
  cookie.remove(ACCESS_TOKEN);
  cookie.remove(REFRESH_TOKEN);
};

export const instance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const accessToken = cookie.get(ACCESS_TOKEN);
      const refreshToken = cookie.get(REFRESH_TOKEN);
      if (!refreshToken) {
        removeToken();
        toast.error("다시 로그인해주세요");
        window.location.href = "/";
        return Promise.reject(new Error("No refresh token"));
      }
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (axios.isAxiosError(error)) {
      const status = (error?.response?.data as any).status;
      const originalRequest = error.config as typeof error.config & {
        _retry?: boolean;
      };

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = cookie.get(REFRESH_TOKEN);
        try {
          const response = await axios.put(`${BASEURL}/admin/refresh`, null, {
            headers: {
              "X-Refresh-Token": `${refreshToken}`,
            },
          });
          const data = response.data;
          saveToken(data.access_token, data.refresh_token);

          if (originalRequest) {
            originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
            return instance(originalRequest);
          }
        } catch (refreshError) {
          removeToken();
          window.location.href = "/";
          return Promise.reject(refreshError);
        }
      } else {
        const errorMessage = (error.response?.data as any)?.message;
        if (errorMessage) toast.error(errorMessage);
      }
    }
    return Promise.reject(error);
  },
);
