import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import { ColumnServiceResponseDto } from "@/lib/services/columns/schema";
import { extractTokenFromCookie } from "@/lib/util/extractTokenFromCookie";
import { findColumns } from "@/lib/services/columns";
import { memberList } from "@/lib/services/members";
import { MemberApplicationServiceResponseDto } from "@/lib/services/members/schema";
import Column from "@/components/dashboard/Column";
import { UpdateTriggerProvider } from "@/components/contexts/TriggerContext";
import { createContext } from "react";
import SideMenu from "@/components/common/SideMenu";
import DashboardHeader from "@/components/common/DashboardHeader";
import BoardLayout from "@/layouts/board";
import AddColumnButton from "@/components/dashboard/AddColumnButton";
import { dashboard, findDashboard } from "@/lib/services/dashboards";
import { me } from "@/lib/services/users";
import { UserServiceResponseDto } from "@/lib/services/auth/schema";
import { FindDashboardsResponseDto, NavigationMethodString } from "@/lib/services/dashboards/schema";
import { useRouter } from "next/router";
import { DashboardApplicationServiceResponseDto } from "@/lib/services/comments/schema";

type DashboardProps = {
  members: MemberApplicationServiceResponseDto[];
  columns: ColumnServiceResponseDto[];
};

export const DashboardContext = createContext<DashboardProps>({
  members: [],
  columns: [],
});

export default function Dashboard({ members, columns }: DashboardProps) {
  const [dashboardList, setDashboardList] = useState<FindDashboardsResponseDto>({
    cursorId: null,
    totalCount: 0,
    dashboards: [],
  });
  const [myData, setMyData] = useState<UserServiceResponseDto>({} as UserServiceResponseDto);
  const [dashboardData, setDashboardData] = useState<DashboardApplicationServiceResponseDto>(
    {} as DashboardApplicationServiceResponseDto,
  );
  const { dashboards } = dashboardList;

  const sideMenu = <SideMenu dashboards={dashboards} />;
  const header = <DashboardHeader myData={myData} dashboardData={dashboardData} members={members} />;

  const {
    query: { id },
  } = useRouter();
  const dashboardId = Number(id);

  useEffect(() => {
    const getDashboard = async () => {
      const response = await dashboard("get", dashboardId);
      setDashboardData(response?.data as DashboardApplicationServiceResponseDto);
    };

    const getMeData = async () => {
      const response = await me("get");
      setMyData(response.data as UserServiceResponseDto);
    };

    const getDashboardsData = async () => {
      const qs = { navigationMethod: "pagination" as NavigationMethodString, cursorId: 0, page: 1, size: 10 };
      const response = await findDashboard(qs);
      setDashboardList(response.data as FindDashboardsResponseDto);
    };
    getDashboard();
    getMeData();
    getDashboardsData();
  }, [id]);

  return (
    <UpdateTriggerProvider>
      <DashboardContext.Provider value={{ members, columns }}>
        <BoardLayout sideMenu={sideMenu} dashboardHeader={header}>
          <div className="flex flex-col pc:flex-row">
            {columns?.map((column) => {
              return (
                <div key={column.id}>
                  <Column title={column.title} columnId={column.id} />
                </div>
              );
            })}
          </div>
          <AddColumnButton />
        </BoardLayout>
      </DashboardContext.Provider>
    </UpdateTriggerProvider>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const dashboardId = Number(context.query["id"]);
  if (isNaN(dashboardId)) {
    return {
      props: {
        error: "유효하지 않은 대시보드 ID입니다.",
        members: null,
      },
    };
  }
  const qs = {
    page: 1,
    size: 20,
    dashboardId,
  };

  const cookieValue = context.req.headers.cookie || "";

  if (!cookieValue) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const token = extractTokenFromCookie(cookieValue);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data: members } = await memberList(qs, config);
    const { data: columns } = await findColumns({ dashboardId }, config);
    if (!members || !columns) {
      return {
        redirect: {
          destination: "/mydashboard",
          permanent: false,
        },
      };
    }

    return {
      props: {
        members: members?.members,
        columns: columns?.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "데이터를 불러오는 데 실패했습니다.",
        members: null,
        columns: null,
      },
    };
  }
}
