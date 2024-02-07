import { ReactNode, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Contents from "./Contents";
import { useRouter } from "next/router";
import { me } from "@/lib/services/users";

export interface PopoverContent {
  title: string;
  onClick: () => void;
}

interface PopoverProps {
  children: ReactNode;
  cardId?: number;
}

function ProfilePopover({ children }: PopoverProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const goToMyPage = () => {
    router.replace("/mypage");
  };

  const goToMyDashboard = () => {
    router.replace("/mydashboard");
  };

  const logout = () => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/");
  };

  const MODAL_POPOVER = [
    {
      title: "내 정보",
      onClick: goToMyPage,
    },
    {
      title: "내 대시보드",
      onClick: goToMyDashboard,
    },
    {
      title: "로그아웃",
      onClick: logout,
    },
  ];

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
    <div className="relative flex items-center" ref={popoverRef}>
      <button type="button" onClick={handlePopoverOpen}>
        {children}
      </button>
      {popoverOpen && <Contents contents={MODAL_POPOVER} />}
    </div>
  );
}

export default ProfilePopover;
