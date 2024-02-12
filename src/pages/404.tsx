// pages/404.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");
    const accessTokenCookie = cookies.find((cookie) => cookie.trim().startsWith("accessToken="));

    if (accessTokenCookie) {
      alert("존재하지 않는 페이지 입니다.");
      router.push("/mydashboard");
      return;
    }
    router.replace("/");
  }, [router]);

  return null;
};

export default RedirectPage;
