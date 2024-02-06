import { ReactNode } from "react";

interface MyDashboardLayout {
  children: ReactNode;
}

export default function MyDashboardLayout({ children }: MyDashboardLayout) {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-40 mr-24 tablet:mr-40 tablet:gap-44 mt-24 tablet:mt-40">{children}</div>
    </div>
  );
}
