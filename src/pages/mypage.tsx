import { useState } from "react";
import BoardLayout from "@/layouts/board";
import DashboardHeader from "@/components/common/DashboardHeader";
import MyPageFormLayout from "@/layouts/board/mypage/MyPageFormLayout";
import PasswordChangeForm from "@/components/mypage/PasswordChangeForm";
import ProfileChangeForm from "@/components/mypage/ProfileChangeForm";
import BackButton from "@/components/common/Button/BackButton";
import AlertModal from "@/components/modal/alert";
import { useDashboards } from "@/hooks/useDashboard";

function MyPage() {
  const [alertValue, setAlertValue] = useState<boolean>(false);
  const { dashboardList } = useDashboards();

  const header = <DashboardHeader />;

  return (
    <BoardLayout dashboardList={dashboardList} dashboardHeader={header}>
      <div className="min-h-screen flex flex-col tablet:pl-20 gap-12 px-12 pb-40">
        <div className="flex items-center mt-8 tablet:h-44 tablet:mt-8 h-34 tablet:text-16 text-14">
          <BackButton />
        </div>
        <MyPageFormLayout title="프로필">
          <ProfileChangeForm />
        </MyPageFormLayout>
        <MyPageFormLayout title="비밀번호 변경">
          <PasswordChangeForm />
        </MyPageFormLayout>
      </div>
      {alertValue && <AlertModal modalType="alert" alertType="serverError" onClose={() => setAlertValue(false)} />}
    </BoardLayout>
  );
}

export default MyPage;
