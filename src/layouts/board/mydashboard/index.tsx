import { ReactNode } from "react";

interface MyDashboardLayout {
  children: ReactNode;
}

export default function MyDashboardLayout({ children }: MyDashboardLayout) {
  return (
    <>
      <div className="flex flex-col gap-40 mx-24 tablet:mx-40 tablet:gap-44 my-24 tablet:my-40">{children}</div>
    </>
  );
}
