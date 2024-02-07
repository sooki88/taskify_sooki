import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useToggle, useWindowSize } from "usehooks-ts";
import NewDashModal from "../modal/newDash";
import { DashboardApplicationServiceResponseDto } from "@/lib/services/comments/schema";

interface DashboardItemProps {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
  tabletOrLarge?: boolean;
}

interface SideMenuProps {
  dashboards?: any[];
}
// interface SideMenuProps {
//   dashboards?: DashboardItemProps[];
// }

// 사이드 메뉴 안에 있는 대시보드 버튼 하나
function DashboardItem({ id, title, createdByMe, color }: DashboardItemProps) {
  const { width } = useWindowSize();
  const tabletOrLarge = width >= 744;
  const router = useRouter();
  const dashboardColor = `bg-[${color.toLowerCase()}]`;

  const handleClick = (dashboarId: number) => {
    return router.push(`/dashboard/${dashboarId}`);
  };

  return (
    <div
      className="flex items-center justify-center gap-6 p-12 tablet:justify-start h-45 rounded-4 hover:bg-violet-F1EF text-gray-7874 hover:text-black-3332"
      onClick={() => handleClick(id)}>
      <p className={`flex-none size-8 ${dashboardColor} rounded-full tablet:mr-10 mr-0`} />
      {tabletOrLarge && (
        <div className="flex items-center justify-between w-full">
          <span className="font-medium pc:text-18 tablet:text-16 line-clamp-1">{title}</span>
          {createdByMe && (
            <div className="relative h-12 pc:h-14 pc:w-17 w-15 shrink-0">
              <Image
                fill
                src="/images/crown.png"
                alt="내가 만든 대시보드 표시 왕관 아이콘 이미지"
                sizes="(max-width: 744px) 100vw, (max-width: 1199px) 50vw, 25vw"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 사이드메뉴 전체
function SideMenu({ dashboards }: SideMenuProps) {
  const { width } = useWindowSize();
  const tabletOrLarge = width >= 744;
  const [newDashValue, newDashToggel, setNewDashValue] = useToggle();

  return (
    <>
      {newDashValue && <NewDashModal onClose={newDashToggel} />}
      <div className="fixed top-0 left-0 bottom-0 flex flex-col h-screen gap-3 px-12 py-20 bg-white pc:w-300 tablet:w-160 w-67 border-r-1 border-gray-D9D9 z-sticky">
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
        <div
          className="flex items-center justify-between pl-12 h-44 pc:pr-12 tablet:pr-8 shrink-0"
          onClick={() => setNewDashValue(true)}>
          <span className="font-semibold text-12 text-gray-7874 tablet:inline-block mobile:hidden">Dash Boards</span>
          <Image src="/images/add_box_gray.png" alt="대시보드 추가 버튼 이미지" width={20} height={20} />
        </div>
        {dashboards?.map((dashboard) => <DashboardItem key={dashboard.id} {...dashboard} />)}
      </div>
    </>
  );
}

export default SideMenu;
