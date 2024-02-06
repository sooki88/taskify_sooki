import BackButton from "@/components/common/Button/BackButton";
import DashboardHeader from "@/components/common/DashboardHeader";
import SideMenu from "@/components/common/SideMenu";
import PasswordChangeForm from "@/components/mypage/PasswordChangeForm";
import ProfileChangeForm from "@/components/mypage/ProfileChangeForm";
import BoardLayout from "@/layouts/board";
import MyPageFormLayout from "@/layouts/board/mypage/MyPageFormLayout";
import { findDashboard } from "@/lib/services/dashboards";
import { me } from "@/lib/services/users";
import { useEffect, useState } from "react";

function MyPage() {
  const [dashboardlist, setDashboardList] = useState([]);
  const [myData, setMyData] = useState({
    email: "",
    nickname: "",
    profileImageUrl: "",
  });

  const sideMenu = <SideMenu dashboards={dashboardlist} />;
  const header = <DashboardHeader myData={myData} />;

  const getMeData = async () => {
    try {
      const responseMe = await me("get");

      if (responseMe.errorMessage) {
        console.log(responseMe.errorMessage);
      } else {
        const { profileImageUrl, email, nickname } = responseMe.data;
        setMyData({ profileImageUrl, email, nickname });
      }
    } catch (error) {
      console.log("유저를 불러오는 데 실패했습니다.");
    }
  };

  const getDashboardsData = async () => {
    try {
      const responseDashboards = await findDashboard({
        navigationMethod: "pagination",
        cursorId: 0,
        page: 1,
        size: 10,
      });

      if (responseDashboards.errorMessage) {
        console.log(responseDashboards.errorMessage);
      } else {
        const { dashboards } = responseDashboards.data;
        setDashboardList(dashboards);
      }
    } catch (error) {
      console.log("대시보드 리스트를 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    getMeData();
    getDashboardsData();
  }, []);

  return (
    <BoardLayout sideMenu={sideMenu} dashboardHeader={header}>
      <div className="min-h-screen flex flex-col tablet:pl-20 gap-12 pl-12 pb-40">
        <div className="flex items-center mt-8 tablet:h-44 tablet:mt-8 h-34 tablet:text-16 text-14">
          <BackButton />
        </div>
        <MyPageFormLayout title="프로필">
          <ProfileChangeForm myData={myData} getMeData={getMeData} />
        </MyPageFormLayout>
        <MyPageFormLayout title="비밀번호 변경">
          <PasswordChangeForm />
        </MyPageFormLayout>
      </div>
    </BoardLayout>
  );
}

export default MyPage;
