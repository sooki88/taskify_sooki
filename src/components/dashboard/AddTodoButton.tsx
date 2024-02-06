import React from "react";
import { ChipAdd } from "../common/Chips";

interface AddTodoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick: () => void;
}

function AddTodoButton({ title, onClick }: AddTodoButtonProps) {
  return (
    <button
      className={`flex items-center gap-12 justify-center border rounded-8 w-full border-gray-D9D9 ${
        title === "새로운 대시보드"
          ? "bg-white text-black grow h-58 tablet:h-68 hover:border-violet"
          : "h-60 tablet:h-70"
      }`}
      onClick={onClick}>
      <span
        className={`${title === "새로운 대시보드" ? "text-14 tablet:text-16" : "text-16 tablet:text-18"} font-bold`}>
        {title}
      </span>
      <ChipAdd />
    </button>
  );
}

export default AddTodoButton;
