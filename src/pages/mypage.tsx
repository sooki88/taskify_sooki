import BackButton from "@/components/common/Button/BackButton";
import DashboardHeader from "@/components/common/DashboardHeader";
import SideMenu from "@/components/common/SideMenu";
import AlertModal from "@/components/modal/alert";
import PasswordChangeForm from "@/components/mypage/PasswordChangeForm";
import ProfileChangeForm from "@/components/mypage/ProfileChangeForm";
import BoardLayout from "@/layouts/board";
import MyPageFormLayout from "@/layouts/board/mypage/MyPageFormLayout";
import { findDashboard } from "@/lib/services/dashboards";
import { FindDashboardsRequestDto } from "@/lib/services/dashboards/schema";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface myDataProps {
  email: string;
  nickname: string;
  profileImageUrl: any;
}

function MyPage() {
  const [alertValue, setAlertValue] = useState(false);
  const [dashboardlist, setDashboardList] = useState([]);
  const sideMenu = <SideMenu dashboards={dashboardlist} />;
  const header = <DashboardHeader />;
  const router = useRouter();

  useEffect(() => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");
    const accessTokenCookie = cookies.find((cookie) => cookie.trim().startsWith("accessToken="));

    if (!accessTokenCookie) {
      alert("로그인이 필요합니다.");
      router.push("/login");
    }

    const getDashboards = async () => {
      try {
        const qs: FindDashboardsRequestDto = {
          navigationMethod: "pagination",
          size: 999,
        };
        const res = (await findDashboard(qs)).data as any;
        setDashboardList(res.dashboards);
      } catch (error) {
        setAlertValue(true);
        console.error("대시보드를 불러오는 데 실패했습니다.");
      }
    };

    getDashboards();
  }, []);

  return (
    <BoardLayout sideMenu={sideMenu} dashboardHeader={header}>
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
