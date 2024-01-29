import { getWindowSize } from "@/lib/util/getWindowSize";
import Image from "next/image";
import Link from "next/link";

interface DashboardItemProps {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
  onClick?: (id: number) => void;
  tabletOrLarge: boolean;
}

interface SideMenuProps {
  dashboards: DashboardItemProps[];
  onClick: (id: number) => void;
}

// 사이드 메뉴 안에 있는 대시보드 버튼 하나
function DashboardItem({ id, title, createdByMe, color, onClick, tabletOrLarge }: DashboardItemProps) {
  const dashboardColor = `bg-[${color}]`;

  return (
    <div
      className="flex items-center justify-center gap-6 p-12 tablet:justify-start h-45 rounded-4 hover:bg-violet-F1EF text-gray-7874 hover:text-black-3332"
      onClick={() => onClick?.(id)}>
      <p className={`flex-none size-8 ${dashboardColor} rounded-full tablet:mr-10 mr-0`} />
      {tabletOrLarge && (
        <>
          <span className="font-medium pc:text-18 tablet:text-16 line-clamp-1">{title}</span>
          {createdByMe && (
            <div className="relative h-12 pc:h-14 pc:w-17 w-15 shrink-0">
              <Image fill src="/images/crown.png" alt="내가 만든 대시보드 표시 왕관 아이콘 이미지" />
            </div>
          )}
        </>
      )}
    </div>
  );
}

// 사이드메뉴 전체
function SideMenu({ dashboards, onClick }: SideMenuProps) {
  // 윈도우 화면 가로 사이즈 가져오기
  const { width } = getWindowSize();
  const tabletOrLarge = width >= 744;

  return (
    <div className="fixed top-0 left-0 flex flex-col h-screen gap-3 px-12 py-20 bg-white pc:w-300 tablet:w-160 w-67 border-r-1 border-gray-D9D9 z-sticky">
      <Link href="/">
        <div className="relative ml-12 tablet:w-109 tablet:h-33 w-23 h-27 tablet:mb-42 mb-27">
          <Image
            fill
            src={tabletOrLarge ? "/images/logo_large.png" : "/images/logo.png"}
            sizes="(min-width: 744px) 100vw, 743px"
            alt="로고 이미지"
            placeholder="blur"
            blurDataURL={"/images/logo_large.png"}
          />
        </div>
      </Link>
      <div className="flex items-center justify-between pl-12 h-44 pc:pr-12 tablet:pr-8">
        <span className="font-semibold text-12 text-gray-7874 tablet:inline-block mobile:hidden">Dash Boards</span>
        <Image src="/images/add_box.png" alt="대시보드 추가 버튼 이미지" width={20} height={20} />
      </div>
      {dashboards?.map((dashboard) => (
        <DashboardItem
          key={dashboard.id}
          {...dashboard}
          onClick={() => onClick(dashboard.id)}
          tabletOrLarge={tabletOrLarge}
        />
      ))}
    </div>
  );
}

export default SideMenu;
