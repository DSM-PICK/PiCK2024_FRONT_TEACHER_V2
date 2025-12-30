import { Cookies } from "react-cookie";

export const cookie = new Cookies();

export const saveToken = (accessToken: string, refreshToken: string) => {
  const isDev = import.meta.env.DEV;
  const baseOptions = {
    path: "/",
    sameSite: "lax" as const,
    secure: !isDev,
  };

  const accessOptions = {
    ...baseOptions,
    maxAge: 60 * 60 * 24 * 150,
  };
  const refreshOptions = {
    ...baseOptions,
    maxAge: 60 * 60 * 24 * 180,
  };

  cookie.set("access_token", accessToken, accessOptions);
  cookie.set("refresh_token", refreshToken, refreshOptions);
};
