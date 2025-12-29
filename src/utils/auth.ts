import { Cookies } from "react-cookie";

export const cookie = new Cookies();

export const saveToken = (accessToken: string, refreshToken: string) => {
  const isDev = import.meta.env.DEV;
  const options = {
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
    sameSite: "lax" as const,
    secure: !isDev,
  };

  cookie.set("access_token", accessToken, options);
  cookie.set("refresh_token", refreshToken, options);
};
