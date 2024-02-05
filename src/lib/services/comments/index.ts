import { createUrlWithQueryString } from "@/lib/util/createUrlWithQueryString";
import { commentAddress } from "../address";
import { HttpMethod, ServiceResponse, service } from "../axios";
import {
  CommentServiceDto,
  CreateCommentRequestDto,
  FindCommentsRequestDto,
  FindCommentsResponseDto,
  UpdateCommentRequestDto,
} from "./schema";

/**
 * 새로운 댓글을 생성하는 함수입니다.
 *
 * @param {CreateCommentRequestDto} data - 댓글 생성을 위한 데이터
 * @returns {Promise<ServiceResponse<CommentServiceDto>>} 댓글 서비스 응답을 포함하는 프로미스
 */
export const createComment = (data: CreateCommentRequestDto): Promise<ServiceResponse<CommentServiceDto>> =>
  service("post", commentAddress.comment, data);

/**
 * 댓글을 조회하는 함수입니다.
 *
 * @param {FindCommentsRequestDto} qs - 댓글 조회를 위한 쿼리 스트링 데이터
 * @returns {Promise<ServiceResponse<CommentServiceDto>>} 댓글 서비스 응답을 포함하는 프로미스
 */
export const findComments = (qs: FindCommentsRequestDto): Promise<ServiceResponse<FindCommentsResponseDto>> => {
  return service("get", createUrlWithQueryString(commentAddress.comment, qs));
};

/**
 * 댓글에 대한 다양한 작업을 수행하는 함수입니다. HTTP 메소드에 따라 다른 작업을 수행합니다.
 *
 * @param {HttpMethod} method - 사용할 HTTP 메소드
 * @param {number} commentId - 작업 대상 댓글 ID
 * @param {UpdateCommentRequestDto} data - 댓글 업데이트를 위한 데이터
 * @returns {Promise<ServiceResponse<CommentServiceDto>>} 댓글 서비스 응답을 포함하는 프로미스
 * @throws {Error} 유효하지 않은 HTTP 메소드가 제공될 경우 오류를 발생시킵니다.
 */
export const comment = (method: HttpMethod, commentId: number, data: UpdateCommentRequestDto) => {
  switch (method) {
    case "delete":
      return service(method, commentAddress.commentId(commentId));
    case "put":
      return service(method, commentAddress.commentId(commentId), data) as Promise<ServiceResponse<CommentServiceDto>>;
    default:
      throw Error("Invalid HTTP method");
  }
};
