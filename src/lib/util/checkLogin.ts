import { NextRouter } from "next/router";

export const checkLogin = (router: NextRouter) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split(";");
  const accessTokenCookie = cookies.find((cookie) => cookie.trim().startsWith("accessToken="));

  if (!accessTokenCookie) {
    alert("로그인이 필요합니다.");
    router.push("/login");
    return false;
  }
  return true;
};
