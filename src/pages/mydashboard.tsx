import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BoardLayout from "@/layouts/board";
import MyDashboardLayout from "@/layouts/board/mydashboard";
import DashboardHeader from "@/components/common/DashboardHeader";
import SideMenu from "@/components/common/SideMenu";
import DashboardLinkButton from "@/components/mydashboard/DashboardLinkButton";
import AddDashBoardButton from "@/components/mydashboard/AddDashBoardButton";
import PaginationButton from "@/components/common/Button/PaginationButton";
import InviteDashboardTable from "@/components/common/InviteDashboardTable";
import NewDashModal from "@/components/modal/newDash";
import { findDashboard } from "@/lib/services/dashboards";
import { FindDashboardsRequestDto } from "@/lib/services/dashboards/schema";
import AlertModal from "@/components/modal/alert";

export interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export default function MyDashboard() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [alertValue, setAlertValue] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const router = useRouter();

  const sideMenu = <SideMenu dashboards={dashboards} />;
  const header = <DashboardHeader />;

  const getDashboards = async () => {
    try {
      const qs: FindDashboardsRequestDto = {
        navigationMethod: "pagination",
        size: 999,
      };
      const res = (await findDashboard(qs)).data as any;
      setDashboards(res.dashboards);
      if (res.errorMessage) {
        setAlertValue(true);
        return;
      }
    } catch (error) {
      console.error("대시보드를 불러오는 데 실패했습니다.");
    }
  };

  const handleAddNewDashBoard = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");
    const accessTokenCookie = cookies.find((cookie) => cookie.trim().startsWith("accessToken="));

    if (!accessTokenCookie) {
      alert("로그인이 필요합니다.");
      router.push("/login");
    }

    getDashboards();
  }, []);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedDashboards = dashboards.slice(startIndex, endIndex);

  return (
    <>
      <BoardLayout sideMenu={sideMenu} dashboardHeader={header}>
        <MyDashboardLayout>
          <div className="flex flex-col gap-8 tablet:gap-10 pc:gap-12">
            <div className="grid w-full grid-cols-1 grid-rows-6 gap-8 h-400 tablet:h-250 pc:h-150 tablet:grid-cols-2 tablet:grid-rows-3 pc:grid-cols-3 pc:grid-rows-2 tablet:gap-13 ">
              <AddDashBoardButton title="새로운 대시보드" onClick={handleAddNewDashBoard} />
              {displayedDashboards.map((dashboard) => (
                <DashboardLinkButton
                  key={dashboard.id}
                  id={dashboard.id}
                  title={dashboard.title}
                  createdByMe={dashboard.createdByMe}
                  color={dashboard.color}
                />
              ))}
              {isModalOpen && <NewDashModal onClose={() => setIsModalOpen(false)} />}
            </div>
            <div className="flex justify-end">
              <PaginationButton
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={Math.ceil(dashboards.length / pageSize)}
              />
            </div>
          </div>
          <div className="w-full bg-white rounded-8">
            <InviteDashboardTable getDashboards={getDashboards} />
          </div>
        </MyDashboardLayout>
      </BoardLayout>
      {alertValue && <AlertModal modalType="alert" alertType="serverError" onClose={() => setAlertValue(false)} />}
    </>
  );
}
