import { createUrlWithQueryString } from "@/lib/util/createUrlWithQueryString";
import { invitationAddress } from "../address";
import { ServiceResponse, service } from "../axios";
import { FindInvitationsRequestDto, InvitaionServiceResponseDto } from "./schema";

/**
 * 초대장을 조회하는 함수입니다.
 *
 * @param {FindInvitationsRequestDto} qs - 초대장 조회를 위한 쿼리 스트링 데이터
 * @returns {Promise<ServiceResponse<InvitaionServiceResponseDto>>} 초대장 서비스 응답을 포함하는 프로미스
 */
export const invitation = (qs?: FindInvitationsRequestDto) =>
  service("get", createUrlWithQueryString(invitationAddress.invitation, qs));

/**
 * 초대에 대한 응답을 처리하는 함수입니다.
 *
 * @param {number} invitationId - 응답할 초대장의 ID
 * @param {boolean} inviteAccepted - 초대 수락 여부
 * @returns {Promise<ServiceResponse<InvitaionServiceResponseDto>>} 초대장 서비스 응답을 포함하는 프로미스
 */
export const responseInvitation = (
  invitationId: number,
  inviteAccepted: boolean,
): Promise<ServiceResponse<InvitaionServiceResponseDto>> =>
  service("put", invitationAddress.invitationId(invitationId), {
    inviteAccepted,
  });
