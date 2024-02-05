import { GetServerSidePropsContext } from "next";
import { ColumnServiceResponseDto } from "@/lib/services/columns/schema";
import { extractTokenFromCookie } from "@/lib/util/extractTokenFromCookie";
import { findColumns } from "@/lib/services/columns";
import { memberList } from "@/lib/services/members";
import { MemberApplicationServiceResponseDto } from "@/lib/services/members/schema";
import Column from "@/components/dashboard/Column";
import { UpdateTriggerProvider } from "@/components/contexts/TriggerContext";
import { createContext } from "react";

type DashboardProps = {
  members: MemberApplicationServiceResponseDto[];
  columns: ColumnServiceResponseDto[];
};

export const DashboardContext = createContext<DashboardProps>({
  members: [],
  columns: [],
});

export default function Dashboard({ members, columns }: DashboardProps) {
  return (
    <UpdateTriggerProvider>
      <DashboardContext.Provider value={{ members, columns }}>
        <div className="flex">
          {columns?.map((column) => {
            return (
              <div key={column.id}>
                <Column title={column.title} columnId={column.id} />
              </div>
            );
          })}
        </div>
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
