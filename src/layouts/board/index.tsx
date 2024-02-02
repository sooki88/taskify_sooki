import { ReactNode } from "react";

interface BoardLayoutProps {
  type: "myDashboard" | "default" | "editOrMypage";
  sideMenu: any;
  dashboardHeader: any;
  children: ReactNode;
}

function BoardLayout({ type, sideMenu, dashboardHeader, children }: BoardLayoutProps) {
  const PAGE_STYLE = {
    myDashboard: {
      padding: "pt-60 pl-91 pr-24 tablet:pt-70 tablet:pl-200 tablet:pr-40 pc:pl-340 pc:pr-40 pc:pt-70",
      size: "flex-col gap-24 tablet:gap-40 pc:gap-44 max-w-[1022px]",
    },
    default: {
      // dashboard/id 페이지
      padding: "pc:pt-70 pc:pl-300 tablet:pt-70 tablet:pl-0 pt-60 pl-67",
      size: "pc:flex-row flex-col",
    },
    editOrMypage: {
      // dashbaord/id/edit 또는 mypage 페이지
      padding: "tablet:pl-180 tablet:pr-20 tablet:pt-70 pl-79 pr-12 pt-60 pc:pl-320",
      size: "flex-col tablet:gap-12 gap-11 pc:w-620 tablet:w-544",
    },
  };

  const paddingClassName = PAGE_STYLE[type].padding;
  const sizeClassName = PAGE_STYLE[type].size;

  return (
    <div className={`bg-gray-FAFA min-h-screen ${paddingClassName}`}>
      {sideMenu}
      {dashboardHeader}
      <div className={`flex ${sizeClassName}`}>{children}</div>
    </div>
  );
}

export default BoardLayout;

{
  /* Page.tsx에서 사용 샘플 코드
    export default function myDashboard () {
      const sideMenu = <SideMenu deashboards={deashboards} />
      const header = <DashboardHeader myData={myData} dashboadData={dashboadData} members={members} />

      return (
        <BoardLayout type="myDashboard" sideMenu={sideMenu} dashboardHeader={header}>
          children 넣는 곳
        </BoardLayout>
      )
    }
 */
}
