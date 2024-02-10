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
import { ColumnServiceResponseDto } from "@/lib/services/columns/schema";
import { useDashboardData } from "@/hooks/useDashboardData";
import DashboardEdit from "@/components/dashboard/DashboardEdit";
import { memberList } from "@/lib/services/members";
import { extractTokenFromCookie } from "@/lib/util/extractTokenFromCookie";
import { GetServerSidePropsContext } from "next";
import { DashboardApplicationServiceResponseDto } from "@/lib/services/dashboards/schema";
import React, { useState } from "react";

type DashboardContextType = {
  members: MemberApplicationServiceResponseDto[];
  columns: ColumnServiceResponseDto[];
  dashboardData: DashboardApplicationServiceResponseDto;
  setDashboardData: (data: DashboardApplicationServiceResponseDto) => void;
  setDashboardList: any;
};

export const DashboardContext = React.createContext<DashboardContextType>({
  members: [],
  columns: [],
  dashboardData: {} as DashboardApplicationServiceResponseDto,
  setDashboardData: () => {},
  setDashboardList: () => {},
});

export default function Edit({ members, columns }: DashboardContextType) {
  const [memberList, setMemberList] = useState(members);
  const { dashboardData, dashboardList, setDashboardData, setDashboardList } = useDashboardData();
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
    <DashboardContext.Provider value={{ members, columns, dashboardData, setDashboardData, setDashboardList }}>
      <BoardLayout
        sideMenu={<SideMenu dashboards={dashboardList.dashboards} />}
        dashboardHeader={<DashboardHeader dashboardData={dashboardData} members={memberList} />}>
        <div className="px-12 pt-16 pb-56 tablet:px-20 tablet:pt-20 pc:w-620">
          <BackButton />
          <div className="flex flex-col gap-y-12 pt-21 pb-40 tablet:pb-48">
            <DashboardEdit />
            <MemberTable setMemberList={setMemberList} />
            <InviteListTable />
          </div>
          <DeleteDashButton onClick={() => handleDeleteDashboard()} />
        </div>
      </BoardLayout>
    </DashboardContext.Provider>
  );
}

// member 불러오기(리팩토링 때 수정)
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const dashboardId = Number(context.query.id);
  const cookieValue = context.req.headers.cookie || "";
  const token = extractTokenFromCookie(cookieValue);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data: members } = await memberList({ dashboardId }, config);

    return {
      props: {
        members: members?.members || [],
      },
    };
  } catch (error) {
    console.error("데이터를 불러오는 데 실패했습니다.", error);
    return {
      props: {
        members: [],
      },
    };
  }
}
