export type ColumnServiceResponseDto = {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateColumnRequestDto = {
  title: string;
  dashboardId: number;
};

export type FindColumnsRequestDto = {
  dashboardId: number;
};

export type ResponsePayload_ColumnServiceResponseDto = {
  result: "SUCCESS";
  data: ColumnServiceResponseDto[];
};

export type UpdateColumnRequestDto = {
  title: string;
};
