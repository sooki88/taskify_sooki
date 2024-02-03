import React from "react";
import { ChipAdd } from "../Chips";

function AddTodoButton({ onClick }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="flex items-center gap-12 justify-center border-1 rounded-8 h-60 tablet:h-70 w-full border-gray-D9D9"
      onClick={onClick}>
      <span className="text-16 tablet:text-18 font-bold">새로운 컬럼 추가하기</span>
      <ChipAdd />
    </button>
  );
}

export default AddTodoButton;
