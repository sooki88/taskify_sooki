export type MemberApplicationServiceResponseDto = {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
};

export type FindMembersRequestDto = {
  page?: number;
  size?: number;
  dashboardId: number;
};

export type MemberListResponseDto = {
  members: MemberApplicationServiceResponseDto[];
  totalCount: number;
};
