import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { cookie } from "@/utils/auth";
import { useState } from "react";

const BASEURL = import.meta.env.VITE_SERVER_BASE_URL;

export const instance: AxiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});

export const refreshInstance: AxiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});

interface RefreshResponseData {
  accessToken: string;
  refreshToken: string;
}

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const accessToken = cookie.get("access_token");
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

refreshInstance.interceptors.request.use(
  (config) => {
    const refreshToken = cookie.get("refresh_token");
    if (refreshToken) {
      config.headers.Authorization = `Bearer ${refreshToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (axios.isAxiosError(error) && error.response) {
      const { status } = error.response;
      if (status === 401) {
        const refreshToken = cookie.get("refresh_token");
        if (refreshToken) {
          try {
            await axios
              .put(`${BASEURL}/admin/refresh`, null, {
                headers: {
                  "X-Refresh-Token": `${refreshToken}`,
                },
              })
              .then((response) => {
                const data = response.data;
                cookie.set("access_token", data.access_token);
                cookie.set("refresh_token", data.refresh_token);
              });
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
      }
    }
    return Promise.reject(error);
  }
);
