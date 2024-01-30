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
      <div className="flex flex-col gap-5 w-287 tablet:w-450 relative">
        <label className="font-Pretendard text-xl font-medium leading-normal">댓글</label>
        <div className="w-full h-70 tablet:h-110 p-16 rounded-6 border-2 border-gray-D9D9 outline-none focus-within:border-violet placeholder:text-gray-9FA6 font-Pretendard text-base font-normal leading-normal">
          <textarea
            className="w-320 h-full resize-none outline-none"
            placeholder="댓글 작성하기"
            value={comment}
            onChange={handleChange}></textarea>
        </div>
        <div className="absolute bottom-15 right-15">
          <Button variant="input" onClick={handleSubmit}>
            입력
          </Button>
        </div>
      </div>
      <div>
        {commentList.map((comment, index) => (
          <Comments key={index} comment={comment} onDelete={() => handleDelete(index)} />
        ))}
      </div>
    </>
  );
}

export default CommentInput;
