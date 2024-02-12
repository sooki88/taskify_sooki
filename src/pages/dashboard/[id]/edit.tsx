import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { memberList } from "@/lib/services/members";
import { dashboard } from "@/lib/services/dashboards";
import { extractTokenFromCookie } from "@/lib/util/extractTokenFromCookie";
import { MemberApplicationServiceResponseDto } from "@/lib/services/members/schema";
import { DashboardApplicationServiceResponseDto, DashboardRequestDto } from "@/lib/services/dashboards/schema";
import { useDashboards } from "@/hooks/useDashboard";
import BoardLayout from "@/layouts/board";
import BackButton from "@/components/common/Button/BackButton";
import DeleteDashButton from "@/components/common/Button/DeleteDashButton";
import InviteListTable from "@/components/common/InviteListTable";
import MemberTable from "@/components/common/MemberTable";
import DashboardHeader from "@/components/common/DashboardHeader";
import DashboardEdit from "@/components/dashboard/DashboardEdit";

interface DashbordProps {
  members: MemberApplicationServiceResponseDto[];
}

interface DashboardContextType {
  dashboardData: DashboardApplicationServiceResponseDto;
  setDashboardData: (data: DashboardApplicationServiceResponseDto) => void;
  updateDashboardList: (data: DashboardRequestDto, id: number) => void;
}

export const EditDashboardContext = React.createContext<DashboardContextType>({
  dashboardData: {} as DashboardApplicationServiceResponseDto,
  setDashboardData: () => {},
  updateDashboardList: () => {},
});

export default function Edit({ members }: DashbordProps) {
  const [memberList, setMemberList] = useState(members);
  const [dashboardData, setDashboardData] = useState<DashboardApplicationServiceResponseDto>(
    {} as DashboardApplicationServiceResponseDto,
  );
  const router = useRouter();

  const { dashboardList, updateDashboardList } = useDashboards();
  const dashboardId = router.query.id;

  // 대시보드 삭제
  const handleDeleteDashboard = async () => {
    try {
      await dashboard("delete", Number(dashboardId));
      router.push("/mydashboard");
    } catch (error) {
      console.error("대시보드 삭제 실패:", error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const dashboardResponse = await dashboard("get", Number(dashboardId));
        setDashboardData(dashboardResponse?.data as DashboardApplicationServiceResponseDto);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [dashboardId]);

  const header = <DashboardHeader dashboardData={dashboardData} members={memberList} />;

  return (
    <EditDashboardContext.Provider value={{ dashboardData, setDashboardData, updateDashboardList }}>
      <Head>
        <title>{`${dashboardData.title} - 설정`}</title>
      </Head>
      <BoardLayout dashboardList={dashboardList} dashboardHeader={header}>
        <div className="px-12 pt-16 pb-56 tablet:px-20 tablet:pt-20 pc:w-620">
          <BackButton />
          <div className="flex flex-col gap-y-12 pt-21 pb-40 tablet:pb-48">
            <DashboardEdit
              dashboardData={dashboardData}
              setDashboardData={setDashboardData}
              updateDashboardList={updateDashboardList}
            />
            <MemberTable setMemberList={setMemberList} />
            <InviteListTable />
          </div>
          <DeleteDashButton onClick={() => handleDeleteDashboard()} />
        </div>
      </BoardLayout>
    </EditDashboardContext.Provider>
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
