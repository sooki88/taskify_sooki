import { useRouter } from "next/router";
import { useEffect } from "react";
import LandingLayout from "@/layouts/landing";
import Content from "@/components/landing/Content";
import ScrollTopButton from "@/components/landing/ScrollTopButton";

export default function Landing() {
  const router = useRouter();

  useEffect(() => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");
    const accessTokenCookie = cookies.find((cookie) => cookie.trim().startsWith("accessToken="));

    if (accessTokenCookie) {
      router.push("/mydashboard");
    }
  }, []);

  return (
    <LandingLayout>
      <Content />
      <ScrollTopButton />
    </LandingLayout>
  );
}
