import { createContext } from "react";
import { useRouter } from "next/router";
import BackButton from "@/components/common/Button/BackButton";
import DeleteDashButton from "@/components/common/Button/DeleteDashButton";
import InviteListTable from "@/components/common/InviteListTable";
import MemberTable from "@/components/common/MemberTable";
import SideMenu from "@/components/common/SideMenu";
import DashboardHeader from "@/components/common/DashboardHeader";
import BoardLayout from "@/layouts/board";
import { dashboard } from "@/lib/services/dashboards";
import { MemberApplicationServiceResponseDto } from "@/lib/services/members/schema";
import { UpdateTriggerProvider } from "@/components/contexts/TriggerContext";
import { ColumnServiceResponseDto } from "@/lib/services/columns/schema";
import { useDashboardData } from "@/hooks/useDashboardData";
import DashboardEdit from "@/components/dashboard/DashboardEdit";

type DashboardProps = {
  members: MemberApplicationServiceResponseDto[];
  columns: ColumnServiceResponseDto[];
};

export const DashboardContext = createContext<DashboardProps>({
  members: [],
  columns: [],
});

export default function Edit({ members, columns }: DashboardProps) {
  const { dashboardData, dashboardList, myData } = useDashboardData();
  const { dashboards } = dashboardList;
  const router = useRouter();
  const dashboardId = router.query.id;

  // 대시보드 삭제
  const handleDeleteDashboard = async () => {
    try {
      await dashboard("delete", Number(dashboardId));
      router.push("/mydashboard"); // 대시보드 삭제 시 mydashboard 페이지로 이동
    } catch (error) {
      console.error("대시보드 삭제 실패:", error);
    }
  };

  return (
    <UpdateTriggerProvider>
      <DashboardContext.Provider value={{ members, columns }}>
        <BoardLayout
          sideMenu={<SideMenu dashboards={dashboards} />}
          dashboardHeader={<DashboardHeader myData={myData} dashboardData={dashboardData} members={members} />}>
          <div className="px-12 pt-16 tablet:px-20 tablet:pt-20 pc:w-620">
            <BackButton />
            <div className="flex flex-col gap-y-12 pt-21 pb-40 tablet:pb-48">
              <DashboardEdit />
              <MemberTable />
              <InviteListTable />
            </div>
            <DeleteDashButton onClick={() => handleDeleteDashboard()} />
          </div>
        </BoardLayout>
      </DashboardContext.Provider>
    </UpdateTriggerProvider>
  );
}
