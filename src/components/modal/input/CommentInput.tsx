import { ChangeEvent, useState } from "react";
import Comments from "../Comments";
import Button from "@/components/common/Button";

function CommentInput() {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim() !== "") {
      setCommentList([comment, ...commentList]);
      setComment("");
    }
  };

  const handleDelete = (id: number) => {
    const updatedComments = commentList.filter((_, index) => index !== id);
    setCommentList(updatedComments);
  };

  return (
    <>
      <div className="relative flex flex-col w-full gap-5">
        <label className="text-xl font-medium leading-normal font-Pretendard">댓글</label>
        <div className="w-full p-16 text-base font-normal leading-normal outline-none border-1 h-70 tablet:h-110 rounded-6 border-gray-D9D9 focus-within:border-violet placeholder:text-gray-9FA6 font-Pretendard">
          <textarea
            className="h-full outline-none resize-none w-200 tablet:w-350"
            placeholder="댓글 작성하기"
            value={comment}
            onChange={handleChange}></textarea>
        </div>
        <div className="absolute bottom-15 right-15">
          <Button variant="ghost" width={77} height={32} fontsize={12} onClick={handleSubmit}>
            입력
          </Button>
        </div>
      </div>
      {commentList && commentList.length > 0 && (
        <div className="overflow-auto max-h-150 w-300 tablet:w-470">
          {commentList.map((comment, index) => (
            <Comments key={index} comment={comment} onDelete={() => handleDelete(index)} />
          ))}
        </div>
      )}
    </>
  );
}

export default CommentInput;
