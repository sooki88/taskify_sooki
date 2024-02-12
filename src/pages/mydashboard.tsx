import { useState } from "react";
import { useDashboards } from "@/hooks/useDashboard";
import BoardLayout from "@/layouts/board";
import MyDashboardLayout from "@/layouts/board/mydashboard";
import DashboardHeader from "@/components/common/DashboardHeader";
import PaginationButton from "@/components/common/Button/PaginationButton";
import InviteDashboardTable from "@/components/common/InviteDashboardTable";
import DashboardLinkButton from "@/components/mydashboard/DashboardLinkButton";
import AddDashBoardButton from "@/components/mydashboard/AddDashBoardButton";
import NewDashModal from "@/components/modal/newDash";
import AlertModal from "@/components/modal/alert";

export default function MyDashboard() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [alertValue, setAlertValue] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { dashboardList, fetchDashboardList } = useDashboards();

  const handleAddNewDashBoard = () => {
    setIsModalOpen(true);
  };

  const pageSize = 5;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedDashboards = dashboardList.slice(startIndex, endIndex);
  const header = <DashboardHeader />;

  return (
    <>
      <BoardLayout dashboardList={dashboardList} dashboardHeader={header}>
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
                totalPages={Math.ceil(dashboardList.length / pageSize)}
              />
            </div>
          </div>
          <div className="w-full bg-white rounded-8">
            <InviteDashboardTable getDashboards={fetchDashboardList} />
          </div>
        </MyDashboardLayout>
      </BoardLayout>
      {alertValue && <AlertModal modalType="alert" alertType="serverError" onClose={() => setAlertValue(false)} />}
    </>
  );
}
