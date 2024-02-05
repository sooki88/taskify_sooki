export type CardServiceResponseDto = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string | null;
  assignee: {
    profileImageUrl: string | null;
    nickname: string;
    id: number;
  };
  imageUrl: string | null;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
};

export type CardServiceFindResponseDto = {
  cursorId: number | null;
  totalCount: number;
  cards: CardServiceResponseDto[];
};

export type CreateCardRequestDto = {
  assigneeUserId?: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string;
};

export type FindCardsRequestDto = {
  columnId: number;
  size?: number;
  cursorId?: number;
};

export type UpdateCardRequestDto = {
  columnId: number;
  assigneeUserId: number | null;
  title: string;
  description: string;
  dueDate: string | null;
  tags: string[];
  imageUrl: string | null;
};
