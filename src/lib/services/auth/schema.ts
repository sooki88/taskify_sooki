export type UserServiceResponseDto = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  accessToken: string;
};

export type LoginRequestDto = {
  email: string;
  password: string;
};

export type ChangePasswordRequestDto = {
  password: string;
  newPassword: string;
};
