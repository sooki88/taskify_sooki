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

function InviteListTable() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const router = useRouter();
  const dashboardId = router.query?.id;

  // 초대 목록 조회
  const getInvitations = async () => {
    if (typeof dashboardId === "string") {
      try {
        const qs = { dashboardId: Number(dashboardId) };
        const invitationData = (await findInvitationDashboard(Number(dashboardId), qs))
          .data as FIndDashboardInvitationsRequestDto;
        if (invitationData) setInvitations(invitationData.invitations);
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && <InviteModal onClose={() => setIsModalOpen(false)} />}
      <div className="bg-white rounded-8 pb-8">
        <div className="flex items-center justify-between pt-22 px-20 tablet:px-28 tablet:pt-26">
          <p className="text-20 font-bold tablet:text-24">초대내역</p>
          <div className="flex items-center gap-x-12">
            <p className="text-12 font-normal tablet:text-14">1 페이지 중 1</p>
            <PaginationButton />
            <div className="hidden tablet:block">
              <IconButton variant="filled" type="invite" onClick={() => setIsModalOpen(true)} />
            </div>
          </div>
        </div>
        <div className="pt-18 flex items-center justify-between pb-12 px-20 tablet:px-28">
          <p className="text-gray-9FA6 text-14 tablet:text-16">이메일</p>
          <div className="tablet:hidden">
            {/* 모달이 안열림 */}
            <IconButton variant="filled" type="invite" onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
        <div>
          {invitations.map((invitation) => (
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
    </>
  );
}

export default InviteListTable;
