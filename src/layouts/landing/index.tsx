import { ReactNode } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-16 tablet:mx-40 pc:mx-200 mt-112 mb:120 tablet:mt-94 tablet:mb-160">{children}</div>
      <Footer />
    </div>
  );
}
