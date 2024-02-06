import { useState, useEffect } from "react";
import BoardLayout from "@/layouts/board";
import MyDashboardLayout from "@/layouts/board/mydashboard";
import DashboardHeader from "@/components/common/DashboardHeader";
import SideMenu from "@/components/common/SideMenu";
import { Mock_MyData } from "@/components/mypage/MockData";
import DashboardLinkButton from "@/components/mydashboard/DashboardLinkButton";
import AddTodoButton from "@/components/dashboard/AddTodoButton";
import PaginationButton from "@/components/common/Button/PaginationButton";
import InviteDashTable from "@/components/common/InviteDashTable";
import NewDashModal from "@/components/modal/newDash";
import { findDashboard } from "@/lib/services/dashboards";
import { FindDashboardsRequestDto, FindDashboardsResponseDto } from "@/lib/services/dashboards/schema";

interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export default function MyDashboard() {
  const [myData, setMyData] = useState(Mock_MyData);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [showNewDashModal, setShowNewDashModal] = useState<boolean>(false);

  const sideMenu = <SideMenu dashboards={dashboards} />;
  const header = <DashboardHeader myData={myData} />;

  const handleAddNewDashModal = () => {
    setShowNewDashModal(true);
  };

  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        const qs: FindDashboardsRequestDto = {
          navigationMethod: "pagination",
        };
        const res = (await findDashboard(qs)).data as FindDashboardsResponseDto;
        setDashboards(res.dashboards);
      } catch (error) {
        console.error("대시보드를 불러오는 데 실패했습니다.");
      }
    };

    fetchDashboards();
  }, []);

  return (
    <BoardLayout sideMenu={sideMenu} dashboardHeader={header}>
      <MyDashboardLayout>
        <div className="flex flex-col gap-8 tablet:gap-10 pc:gap-12">
          <div className="grid grid-cols-1 tablet:grid-cols-2 pc:grid-cols-3 gap-8 tablet:gap-13 w-full">
            <AddTodoButton title="새로운 대시보드" onClick={handleAddNewDashModal} />
            {dashboards.map((dashboard) => (
              <DashboardLinkButton
                key={dashboard.id}
                id={dashboard.id}
                title={dashboard.title}
                createdByMe={dashboard.createdByMe}
                color={dashboard.color}
              />
            ))}
            {showNewDashModal && <NewDashModal onClose={() => setShowNewDashModal(false)} />}
          </div>
          <div className="flex justify-end">
            <PaginationButton />
          </div>
        </div>
        <div className="w-full bg-white rounded-8">
          <InviteDashTable />
        </div>
      </MyDashboardLayout>
    </BoardLayout>
  );
}
