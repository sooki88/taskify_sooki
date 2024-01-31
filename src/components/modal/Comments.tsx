import { useState } from "react";
import Avatar from "../common/Avatar";

interface CommentsProps {
  comment?: string;
  onDelete?: () => void;
}

function Comments({ comment, onDelete }: CommentsProps) {
  const [editingComment, setEditingComment] = useState(comment || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingComment(comment || "");
    setIsEditing(false);
  };

  return (
    <div className="flex gap-10 mt-20 w-287 tablet:w-450">
      <Avatar />
      <div className="flex flex-col">
        <div className="flex items-center gap-8">
          <span className="font-bold text-black font-Pretendard text-14">이름</span>
          <span className="font-normal text-gray-9FA6 font-Pretendard text-12">2022.12.27 14:00</span>
        </div>
        {isEditing ? (
          <textarea
            className="p-16 mt-6 text-base font-normal leading-normal border-2 outline-none resize-none w-250 tablet:w-410 h-70 tablet:h-110 rounded-6 border-gray-D9D9 focus:border-violet placeholder:text-gray-9FA6 font-Pretendard"
            value={editingComment}
            onChange={(e) => setEditingComment(e.target.value)}
          />
        ) : (
          <div className="mt-6 font-normal text-black w-250 tablet:w-410 font-Pretendard text-14">{comment}</div>
        )}
        <div className="flex gap-12 mt-12">
          {isEditing ? (
            <>
              <button className="font-normal underline text-gray-9FA6 font-Pretendard text-12" onClick={handleSave}>
                저장
              </button>
              <button className="font-normal underline text-gray-9FA6 font-Pretendard text-12" onClick={handleCancel}>
                취소
              </button>
            </>
          ) : (
            <>
              <button className="font-normal underline text-gray-9FA6 font-Pretendard text-12" onClick={handleEdit}>
                수정
              </button>
              <button className="font-normal underline text-gray-9FA6 font-Pretendard text-12" onClick={handleDelete}>
                삭제
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comments;
