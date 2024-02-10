import Button from "./Button/Button";
import PaginationButton from "./Button/PaginationButton";
import ProfileLabel from "../common/ProfileLabel";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deleteMember, memberList } from "@/lib/services/members";
import { MemberApplicationServiceResponseDto, MemberListResponseDto } from "@/lib/services/members/schema";
import Image from "next/image";

function MemberTable({ setMemberList }: any) {
  const [members, setMembers] = useState<MemberApplicationServiceResponseDto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const dashboardId = router.query?.id;

  const getMembers = async () => {
    if (typeof dashboardId === "string") {
      const qs = { dashboardId: Number(dashboardId) };
      const memberData = (await memberList(qs)).data as MemberListResponseDto;
      if (memberData) {
        setMembers(memberData.members);
        const pages = Math.ceil(memberData.members.length / 4);
        setTotalPages(pages);
      }
    }
  };

  useEffect(() => {
    getMembers();
  }, [dashboardId, currentPage]);

  const handleDeleteMember = async (memberId: number) => {
    try {
      await deleteMember(memberId);
      // 현재 멤버 목록을 조회하기 (prev)
      // 삭제한 멤버를 찾아서 filter
      // 삭제한 멤버를 목록에서 빼기
      setMemberList((prev: any) => prev.filter((member: any) => member.id !== memberId));
      getMembers();
    } catch (error) {
      console.error("멤버 삭제 실패:", error);
    }
  };

  return (
    <div className="bg-white rounded-8 pb-8">
      <div className="flex items-center justify-between pt-22 px-20 tablet:px-28 tablet:pt-26">
        <p className="text-20 font-bold tablet:text-24">구성원</p>
        <div className="flex items-center gap-x-12">
          <PaginationButton currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
      </div>
      <p className="text-gray-9FA6 text-14 pt-18 px-20 tablet:text-16 tablet:px-28">이름</p>
      {members.slice((currentPage - 1) * 4, currentPage * 4).map((member) => (
        <div
          className="flex items-center justify-between py-12 border-b-1 border-gray-EEEE px-20 tablet:px-28"
          key={member.id}>
          <ProfileLabel data={member} avatarType="table" />
          {member.isOwner ? (
            <div className="px-13 tablet:px-30">
              <Image src="/images/crown.png" alt="왕관 아이콘" width={24} height={24} />
            </div>
          ) : (
            <Button variant="ghost" buttonType="delete" onClick={() => handleDeleteMember(member.id)}>
              삭제
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

export default MemberTable;
