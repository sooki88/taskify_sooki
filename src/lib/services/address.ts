export const authAddress = {
  loginAuth: "/auth/login",
  password: "/auth/password",
};

export const cardAddress = {
  //get,post
  card: "/cards",
  //get,put,delete
  cardId: (cardId: number) => `/cards/${cardId}`,
};

export const columnAddress = {
  //get,post
  column: "/columns",
  //put, delete
  columnId: (columnId: number) => `/columns/${columnId}`,
  //post
  uploadColumn: (columnId: number) => `/columns/${columnId}/card-image`,
};

export const commentAddress = {
  //get, post
  comment: "/comments",
  //put, delete
  commentId: (commentId: number) => `/comments/${commentId}`,
};

export const dashboardAddress = {
  //get,post
  dashboard: "/dashboards",
  //get,put,delete
  dashboardId: (dashboardId: number) => `/dashboards/${dashboardId}`,
  //get,post
  inviteboard: (dashboardId: number) => `/dashboards/${dashboardId}/invitations`,
  //delete
  inviteboardDelete: (dashboardId: number, invitationId: number) =>
    `/dashboards/${dashboardId}/invitations/${invitationId}`,
};

export const invitationAddress = {
  //get
  invitation: "/invitations",
  //put
  invitationId: (invitationId: number) => `invitations/${invitationId}`,
};

export const memberAddress = {
  //get
  member: `/members`,
  //delete
  memberId: (memberId: number) => `/members/${memberId}`,
};

export const userAddress = {
  //post
  user: "/users",
  //get, put
  mypage: "/users/me",
  //post
  upload: "/users/me/image",
};
