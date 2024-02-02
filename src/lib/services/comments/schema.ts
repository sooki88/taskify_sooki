export type CommentServiceDto = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string | null;
    nickname: string;
    id: number;
  };
};

export type CreateCommentRequestDto = {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
};

export type FindCommentsRequestDto = {
  cardId: number;
  size?: number;
  cursorId?: number;
};

export type UpdateCommentRequestDto = {
  content: string;
};

export type DashboardApplicationServiceResponseDto = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};
