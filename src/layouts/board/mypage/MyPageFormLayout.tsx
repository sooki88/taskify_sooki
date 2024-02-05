import { ReactNode } from "react";

interface MyPageFormLayoutProps {
  title: string;
  children: ReactNode;
}

function MyPageFormLayout({ title, children }: MyPageFormLayoutProps) {
  return (
    <div className="flex flex-col gap-16 px-20 pb-20 bg-white pt-28 tablet:px-28 tablet:pt-32 tablet:pb-28 rounded-8 pc:w-620 tablet:w-544 tablet:gap-20">
      <h3 className="h-24 mb-8 font-bold text-20 tablet:text-24 text-black-3332 tablet:h-29 tablet:mb-12">{title}</h3>
      {children}
    </div>
  );
}

export default MyPageFormLayout;
