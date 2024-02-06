import { useState } from "react";
import Avatar from "../common/Avatar";
import { CommentServiceDto } from "@/lib/services/comments/schema";
import { format } from "date-fns";

interface CommentsProps {
  comment?: CommentServiceDto;
  onDelete?: () => void;
}

function Comments({ comment, onDelete }: CommentsProps) {
  const [editingComment, setEditingComment] = useState(comment?.content || "");
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
    setEditingComment(comment?.content || "");
    setIsEditing(false);
  };
  return (
    <div className="flex gap-10 mt-20 w-320 tablet:w-450">
      <Avatar />
      <div className="flex flex-col">
        <div className="flex items-center gap-8">
          <span className="font-bold text-black font-Pretendard text-14">{comment?.author.nickname}</span>
          <span className="font-normal text-gray-9FA6 font-Pretendard text-12">
            {format(comment?.createdAt as string, "yyyy-MM-dd HH:mm")}
          </span>
        </div>
        {isEditing ? (
          <textarea
            className="p-16 mt-6 font-normal leading-normal outline-none resize-none text-12 tablet:text-14 border-1 w-270 tablet:w-400 h-70 tablet:h-110 rounded-6 border-gray-D9D9 focus:border-violet placeholder:text-gray-9FA6 font-Pretendard"
            value={editingComment}
            onChange={(e) => setEditingComment(e.target.value)}
          />
        ) : (
          <div className="mt-6 font-normal text-black w-270 tablet:w-400 font-Pretendard text-12 tablet:text-14">
            {comment?.content}
          </div>
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
