import { createUrlWithQueryString } from "@/lib/util/createUrlWithQueryString";
import { columnAddress } from "../address";
import { HttpMethod, ServiceResponse, service } from "../axios";
import {
  ColumnServiceResponseDto,
  CreateColumnRequestDto,
  FindColumnsRequestDto,
  ResponsePayload_ColumnServiceResponseDto,
  UpdateColumnRequestDto,
} from "./schema";

/**
 * 새로운 컬럼을 생성하는 함수입니다.
 *
 * @param {CreateColumnRequestDto} data - 컬럼 생성을 위한 데이터
 * @returns {Promise<ServiceResponse<ColumnServiceResponseDto>>} 컬럼 서비스 응답을 포함하는 프로미스
 */
export const createColumn = (data: CreateColumnRequestDto): Promise<ServiceResponse<ColumnServiceResponseDto>> =>
  service("post", columnAddress.column, data);

/**
 * 컬럼을 조회하는 함수입니다.
 *
 * @param {FindColumnsRequestDto} [qs] - 컬럼 조회를 위한 선택적 쿼리 스트링 데이터
 * @returns {Promise<ServiceResponse<ResponsePayload_ColumnServiceResponseDto>>} 컬럼 서비스 응답을 포함하는 프로미스
 */
export const findColumns = (
  qs?: FindColumnsRequestDto,
): Promise<ServiceResponse<ResponsePayload_ColumnServiceResponseDto>> =>
  service("get", createUrlWithQueryString(columnAddress.column, qs));

/**
 * 컬럼에 대한 다양한 작업을 수행하는 함수입니다. HTTP 메소드에 따라 다른 작업을 수행합니다.
 *
 * @param {HttpMethod} method - 사용할 HTTP 메소드
 * @param {number} columnId - 작업 대상 컬럼 ID
 * @param {UpdateColumnRequestDto} [data] - 컬럼 업데이트를 위한 선택적 데이터
 * @returns {Promise<ServiceResponse<ColumnServiceResponseDto>>} 서비스 응답을 포함하는 프로미스
 * @throws {Error} 유효하지 않은 HTTP 메소드가 제공될 경우 오류를 발생시킵니다.
 */
export const column = (method: HttpMethod, columnId: number, data?: UpdateColumnRequestDto) => {
  switch (method) {
    case "delete":
      return service(method, columnAddress.columnId(columnId));
    case "put":
      return service(method, columnAddress.columnId(columnId), data) as Promise<
        ServiceResponse<ColumnServiceResponseDto>
      >;
    default:
      throw Error("Invalid HTTP method");
  }
};

/**
 * 컬럼에 이미지를 업로드하는 함수입니다.
 *
 * @param {number} columnId - 이미지를 업로드할 컬럼 ID
 * @param {string} imageUrl - 업로드할 이미지의 URL
 * @returns {Promise<any>} 서비스 응답을 포함하는 프로미스
 * @throws {Error} 컬럼 ID가 제공되지 않을 경우 오류를 발생시킵니다.
 */
export const cardUpload = (columnId: number, imageUrl: string): Promise<any> => {
  if (!columnId) throw Error("Column ID is required for image upload");
  return service("post", columnAddress.uploadColumn(columnId), imageUrl);
};
