import Image from "next/image";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Layout({ children, isOpen, setIsOpen }: LayoutProps) {
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      onBlur={() => setIsOpen(false)}
      onClick={handleOpen}
      className={`relative flex items-center justify-between w-full px-16 bg-white border-solid py-11 h-42 rounded-6 border-1 tablet:h-48 cursor-pointer 
        ${isOpen ? "border-violet" : "border-gray-D9D9"}`}>
      {children}
      <Image src="/images/check.png" alt="arrowDown" width={26} height={26} />
    </div>
  );
}

export default Layout;
