import { authAddress } from "../address";
import { ServiceResponse, service } from "../axios";
import { ChangePasswordRequestDto, LoginRequestDto, UserServiceResponseDto } from "./schema";
/**
 * 사용자 로그인을 위한 함수입니다.
 *
 * @param {LoginRequestDto} data - 로그인 요청에 필요한 사용자 데이터
 * @returns {Promise<ServiceResponse<UserServiceResponseDto>>} 사용자 서비스 응답 데이터를 포함하는 프로미스
 */
export const login = (data: LoginRequestDto): Promise<ServiceResponse<UserServiceResponseDto>> =>
  service("post", authAddress.loginAuth, data);
/**
 * 사용자 비밀번호 변경을 위한 함수입니다.
 *
 * @param {ChangePasswordRequestDto} data - 비밀번호 변경 요청에 필요한 사용자 데이터
 * @returns {Promise<ServiceResponse<any>>} 일반 서비스 응답을 포함하는 프로미스
 */
export const changePassword = (data: ChangePasswordRequestDto) => service("put", authAddress.password, data);
