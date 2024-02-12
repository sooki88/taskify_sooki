import { createUrlWithQueryString } from "@/lib/util/createUrlWithQueryString";
import { dashboardAddress } from "../address";
import { HttpMethod, ServiceResponse, service } from "../axios";
import { CreateDashboardInvitationRequestDto, InvitationServiceResponseDto } from "../invitations/schema";
import {
  DashboardApplicationServiceResponseDto,
  DashboardRequestDto,
  FIndDashboardInvitationsRequestDto,
  FindDashboardsRequestDto,
  FindDashboardsResponseDto,
} from "./schema";
import { AxiosRequestConfig } from "axios";

/**
 * 새로운 대시보드를 생성하는 함수입니다.
 *
 * @param {DashboardRequestDto} data - 대시보드 생성을 위한 데이터
 * @returns {Promise<ServiceResponse<DashboardApplicationServiceResponseDto>>} 서비스 응답을 포함하는 프로미스
 */
export const createDashboard = (
  data: DashboardRequestDto,
): Promise<ServiceResponse<DashboardApplicationServiceResponseDto>> =>
  service("post", dashboardAddress.dashboard, data);

/**
 * 대시보드를 조회하는 함수입니다.
 *
 * @param {FindDashboardsRequestDto} [qs] - 대시보드 조회를 위한 선택적 쿼리 스트링 데이터
 * @returns {Promise<ServiceResponse<FindDashboardsResponseDto>>} 서비스 응답을 포함하는 프로미스
 */
export const findDashboard = (qs?: FindDashboardsRequestDto): Promise<ServiceResponse<FindDashboardsResponseDto>> =>
  service("get", createUrlWithQueryString(dashboardAddress.dashboard, qs));

/**
 * 대시보드에 대한 다양한 작업을 수행하는 함수입니다. HTTP 메소드에 따라 다른 작업을 수행합니다.
 *
 * @param {HttpMethod} method - 사용할 HTTP 메소드
 * @param {number} dashboardId - 작업 대상 대시보드 ID
 * @param {DashboardRequestDto} data - 대시보드 업데이트를 위한 데이터
 * @returns {Promise<ServiceResponse<DashboardApplicationServiceResponseDto>>} 서비스 응답을 포함하는 프로미스
 */
export const dashboard = (
  method: HttpMethod,
  dashboardId: number,
  data?: DashboardRequestDto,
  config: AxiosRequestConfig = {},
) => {
  switch (method) {
    case "get":
      return service(method, dashboardAddress.dashboardId(dashboardId), undefined, config) as Promise<
        ServiceResponse<DashboardApplicationServiceResponseDto>
      >;
    case "delete":
      return service(method, dashboardAddress.dashboardId(dashboardId));
    case "put":
      return service(method, dashboardAddress.dashboardId(dashboardId), data) as Promise<
        ServiceResponse<DashboardApplicationServiceResponseDto>
      >;
  }
};

/**
 * 대시보드에 대한 초대를 생성하는 함수입니다.
 *
 * @param {number} dashboardId - 초대를 생성할 대시보드 ID
 * @param {CreateDashboardInvitationRequestDto} data - 대시보드 초대 생성을 위한 데이터
 * @returns {Promise<ServiceResponse<InvitationServiceResponseDto>>} 서비스 응답을 포함하는 프로미스
 */
export const createInvitationDashboard = (
  dashboardId: number,
  data: CreateDashboardInvitationRequestDto,
): Promise<ServiceResponse<InvitationServiceResponseDto>> =>
  service("post", dashboardAddress.inviteboard(dashboardId), data);

/**
 * 대시보드의 초대를 조회하는 함수입니다.
 *
 * @param {number} dashboardId - 초대를 조회할 대시보드 ID
 * @param {FIndDashboardInvitationsRequestDto} qs - 대시보드 초대 조회를 위한 쿼리 스트링 데이터
 * @returns {Promise<ServiceResponse<InvitationServiceResponseDto>>} 초대 서비스 응답을 포함하는 프로미스
 */
export const findInvitationDashboard = (
  dashboardId: number,
  qs: FIndDashboardInvitationsRequestDto,
): Promise<ServiceResponse<InvitationServiceResponseDto>> =>
  service("get", createUrlWithQueryString(dashboardAddress.inviteboard(dashboardId), qs));

/**
 * 대시보드의 초대를 삭제하는 함수입니다.
 *
 * @param {number} dashboardId - 초대를 삭제할 대시보드 ID
 * @param {number} invitationId - 삭제할 초대 ID
 * @returns {Promise<ServiceResponse<void>>} 서비스 응답을 포함하는 프로미스
 */
export const deleteInvitationDashboard = (dashboardId: number, invitationId: number) =>
  service("delete", dashboardAddress.inviteboardDelete(dashboardId, invitationId));
