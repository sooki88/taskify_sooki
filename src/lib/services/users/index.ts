import { HttpMethod, ServiceResponse, service } from "../axios";
import { userAddress } from "../address";
import { UserServiceResponseDto } from "../auth/schema";
import { CreateUserRequestDto, UpdateMyInfoRequestDto, updateMyInfoResponseDto } from "./schema";

/**
 * 새로운 사용자를 등록하는 함수입니다.
 *
 * @param {CreateUserRequestDto} data - 사용자 등록을 위한 데이터
 * @returns {Promise<ServiceResponse<UserServiceResponseDto>>} 서비스 응답을 포함하는 프로미스
 */
export const register = (data: CreateUserRequestDto): Promise<ServiceResponse<UserServiceResponseDto>> =>
  service("post", userAddress.user, data);

/**
 * 현재 사용자의 정보를 조회하거나 업데이트하는 함수입니다.
 *
 * @param {HttpMethod} method - 사용할 HTTP 메소드 ('get' 또는 'put')
 * @param {UpdateMyInfoRequestDto} [data] - 사용자 정보 업데이트를 위한 데이터
 * @returns {Promise<ServiceResponse<UserServiceResponseDto>>} 서비스 응답을 포함하는 프로미스
 * @throws {Error} 유효하지 않은 HTTP 메소드가 제공될 경우 오류를 발생시킵니다.
 */
export const me = (
  method: HttpMethod,
  data?: UpdateMyInfoRequestDto,
): Promise<ServiceResponse<UserServiceResponseDto>> => {
  if (method === "put") {
    return service(method, userAddress.mypage, data);
  } else if (method === "get") {
    return service(method, userAddress.mypage);
  } else {
    throw Error("Invalid HTTP method");
  }
};

/**
 * 사용자의 이미지를 업로드하는 함수입니다.
 *
 * @param {string} formData - 업로드할 이미지의 URL
 * @returns {Promise<ServiceResponse<updateMyInfoResponseDto>>} 서비스 응답을 포함하는 프로미스
 */
export const meUpload = (formData: FormData): Promise<ServiceResponse<updateMyInfoResponseDto>> =>
  service("post", userAddress.upload, formData);
