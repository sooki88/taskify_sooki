import Image from "next/image";
import AvatarStack from "./AvatarStack";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfileLabel from "./ProfileLabel";
import { useState } from "react";
import InviteModal from "../modal/invite";
import IconButton from "./Button/IconButton";

interface MyDataProps {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface DashboardDataProp {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

interface MembersProps {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

interface DashboardHeaderProps {
  myData: MyDataProps | null | undefined; // 로그인 되어있는 나의 정보
  dashboardData?: DashboardDataProp;
  members?: MembersProps[];
}

function DashboardHeader({ myData, dashboardData, members }: DashboardHeaderProps) {
  const router = useRouter();
  const path = router.pathname;
  const PATH_TITLE: any = {
    "/mydashboard": "내 대시보드",
    "/mypage": "계정관리",
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 내가 만든 대시보드인지 확인하기
  const ownerIsMe = dashboardData?.createdByMe;
  // ProfileLabel에 전달할 나의 데이터
  const data = { name: myData?.nickname, src: myData?.profileImageUrl };

  return (
    <>
      {isModalOpen && <InviteModal onClose={() => setIsModalOpen(false)} />}
      <div className="fixed top-0 left-0 right-0 flex items-center justify-end pr-12 bg-white pc:justify-between tablet:h-70 h-60 border-b-1 border-gray-D9D9 pc:pl-340 pl-0 pc:pr-80 tablet:pr-40 z-[300]">
        <div className="items-center hidden gap-8 font-bold pc:flex text-20 text-black-3332">
          {dashboardData ? dashboardData.title : PATH_TITLE[path]}
          {ownerIsMe && <Image src="/images/crown.png" alt="왕관 아이콘 이모지" width="20" height="16" />}
        </div>
        <div className="flex items-center justify-end h-full gap-16 pc:gap-40 tablet:gap-32 shrink-0">
          {ownerIsMe && (
            <div className="flex gap-6 pc:gap-16 tablet:gap-12">
              <Link href={`/dashboard/${dashboardData?.id}/edit`}>
                <IconButton variant="ghost" type="setting" />
              </Link>
              <IconButton variant="ghost" type="invite" onClick={() => setIsModalOpen(true)} />
            </div>
          )}
          <div className="flex items-center gap-12 pc:gap-32 tablet:gap-24">
            {dashboardData && <AvatarStack list={members} />}
            {dashboardData && <div className="w-1 bg-gray-D9D9 tablet:h-38 h-34"></div>}
            <Link href="/mypage">
              <ProfileLabel data={myData} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardHeader;
