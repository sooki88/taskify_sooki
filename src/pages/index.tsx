import LandingLayout from "@/layouts/landing";
import Content from "@/components/landing/Content";
import ScrollTopButton from "@/components/landing/ScrollTopButton";

export default function Landing() {
  return (
    <LandingLayout>
      <Content />
      <ScrollTopButton />
    </LandingLayout>
  );
}
