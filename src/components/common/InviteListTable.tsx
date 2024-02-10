import InviteModal from "../modal/invite";
import Button from "./Button/Button";
import IconButton from "./Button/IconButton";
import PaginationButton from "./Button/PaginationButton";
import { findInvitationDashboard, deleteInvitationDashboard } from "@/lib/services/dashboards";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FIndDashboardInvitationsRequestDto } from "@/lib/services/dashboards/schema";

interface Invitation {
  id: number;
  invitee: Invitee;
}

interface Invitee {
  email: string;
}

interface DashboardInvitationsResponse {
  invitations: Invitation[];
}

function InviteListTable() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const router = useRouter();
  const dashboardId = router.query?.id;

  // 모달 열기 관련 코드
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleInviteDashBoard = () => {
    setIsModalOpen(true);
  };

  // 페이지네이션 관련 코드
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(10);

  useEffect(() => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");
    const accessTokenCookie = cookies.find((cookie) => cookie.trim().startsWith("accessToken="));

    if (!accessTokenCookie) {
      alert("로그인이 필요합니다.");
      router.push("/login");
    }

    getInvitations();
  }, [currentPage, dashboardId]);

  // 초대 목록 조회
  const getInvitations = async () => {
    if (typeof dashboardId === "string") {
      try {
        const qs: FIndDashboardInvitationsRequestDto = {};
        const response = await findInvitationDashboard(Number(dashboardId), qs);
        const invitationData = response.data as DashboardInvitationsResponse | null | undefined;
        if (invitationData && invitationData.invitations) {
          const totalPageCount = Math.ceil(invitationData.invitations.length / 5);
          setTotalPages(totalPageCount);
          setInvitations(invitationData.invitations);
        }
      } catch (error) {
        console.error("초대 목록 조회 실패:", error);
      }
    }
  };

  // 초대 취소
  const handleCancelInvitation = async (invitationId: number) => {
    try {
      await deleteInvitationDashboard(Number(dashboardId), invitationId);
      getInvitations();
    } catch (error) {
      console.error("초대 취소 실패:", error);
    }
  };

  // 컴포넌트 마운트 시 초대 목록 가져오기
  useEffect(() => {
    getInvitations();
  }, [dashboardId]);

  return (
    <div className="bg-white rounded-8 pb-8">
      <div className="flex items-center justify-between pt-22 px-20 tablet:px-28 tablet:pt-26">
        <p className="text-20 font-bold tablet:text-24">초대내역</p>
        <div className="flex items-center gap-x-12">
          <PaginationButton currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
          <div className="hidden tablet:block">
            <IconButton variant="filled" type="invite" onClick={handleInviteDashBoard} />
          </div>
        </div>
      </div>
      <div className="pt-18 flex items-center justify-between pb-12 px-20 tablet:px-28">
        <p className="text-gray-9FA6 text-14 tablet:text-16">이메일</p>
        <div className="tablet:hidden">
          <IconButton variant="filled" type="invite" onClick={handleInviteDashBoard} />
        </div>
      </div>
      {isModalOpen && (
        <InviteModal
          onClose={() => {
            setIsModalOpen(false);
            getInvitations();
          }}
        />
      )}
      <div>
        {invitations.slice((currentPage - 1) * 5, currentPage * 5).map((invitation) => (
          <div
            className="flex items-center justify-between py-12 border-b-1 border-gray-EEEE px-20 tablet:px-28"
            key={invitation.id}>
            <p className="text-14">{invitation.invitee.email}</p>
            <Button variant="ghost" buttonType="delete" onClick={() => handleCancelInvitation(invitation.id)}>
              취소
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InviteListTable;
