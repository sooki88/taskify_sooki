export type FindMembersRequestDto = {
  page?: number;
  size?: number;
  dashboardId: number;
};

export type CreateUserRequestDto = {
  email: string;
  nickname: string;
  password: string;
};

export type UpdateMyInfoRequestDto = {
  nickname: string;
  profileImageUrl: string | null;
};

export type updateMyInfoResponseDto = {
  profileImageUrl: "string";
};
