import React from "react";
import { ChipAdd } from "../common/Chips";

interface AddTodoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick: () => void;
}

function AddDashBoardButton({ title, onClick }: AddTodoButtonProps) {
  return (
    <button
      className="flex items-center gap-12 justify-center border rounded-8 w-full border-gray-D9D9 bg-white text-black grow h-58 tablet:h-68 hover:border-violet"
      onClick={onClick}>
      <span className="text-14 tablet:text-16 font-bold">{title}</span>
      <ChipAdd />
    </button>
  );
}

export default AddDashBoardButton;
