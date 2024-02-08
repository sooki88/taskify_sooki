import { ReactNode } from "react";

interface BoardLayoutProps {
  sideMenu: any;
  dashboardHeader: any;
  children: ReactNode;
}

function BoardLayout({ sideMenu, dashboardHeader, children }: BoardLayoutProps) {
  return (
    <div className="grid grid-rows-[60px_1fr] tablet:grid-rows-[70px_1fr] grid-cols-[67px_minmax(auto,_1fr)] tablet:grid-cols-[160px_minmax(auto,_1fr)] pc:grid-cols-[300px_minmax(auto,_1fr)] min-h-screen bg-gray-FAFA">
      <div className="row-span-2">{sideMenu}</div>
      <div className="col-span-1">{dashboardHeader}</div>
      <div className="col-span-1 overflow-auto h-[calc(100vh-7rem)]">{children}</div>
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
