export type UserServiceReponseDto = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type LoginRequestDto = {
  email: string;
  password: string;
};

export type ChangePasswordRequestDto = {
  password: string;
  newPassword: string;
};
