import { MouseEventHandler } from "react";
import Image from "next/image";

interface ScrollButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function LeftScrollButton({ onClick }: ScrollButtonProps) {
  return (
    <button
      className="pc:absolute pc:top-[50%] pc:left-310 opacity-40 pc:flex pc:justify-center pc:items-center w-40 h-40 rounded-20 bg-white border border-gray-9FA6 hover:opacity-100"
      onClick={onClick}>
      <Image src="/images/arrow_left.png" alt="arrow left" width={10} height={10} />
    </button>
  );
}

export function RightScrollButton({ onClick }: ScrollButtonProps) {
  return (
    <button
      className="pc:absolute  pc:top-[50%]  pc:right-20 opacity-40 pc:flex pc:justify-center pc:items-center w-[40px] h-[40px] rounded-20 bg-white border border-gray-9FA6 hover:opacity-100"
      onClick={onClick}>
      <Image src="/images/arrow_right.png" alt="arrow right" width={10} height={10} />
    </button>
  );
}
