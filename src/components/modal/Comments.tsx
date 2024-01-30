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
        <div className="flex gap-8 items-center">
          <span className="text-black font-Pretendard text-14 font-bold">이름</span>
          <span className="text-gray-9FA6 font-Pretendard text-12 font-normal">2022.12.27 14:00</span>
        </div>
        {isEditing ? (
          <textarea
            className="mt-6 w-250 tablet:w-410 h-70 tablet:h-110 p-16 rounded-6 border-2 border-gray-D9D9 outline-none focus:border-violet placeholder:text-gray-9FA6 font-Pretendard text-base font-normal leading-normal resize-none"
            maxLength={180}
            value={editingComment}
            onChange={(e) => setEditingComment(e.target.value)}
          />
        ) : (
          <div className="w-250 tablet:w-410 mt-6 text-black font-Pretendard text-14 font-normal">{comment}</div>
        )}
        <div className="flex gap-12 mt-12">
          {isEditing ? (
            <>
              <button className="text-gray-9FA6 font-Pretendard text-12 font-normal underline" onClick={handleSave}>
                저장
              </button>
              <button className="text-gray-9FA6 font-Pretendard text-12 font-normal underline" onClick={handleCancel}>
                취소
              </button>
            </>
          ) : (
            <>
              <button className="text-gray-9FA6 font-Pretendard text-12 font-normal underline" onClick={handleEdit}>
                수정
              </button>
              <button className="text-gray-9FA6 font-Pretendard text-12 font-normal underline" onClick={handleDelete}>
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
