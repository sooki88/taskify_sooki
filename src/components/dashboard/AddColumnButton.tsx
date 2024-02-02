import React from "react";
import { ChipAdd } from "../common/Chips";

function AddColumnButton({ onClick }: React.BaseHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="flex items-center justify-center w-full h-32 gap-12 bg-white border-1 rounded-6 tablet:h-40 border-gray-D9D9"
      onClick={onClick}>
      <ChipAdd />
    </button>
  );
}

export default AddColumnButton;
