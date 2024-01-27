import check from "../../../../public/images/check.png";
import Image from "next/image";
import { ReactNode } from "react";
import { TitleOption, MembersOption } from ".";

function Option({ option, children, selectedOption, handleChange, handleProfileChange }: OptionProps) {
  const value = "title" in option ? option.title : option.userId;
  const handleClick = () => {
    handleChange(value);
    handleProfileChange && handleProfileChange(option as MembersOption);
  };

  return (
    <li
      className="flex gap-6 bg-white cursor-pointer options-center hover:bg-gray-EEEE rounded-4 py-5"
      value={value}
      onClick={handleClick}>
      <Image
        src={check}
        alt="selected"
        width={22}
        height={22}
        className={`${selectedOption === value ? "visible" : "invisible"}`}
      />
      {children}
    </li>
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

interface ListsProps {
  children: ReactNode;
}

interface OptionProps {
  option: TitleOption | MembersOption;
  children: ReactNode;
  selectedOption: TitleOption | number;
  handleChange: (value: string | number) => void;
  handleProfileChange?: (option: MembersOption) => void;
}
