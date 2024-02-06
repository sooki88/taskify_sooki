import { createUrlWithQueryString } from "@/lib/util/createUrlWithQueryString";
import { cardAddress } from "../address";
import { HttpMethod, ServiceResponse, service } from "../axios";
import {
  CardServiceFindResponseDto,
  CardServiceResponseDto,
  CreateCardRequestDto,
  FindCardsRequestDto,
  UpdateCardRequestDto,
} from "./schema";
/**
 * 새로운 카드를 생성하는 함수입니다.
 *
 * @param {CreateCardRequestDto} data - 카드 생성을 위한 데이터
 * @returns {Promise<ServiceResponse<CardServiceResponseDto>>} 서비스 응답을 포함하는 프로미스
 */
export const createCard = (data: CreateCardRequestDto): Promise<ServiceResponse<CardServiceResponseDto>> =>
  service("post", cardAddress.card, data);
/**
 * 카드를 조회하는 함수입니다.
 *
 * @param {FindCardsRequestDto} [qs] - 카드 조회를 위한 선택적 쿼리 스트링 데이터
 * @returns {Promise<ServiceResponse<CardServiceFindResponseDto>>} 서비스 응답을 포함하는 프로미스
 */
export const findCards = (qs: FindCardsRequestDto): Promise<ServiceResponse<CardServiceFindResponseDto>> =>
  service("get", createUrlWithQueryString(cardAddress.card, qs));

/**
 * 카드에 대한 다양한 작업을 수행하는 함수입니다. HTTP 메소드에 따라 다른 작업을 수행합니다.
 *
 * @param {HttpMethod} method - 사용할 HTTP 메소드
 * @param {number} cardId - 작업 대상 카드 ID
 * @param {UpdateCardRequestDto} [data] - 카드 업데이트를 위한 선택적 데이터
 * @returns {Promise<ServiceResponse<T>>} 서비스 응답을 포함하는 프로미스
 * @throws {Error} 유효하지 않은 HTTP 메소드가 제공될 경우 오류를 발생시킵니다.
 */
export const card = (method: HttpMethod, cardId: number, data?: UpdateCardRequestDto) => {
  switch (method) {
    case "get":
      return service(method, cardAddress.cardId(cardId)) as Promise<ServiceResponse<CardServiceResponseDto>>;
    case "delete":
      return service(method, cardAddress.cardId(cardId));
    case "put":
      return service(method, cardAddress.cardId(cardId), data) as Promise<ServiceResponse<CardServiceResponseDto>>;
    default:
      throw Error("Invalid HTTP method");
  }
};
