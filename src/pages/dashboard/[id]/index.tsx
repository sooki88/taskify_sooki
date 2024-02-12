import { useEffect, useState, createContext, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import AddColumnButton from "@/components/dashboard/AddColumnButton";
import AlertModal from "@/components/modal/alert";
import BoardLayout from "@/layouts/board";
import Column from "@/components/dashboard/Column";
import DashboardHeader from "@/components/common/DashboardHeader";
import { findColumns } from "@/lib/services/columns";
import { findCards } from "@/lib/services/cards";
import { memberList } from "@/lib/services/members";
import { dashboard } from "@/lib/services/dashboards";
import { checkLogin } from "@/lib/util/checkLogin";
import { extractTokenFromCookie } from "@/lib/util/extractTokenFromCookie";
import { ColumnServiceResponseDto, FindColumnsRequestDto } from "@/lib/services/columns/schema";
import { DashboardApplicationServiceResponseDto } from "@/lib/services/dashboards/schema";
import { MemberApplicationServiceResponseDto } from "@/lib/services/members/schema";
import { CardServiceResponseDto } from "@/lib/services/cards/schema";
import { useDashboards } from "@/hooks/useDashboard";

type DashboardProps = {
  members: MemberApplicationServiceResponseDto[];
  dashboardData: DashboardApplicationServiceResponseDto;
};
interface DashboardContextType {
  members: MemberApplicationServiceResponseDto[];
  columnsData: ColumnServiceResponseDto[];
  cardData: CardState[];
  setColumnsData: Dispatch<SetStateAction<ColumnServiceResponseDto[]>>;
  setCardData: Dispatch<SetStateAction<CardState[]>>;
}

interface CardState {
  columnId: number;
  cards: CardServiceResponseDto[];
}

export const DashboardContext = createContext<DashboardContextType>({
  members: [],
  columnsData: [],
  cardData: [{ columnId: 0, cards: [] }],
  setColumnsData: () => {},
  setCardData: () => {},
});

export default function Dashboard({ members, dashboardData }: DashboardProps) {
  const [alertValue, setAlertValue] = useState(false);
  const [columnsData, setColumnsData] = useState<ColumnServiceResponseDto[]>([]);
  const [cardData, setCardData] = useState<CardState[]>([{ columnId: 0, cards: [] }]);

  const router = useRouter();
  const dashboardId = Number(router.query.id);

  useEffect(() => {
    if (!checkLogin(router)) return;

    const getColumnsData = async () => {
      const qs: FindColumnsRequestDto = { dashboardId };
      const { data: columns, errorMessage } = await findColumns(qs);
      if (columns) {
        setColumnsData(columns.data as ColumnServiceResponseDto[]);
        const allCardsData: CardState[] = [];
        await Promise.all(
          columns.data.map(async (column: ColumnServiceResponseDto) => {
            const response = await findCards({ columnId: column.id });
            if (response.data) {
              allCardsData.push({ columnId: column.id, cards: response.data.cards });
            }
          }),
        );

        setCardData(allCardsData);
      }
      if (errorMessage) {
        setAlertValue(true);
      }
    };
    getColumnsData();
  }, [router, dashboardId]);

  const { dashboardList } = useDashboards();

  const header = <DashboardHeader dashboardData={dashboardData} members={members} />;

  return (
    <DashboardContext.Provider value={{ members, columnsData, cardData, setCardData, setColumnsData }}>
      <Head>
        <title>{dashboardData.title}</title>
      </Head>
      <BoardLayout dashboardList={dashboardList} dashboardHeader={header} scrollBtn>
        <div className="flex flex-col pc:flex-row">
          {columnsData?.map((column) => {
            return <Column key={column.id} column={column} updateColumns={setColumnsData} />;
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
    const dashboardData = (await dashboard("get", dashboardId, undefined, config))!.data;

    if (!members || !dashboardData) {
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
        dashboardData,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "데이터를 불러오는 데 실패했습니다.",
        members: null,
        dashboardData: null,
      },
    };
  }
}
