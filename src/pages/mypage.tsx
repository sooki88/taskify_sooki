import { AuthInputField } from "@/components/Auth/AuthInputField";
import BackButton from "@/components/common/BackButton";
import DashboardHeader from "@/components/common/DashboardHeader";
import SideMenu from "@/components/common/SideMenu";
import { Mock_DashBoard, Mock_MyData } from "@/components/mypage/MockData";
import ProfileImgInputField from "@/components/mypage/ProfileImgInputField";
import BoardLayout from "@/layouts/board";
import MyPageLayout from "@/layouts/board/mypage/MyPageLayout";
import { userData } from "@/lib/mockData";
import { useState } from "react";

function MyPage() {
  const [myData, setMyData] = useState(userData);
  const [dashboards, setDashboards] = useState(Mock_DashBoard);

  const sideMenu = <SideMenu dashboards={dashboards} />;
  const header = <DashboardHeader myData={myData} />;

  return (
    <BoardLayout sideMenu={sideMenu} dashboardHeader={header}>
      <div className="flex flex-col tablet:pl-20 gap-12 pl-12">
        <div className="flex items-center mt-8 tablet:h-44 tablet:mt-8 h-34 tablet:text-16 text-14">
          <BackButton />
        </div>
        <MyPageLayout title="프로필" type="profile">
          <div className="flex flex-col items-start gap-24 tablet:flex-row tablet:gap-16 tablet:items-center">
            <ProfileImgInputField />
            <div className="flex flex-col w-full gap-16 tablet:gap-20 grow tablet:mt-0">
              <AuthInputField labelName="이메일" id="email" type="email" placeholder="이메일을 입력해 주세요" />
              <AuthInputField labelName="닉네임" id="nickname" type="nickname" placeholder="닉네임을 입력해 주세요" />
            </div>
          </div>
        </MyPageLayout>
        <MyPageLayout title="비밀번호 변경" type="password" disabled>
          <AuthInputField labelName="현재 비밀번호" id="password" type="password" placeholder="현재 비밀번호 입력" />
          <AuthInputField labelName="새 비밀번호" id="newPassword" type="password" placeholder="현재 비밀번호 입력" />
          <AuthInputField
            labelName="새 비밀번호 확인"
            id="newPasswordCheck"
            type="password"
            placeholder="새 비밀번호 입력"
          />
        </MyPageLayout>
      </div>
    </BoardLayout>
  );
}

{
  /* <MyPageForm type="profile">
<ProfileInputField type="profile" title="프로필" />
<ProfileInputField type="password" title="비밀번호변경" />
</MyPageForm> */
}

export default MyPage;
