import { useState, useEffect, useContext } from "react";
import Button from "../common/Button/Button";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { invitation, responseInvitation } from "@/lib/services/invitations";
import { InvitationServiceResponseDto } from "@/lib/services/invitations/schema";

interface Invitation {
  id: number;
  dashboard?: {
    title: string;
  };
  inviter?: {
    nickname: string;
  };
}

function InviteDashTable() {
  const [invitedDashBoards, setInvitedDashBoards] = useState<Invitation[]>([]);
  const [searchResult, setSearchResult] = useState<Invitation[]>([]);

  const handleSearch = (searchTerm: string): void => {
    if (searchTerm.trim() === "") {
      setSearchResult(invitedDashBoards);
      return;
    }

    const filteredResult = invitedDashBoards.filter((invitation: Invitation) =>
      invitation.dashboard?.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setSearchResult(filteredResult);
  };

  const getResponseInvitation = async (invitationId: number, inviteAccepted: boolean): Promise<void> => {
    try {
      const res = (await responseInvitation(invitationId, inviteAccepted)).data as any;
      // const res = (await findDashboard(qs)).data as any;
      console.log(res);
      setSearchResult((prevSearchResult: Invitation[]) =>
        prevSearchResult.filter((invitation) => invitation.id !== invitationId),
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getInvitationDashboard = async (): Promise<void> => {
      try {
        const res = (await invitation({})).data as InvitationServiceResponseDto;
        const invitations = res.invitations || [];
        setInvitedDashBoards(invitations);
        setSearchResult(invitations);
      } catch (error) {
        console.error("초대 받은 대시보드를 불러오는 데 실패했습니다.");
      }
    };

    getInvitationDashboard();
  }, []);

  return (
    <div className="px-16 py-24 overflow-y-auto max-h-600 tablet:px-28 tablet:py-32">
      <p className="font-bold text-20 tablet:text-24">초대받은 대시보드</p>
      <div className="pt-20">
        <SearchBar onSearch={handleSearch} />
      </div>
      {searchResult.length > 0 ? (
        <>
          <div className="hidden tablet:grid tablet:grid-cols-3 tablet:pt-24">
            <p className="text-gray-9FA6 text-14 pt-18 tablet:text-16">이름</p>
            <p className="text-gray-9FA6 text-14 pt-18 tablet:text-16">초대자</p>
            <p className="text-gray-9FA6 text-14 pt-18 tablet:text-16">수락 여부</p>
          </div>
          <div>
            {searchResult.map((invitation: Invitation, index: number) => (
              <div key={index} className="py-12 tablet:grid tablet:grid-cols-3 border-b-1 border-gray-EEEE text-14">
                <div className="flex items-center pb-10 tablet:pb-0 gap-x-28 tablet:gap-x-0">
                  <p className="tablet:hidden text-14 text-gray-9FA6">이름</p>
                  <p className="text-14 tablet:text-16">{invitation.dashboard?.title}</p>
                </div>
                <div className="flex items-center pb-16 tablet:pb-0 gap-x-16 tablet:gap-x-0">
                  <p className="tablet:hidden text-14 text-gray-9FA6">초대자</p>
                  <p className="text-14 tablet:text-16">{invitation.inviter?.nickname}</p>
                </div>
                <div className="flex gap-x-10">
                  <Button
                    variant="filled_4"
                    buttonType="confirm"
                    onClick={() => getResponseInvitation(invitation.id, true)}>
                    수락
                  </Button>
                  <Button
                    variant="ghost"
                    buttonType="confirm"
                    onClick={() => getResponseInvitation(invitation.id, false)}>
                    거절
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-20 my-50">
          <Image src="/images/no_invite.png" width={100} height={100} alt="초대 여부 이미지" />
          <p className="font-normal text-center font-Pretendard text-gray-9FA6 text-14 tablet:text-18">
            {invitedDashBoards.length > 0 ? "검색 결과가 없습니다." : "아직 초대받은 대시보드가 없습니다."}
          </p>
        </div>
      )}
    </div>
  );
}

export default InviteDashTable;
