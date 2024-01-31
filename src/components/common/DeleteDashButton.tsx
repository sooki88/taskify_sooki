import React from "react";

function DeleteDashButton({ onClick }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="flex items-center gap-12 justify-center border-1 rounded-8 h-52 tablet:h-62 w-full border-gray-D9D9"
      onClick={onClick}>
      <span className="text-16 tablet:text-18">대시보드 삭제하기</span>
    </button>
  );
}

export default DeleteDashButton;
