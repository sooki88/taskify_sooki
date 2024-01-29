import Avatar from "../common/Avatar";

interface CommentsProps {
  comment?: string;
  onDelete?: () => void;
}

function Comments({ comment, onDelete }: CommentsProps) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className="flex gap-10 mt-20 w-287 tablet:w-450">
      <Avatar />
      <div className="flex flex-col">
        <div className="flex gap-8 items-center">
          <span className="text-black font-Pretendard text-14 font-bold">이름</span>
          <span className="text-gray-9FA6 font-Pretendard text-12 font-normal">2022.12.27 14:00</span>
        </div>
        <div className="mt-6 text-black font-Pretendard text-14 font-normal">{comment}</div>
        <div className="flex gap-12 mt-12">
          <button className="text-gray-9FA6 font-Pretendard text-12 font-normal underline">수정</button>
          <button className="text-gray-9FA6 font-Pretendard text-12 font-normal underline" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comments;
