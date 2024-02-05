import { createUrlWithQueryString } from "@/lib/util/createUrlWithQueryString";
import { memberAddress } from "../address";
import { ServiceResponse, service } from "../axios";
import { FindMembersRequestDto, MemberListResponseDto } from "./schema";
import { AxiosRequestConfig } from "axios";

/**
 * 대시보드의 멤버 목록을 조회하는 함수입니다.
 *
 * @param {FindMembersRequestDto} qs - 멤버 목록 조회를 위한 쿼리 스트링 데이터
 * @returns {Promise<ServiceResponse<MemberListResponseDto>>} 멤버 목록 서비스 응답을 포함하는 프로미스
 */
export const memberList = (
  qs: FindMembersRequestDto,
  config: AxiosRequestConfig = {},
): Promise<ServiceResponse<MemberListResponseDto>> =>
  service("get", createUrlWithQueryString(memberAddress.member, qs), undefined, config);

/**
 * 특정 멤버를 삭제하는 함수입니다.
 *
 * @param {number} memberId - 삭제할 멤버의 ID
 * @returns {Promise<ServiceResponse<any>>} 서비스 응답을 포함하는 프로미스
 */
export const deleteMember = (memberId: number) => service("delete", memberAddress.memberId(memberId));
