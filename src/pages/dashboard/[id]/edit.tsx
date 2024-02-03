import BackButton from "@/components/common/Button/BackButton";
import Button from "@/components/common/Button/Button";
import DeleteDashButton from "@/components/common/Button/DeleteDashButton";
import { ChipColors } from "@/components/common/Chips";
import InviteListTable from "@/components/common/InviteListTable";
import MemberTable from "@/components/common/MemberTable";
import { useState } from "react";
import { AuthInputField } from "@/components/Auth/AuthInputField";
import SideMenu from "@/components/common/SideMenu";
import DashboardHeader from "@/components/common/DashboardHeader";
import BoardLayout from "@/layouts/board";
import { dashBoardList, dashboard, members, userData } from "@/lib/mockData";

export default function Edit() {
  const [selectColor, setSelectColor] = useState("");

  return (
    // <BoardLayout type="editOrMypage" sideMenu={<SideMenu />} dashboardHeader={<DashboardHeader myData={userData} dashboardData={dashBoardList.dashboards} members={members.members}/>}>
    <BoardLayout
      sideMenu={<SideMenu />}
      dashboardHeader={<DashboardHeader myData={userData} dashboardData={dashboard} members={members.members} />}>
      <BackButton />
      <div className="flex flex-col gap-y-12 pt-21 pb-40 tablet:pb-48">
        <div className="bg-white px-20 rounded-8">
          <div key={dashboard.title}>
            <p className="flex justify-between items-center pt-27 pb-10 text-20 font-bold">{dashboard.title}</p>
            <ChipColors selectColor={dashboard.color} setSelectColor={() => setSelectColor(dashboard.color)} />
          </div>
          <p className="text-16 font-medium pt-24 pb-16 tablet:text-18">대시보드 이름</p>
          {/* 숙희님이 수정하신 AuthInputField 반영될 예정
                    <AuthInputField />  */}
          <div className="flex justify-end pt-16 tablet:pt-24 pb-20 tablet:pb-28">
            <Button variant="filled_4" buttonType="comment">
              변경
            </Button>
          </div>
        </div>
        <MemberTable />
        <InviteListTable />
      </div>
      <DeleteDashButton />
    </BoardLayout>
  );
}
