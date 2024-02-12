import React from "react";

function DeleteDashButton({ onClick }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="flex items-center justify-center text-16 border-1 rounded-8 h-52 px-84 py-16 tablet:w-320 tablet:h-62 tablet:text-18 border-gray-D9D9"
      onClick={onClick}>
      <span className="text-16 tablet:text-18">대시보드 삭제하기</span>
    </button>
  );
}

export default DeleteDashButton;
