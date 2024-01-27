import { ReactNode, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Contents from "./Contents";

export interface PopoverContent {
  title: string;
  onClick: () => void;
}

interface PopoverProps {
  children: ReactNode;
  contents: PopoverContent[];
}

function Popover({ children, contents }: PopoverProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handlePopoverOpen = () => {
    setPopoverOpen((prev) => !prev);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (popoverOpen && popoverRef.current && !popoverRef.current.contains(e.target as ChildNode)) {
      setPopoverOpen(false);
    }
  };
  useOnClickOutside(popoverRef, handleOutsideClick);

  return (
    <div className="relative" ref={popoverRef}>
      <button type="button" onClick={handlePopoverOpen}>
        {children}
      </button>
      {popoverOpen && <Contents contents={contents} />}
    </div>
  );
}

export default Popover;
