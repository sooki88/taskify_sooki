import { useRouter } from "next/router";
import { useEffect } from "react";
import LandingLayout from "@/layouts/landing";
import Content from "@/components/landing/Content";
import ScrollTopButton from "@/components/landing/ScrollTopButton";

export default function Landing() {
  const router = useRouter();

  useEffect(() => {
    const isLogIn = localStorage.getItem("accessToken") !== null;

    if (isLogIn) {
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
