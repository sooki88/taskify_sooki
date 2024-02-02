
export type ColumnServiceResponseDto = {
  id: number;
  title: string;
  teamId: string;
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
  data: ColumnServiceResponseDto[] | null;
};

export type UpdateColumnRequestDto = {
  title: string;
};
