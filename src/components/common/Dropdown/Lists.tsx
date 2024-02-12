import Image from "next/image";
import { ReactNode } from "react";

interface OptionProps {
  children: ReactNode;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
}

interface ListsProps {
  children: ReactNode;
}

function Option({ children, isSelected, onClick }: OptionProps) {
  return (
    <div
      className="flex gap-6 bg-white cursor-pointer options-center hover:bg-gray-EEEE rounded-4 py-5 h-38"
      onClick={(e) => onClick(e)}>
      <Image
        src={"/images/check.png"}
        alt="selected"
        width={22}
        height={22}
        className={isSelected ? "visible" : "invisible"}
      />
      {children}
    </div>
  );
}

function Lists({ children }: ListsProps) {
  return (
    <ul className="absolute left-0 flex flex-col w-full px-8 bg-white border-solid top-50 rounded-6 border-1 border-gray-D9D9 py-13 gap-13 z-dropdown">
      {children}
    </ul>
  );
}

export { Option, Lists };
