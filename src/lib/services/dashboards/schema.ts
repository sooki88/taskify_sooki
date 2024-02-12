export type DashboardRequestDto = {
  title: string;
  color: string;
};

export type DashboardInvitationRequestDto = {
  email: string;
};

export type FIndDashboardInvitationsRequestDto = {
  page?: number;
  size?: number;
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

export type NavigationMethodString = "infiniteScroll" | "pagination";

export type FindDashboardsRequestDto = {
  navigationMethod: NavigationMethodString;
  cursorId?: number | null;
  page?: number;
  size?: number;
};

export type FindDashboardsResponseDto = {
  cursorId: number | null;
  totalCount: number;
  dashboards: DashboardApplicationServiceResponseDto[];
};
