import React from "react";
import { ChipAdd } from "./Chips";

function AddColumnButton({ onClick }: React.BaseHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="flex items-center gap-12 justify-center border-1 rounded-8 h-32 tablet:h-40 w-full border-gray-D9D9"
      onClick={onClick}>
      <ChipAdd />
    </button>
  );
}

export default AddColumnButton;
