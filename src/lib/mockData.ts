/**  내 정보 조회 데이터 */
export const userData = {
  id: 657,
  email: "dex@naver.com",
  nickname: "강아지",
  profileImageUrl: null,
  createdAt: "2024-01-29T17:38:10.326Z",
  updatedAt: "2024-01-29T17:38:10.326Z",
};

/**  대시보드 멤버 목록 조회 데이터 */
export const members = {
  members: [
    {
      id: 3781,
      email: "dex@naver.com",
      nickname: "강아지",
      profileImageUrl: null,
      createdAt: "2024-01-29T17:38:10.326Z",
      updatedAt: "2024-01-29T17:38:10.326Z",
      isOwner: true,
      userId: 657,
    },
    {
      id: 3790,
      email: "a@a.com",
      nickname: "고양이",
      profileImageUrl: null,
      createdAt: "2024-01-31T19:38:27.804Z",
      updatedAt: "2024-02-01T16:04:47.844Z",
      isOwner: false,
      userId: 711,
    },
  ],
  totalCount: 2,
};

/** 대시보드 상세 조회 데이터 */
export const dashboard = {
  id: 2564,
  title: "중급 프로젝트",
  color: "#7ac555",
  userId: 657,
  createdAt: "2024-01-26T22:22:53.928Z",
  updatedAt: "2024-01-26T22:22:53.928Z",
  createdByMe: true,
};

/** 대시보드 목록 조회 데이터 */
export const dashBoardList = {
  dashboards: [
    {
      id: 2564,
      title: "중급 프로젝트",
      color: "#7ac555",
      userId: 657,
      createdAt: "2024-01-26T22:22:53.928Z",
      updatedAt: "2024-01-26T22:22:53.928Z",
      createdByMe: true,
    },
    {
      id: 2527,
      title: "초급 프로젝트",
      color: "#ffa500",
      userId: 657,
      createdAt: "2024-01-25T12:38:59.461Z",
      updatedAt: "2024-01-25T12:38:59.461Z",
      createdByMe: true,
    },
    {
      id: 2615,
      title: "제로코카콜라",
      color: "#760DDE",
      userId: 658,
      createdAt: "2024-01-30T13:07:45.642Z",
      updatedAt: "2024-01-30T13:07:45.642Z",
      createdByMe: false,
    },
  ],
  totalCount: 3,
  cursorId: null,
};

/** 컬럼 목록 조회 */
export const Columns = {
  result: "SUCCESS",
  data: [
    {
      id: 8997,
      title: "To do",
      teamId: "2-7",
      dashboardId: 2564,
      createdAt: "2024-01-31T11:01:49.262Z",
      updatedAt: "2024-01-31T11:01:49.262Z",
    },
    {
      id: 8998,
      title: "On progress",
      teamId: "2-7",
      dashboardId: 2564,
      createdAt: "2024-01-31T11:01:49.262Z",
      updatedAt: "2024-01-31T11:01:49.262Z",
    },
    {
      id: 8999,
      title: "Done",
      teamId: "2-7",
      dashboardId: 2564,
      createdAt: "2024-01-31T11:01:49.262Z",
      updatedAt: "2024-01-31T11:01:49.262Z",
    },
    {
      id: 9000,
      title: "컬럼",
      teamId: "2-7",
      dashboardId: 2564,
      createdAt: "2024-01-31T20:02:43.050Z",
      updatedAt: "2024-01-31T20:02:43.050Z",
    },
  ],
};

/** 카드 목록 조회 데이터 */
export const cardList = {
  cards: [
    {
      id: 2200,
      title: "새로운 일정 관리 Taskify",
      description: "화이팅~!",
      tags: ["7팀", "테스트", "사진없음"],
      dueDate: "2024-03-11 11:11",
      assignee: {
        id: 657,
        nickname: "강아지",
        profileImageUrl: null,
      },
      imageUrl: null,
      teamId: "2-7",
      dashboardId: 2564,
      columnId: 8897,
      createdAt: "2024-01-31T20:08:15.541Z",
      updatedAt: "2024-01-31T20:08:15.541Z",
    },
    {
      id: 2201,
      title: "새로운 일정 관리 Taskify",
      description: "string",
      tags: ["7팀", "테스트", "사진 있음"],
      dueDate: "2024-03-11 11:11",
      assignee: {
        id: 657,
        nickname: "강아지",
        profileImageUrl: null,
      },
      imageUrl:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/2-7_9001_1706699170071.jpeg",
      teamId: "2-7",
      dashboardId: 2564,
      columnId: 8897,
      createdAt: "2024-01-31T20:08:33.456Z",
      updatedAt: "2024-01-31T20:08:33.456Z",
    },

    {
      id: 2209,
      title: "새로운 일정 관리 Taskify",
      description: "새로운 일정 관리 Taskify",
      tags: [],
      dueDate: "2024-03-11 11:11",
      assignee: {
        id: 657,
        nickname: "강아지",
        profileImageUrl: null,
      },
      imageUrl: null,
      teamId: "2-7",
      dashboardId: 2564,
      columnId: 8897,
      createdAt: "2024-01-31T20:26:48.097Z",
      updatedAt: "2024-01-31T20:26:48.097Z",
    },
    {
      id: 2210,
      title: "새로운 일정 관리 Taskify",
      description: "새로운 일정 관리 Taskify",
      tags: ["duedate없음"],
      dueDate: null,
      assignee: {
        id: 657,
        nickname: "강아지",
        profileImageUrl: null,
      },
      imageUrl: null,
      teamId: "2-7",
      dashboardId: 2711,
      columnId: 8897,
      createdAt: "2024-01-31T20:27:32.853Z",
      updatedAt: "2024-01-31T20:27:32.853Z",
    },
  ],
  totalCount: 4,
  cursorId: null,
};

/** 카드 상세 조회 데이터 */
export const card = {
  id: 2200,
  title: "새로운 일정 관리 Taskify",
  description: "화이팅~!",
  tags: ["7팀", "테스트", "사진없음"],
  dueDate: "2024-03-11 11:11",
  assignee: {
    id: 657,
    nickname: "강아지",
    profileImageUrl: null,
  },
  imageUrl: null,
  teamId: "2-7",
  dashboardId: 2564,
  columnId: 8897,
  createdAt: "2024-01-31T20:08:15.541Z",
  updatedAt: "2024-01-31T20:08:15.541Z",
};

/** 댓글 목록 조회 데이터 */
export const comments = {
  comments: [
    {
      id: 2661,
      content: "감사합니다 ㅎㅎ 굿굿",
      createdAt: "2024-02-02T15:55:21.472Z",
      updatedAt: "2024-02-02T15:55:21.472Z",
      cardId: 2200,
      author: {
        id: 657,
        nickname: "강아지",
        profileImageUrl: null,
      },
    },
    {
      id: 2660,
      content: "좋네여 ㅋㅋ 고생하셨습니다^^",
      createdAt: "2024-02-02T15:55:10.235Z",
      updatedAt: "2024-02-02T15:55:10.235Z",
      cardId: 2200,
      author: {
        id: 711,
        nickname: "고양이",
        profileImageUrl: null,
      },
    },
  ],
  cursorId: null,
};
/** 해당 대시보드에 초대한 내역리스트 데이터 */
export const sentInvitations = {
  invitations: [
    {
      id: 2866,
      inviter: {
        id: 657,
        email: "dex@naver.com",
        nickname: "강아지",
      },
      teamId: "2-7",
      dashboard: {
        id: 2564,
        title: "중급 프로젝트",
      },
      invitee: {
        id: 755,
        email: "abc@a.com",
        nickname: "호랑이",
      },
      inviteAccepted: null,
      createdAt: "2024-02-02T16:02:36.621Z",
      updatedAt: "2024-02-02T16:02:36.621Z",
    },
    {
      id: 2865,
      inviter: {
        id: 657,
        email: "dex@naver.com",
        nickname: "강아지",
      },
      teamId: "2-7",
      dashboard: {
        id: 2564,
        title: "중급 프로젝트",
      },
      invitee: {
        id: 795,
        email: "hello@naver.com",
        nickname: "펭귄",
      },
      inviteAccepted: null,
      createdAt: "2024-02-02T16:01:13.422Z",
      updatedAt: "2024-02-02T16:01:13.422Z",
    },
  ],
  totalCount: 2,
};

/** 내가 초대받은 대시보드 목록 데이터 */
export const receivedInvitations = {
  invitations: [
    {
      id: 2865,
      inviter: {
        id: 795,
        email: "hello@naver.com",
        nickname: "펭귄",
      },
      teamId: "2-7",
      dashboard: {
        id: 2718,
        title: "엄청 어려운 프로젝트",
      },
      invitee: {
        id: 657,
        email: "dex@naver.com",
        nickname: "강아지",
      },
      inviteAccepted: null,
      createdAt: "2024-02-02T16:01:13.422Z",
      updatedAt: "2024-02-02T16:01:13.422Z",
    },
    {
      id: 2864,
      inviter: {
        id: 709,
        email: "bobby@naver.com",
        nickname: "바비",
      },
      teamId: "2-7",
      dashboard: {
        id: 2800,
        title: "일본 여행 계획",
      },
      invitee: {
        id: 657,
        email: "dex@naver.com",
        nickname: "강아지",
      },
      inviteAccepted: null,
      createdAt: "2024-02-02T16:00:37.231Z",
      updatedAt: "2024-02-02T16:00:37.231Z",
    },
  ],
  cursorId: null,
};
