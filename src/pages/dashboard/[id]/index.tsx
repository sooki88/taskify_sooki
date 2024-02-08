import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import { ColumnServiceResponseDto, FindColumnsRequestDto } from "@/lib/services/columns/schema";
import { extractTokenFromCookie } from "@/lib/util/extractTokenFromCookie";
import { findColumns } from "@/lib/services/columns";
import { memberList } from "@/lib/services/members";
import { MemberApplicationServiceResponseDto } from "@/lib/services/members/schema";
import Column from "@/components/dashboard/Column";
import { createContext } from "react";
import SideMenu from "@/components/common/SideMenu";
import DashboardHeader from "@/components/common/DashboardHeader";
import BoardLayout from "@/layouts/board";
import AddColumnButton from "@/components/dashboard/AddColumnButton";
import { dashboard, findDashboard } from "@/lib/services/dashboards";
import { FindDashboardsResponseDto } from "@/lib/services/dashboards/schema";
import { useRouter } from "next/router";
import { FindDashboardsRequestDto, DashboardApplicationServiceResponseDto } from "@/lib/services/dashboards/schema";
import AlertModal from "@/components/modal/alert";

type DashboardProps = {
  members: MemberApplicationServiceResponseDto[];
};
interface DashboardContext {
  members: MemberApplicationServiceResponseDto[];
  columnsData: ColumnServiceResponseDto[];
}

export const DashboardContext = createContext<DashboardContext>({
  members: [],
  columnsData: [],
});

export default function Dashboard({ members }: DashboardProps) {
  const [alertValue, setAlertValue] = useState(false);
  const [columnsData, setColumnsData] = useState<ColumnServiceResponseDto[]>([]);
  const [dashboardList, setDashboardList] = useState<FindDashboardsResponseDto>({
    cursorId: null,
    totalCount: 0,
    dashboards: [],
  });
  const [dashboardData, setDashboardData] = useState<DashboardApplicationServiceResponseDto>(
    {} as DashboardApplicationServiceResponseDto,
  );

  const { dashboards } = dashboardList;

  const sideMenu = <SideMenu dashboards={dashboards} />;
  const header = <DashboardHeader dashboardData={dashboardData} members={members} />;

  const {
    query: { id },
  } = useRouter();
  const router = useRouter();
  const dashboardId = Number(id);

  useEffect(() => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");
    const accessTokenCookie = cookies.find((cookie) => cookie.trim().startsWith("accessToken="));

    if (!accessTokenCookie) {
      alert("로그인이 필요합니다.");
      router.push("/login");
    }

    const getDashboard = async () => {
      const response = await dashboard("get", dashboardId);
      setDashboardData(response?.data as DashboardApplicationServiceResponseDto);
    };

    const getColumnsData = async () => {
      const qs: FindColumnsRequestDto = { dashboardId };
      const response = await findColumns(qs);
      if (response.data) {
        const columns = response?.data.data;
        setColumnsData(columns);
        return;
      }
      if (response.errorMessage) {
        setAlertValue(true);
        return;
      }
    };

    const getDashboardsData = async () => {
      const qs: FindDashboardsRequestDto = { navigationMethod: "pagination", size: 999 };
      const response = await findDashboard(qs);
      if (response.data) {
        setDashboardList(response.data as FindDashboardsResponseDto);
        return;
      }
      if (response.errorMessage) {
        setAlertValue(true);
        return;
      }
    };

    getDashboard();
    getColumnsData();
    getDashboardsData();
  }, [id]);

  return (
    <DashboardContext.Provider value={{ members, columnsData }}>
      <BoardLayout sideMenu={sideMenu} dashboardHeader={header}>
        <div className="flex flex-col pc:flex-row">
          {columnsData?.map((column) => {
            return (
              <div key={column.id}>
                <Column column={column} updateColumns={setColumnsData} />
              </div>
            );
          })}
        </div>
        <AddColumnButton updateColumns={setColumnsData} />
      </BoardLayout>
      {alertValue && <AlertModal modalType="alert" alertType="serverError" onClose={() => setAlertValue(false)} />}
    </DashboardContext.Provider>
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
    if (!members) {
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
      },
    };
  } catch (error) {
    return {
      props: {
        error: "데이터를 불러오는 데 실패했습니다.",
        members: null,
      },
    };
  }
}
