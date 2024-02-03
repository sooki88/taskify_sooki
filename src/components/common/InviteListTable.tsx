import { sentInvitations } from "@/lib/mockData";
import Button from "./Button/Button";
import IconButton from "./Button/IconButton";
import PaginationButton from "./Button/PaginationButton";

function InviteListTable() {
    return (
      <div className="bg-white rounded-8">
        <div className="flex items-center justify-between pt-22 px-20 tablet:px-28 tablet:pt-26">
            <p className="text-20 font-bold tablet:text-24">초대내역</p>
            <div className="flex items-center gap-x-12">
                <p className="text-12 font-normal tablet:text-14">1 페이지 중 1</p>
                <PaginationButton />
                <div className="hidden tablet:block">
                    <IconButton variant="filled" type="invite" />
                </div>
            </div>
        </div>
        <div className="pt-18 flex items-center justify-between pb-12 px-20 tablet:px-28">
            <p className="text-gray-9FA6 text-14 tablet:text-16">이메일</p>
            <div className="tablet:hidden">
                <IconButton variant="filled" type="invite" />
            </div>
        </div>
            {/* 아래 div안의 데이터가 1개일 때와 5번째 순서마다 border-b-1이 안보이는 기능은 기능구현 때 구현 */}
        <div>
        {sentInvitations.invitations.map((invitation) => (
            <div className="flex items-center justify-between py-12 border-b-1 border-gray-EEEE px-20 tablet:px-28"  key={invitation.invitee.email}>
                <p className="text-14">{invitation.invitee.email}</p>
                <Button variant="ghost" buttonType="delete">취소</Button>
            </div>
            ))}
        </div> 
    </div> 
    )
  }
  
  export default InviteListTable;
  