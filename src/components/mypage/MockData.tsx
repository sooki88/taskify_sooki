// import axios from "axios";

// const instance = axios.create({ baseURL: "https://sp-taskify-api.vercel.app/2-7" });
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTg4LCJ0ZWFtSWQiOiIyLTciLCJpYXQiOjE3MDYxNDk5NTQsImlzcyI6InNwLXRhc2tpZnkifQ.oRWlJ7hqt4K52KObn5Q02vbZlvH_YlzXtgpDJ6T1-5M";

// export const getUser = async () => {
//   try {
//     const res = await instance.get("/users/me", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const result = await res.data;
//     return result;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getDashboards = async () => {
//   try {
//     const res = await instance.get("/dashboards", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         navigationMethod: "infiniteScroll",
//       },
//     });
//     const result = await res.data.dashboards;
//     return result;
//   } catch (err) {
//     console.log(err);
//   }
// };

export const Mock_MyData = {
  id: 657,
  email: "dex@naver.com",
  nickname: "김진영",
  profileImageUrl: null,
  createdAt: "2024-01-29T17:38:10.326Z",
  updatedAt: "2024-01-29T17:38:10.326Z",
};

export const Mock_DashBoard = [
  {
    id: 2564,
    title: "중급 프로젝트",
    color: "#7ac555",
    userId: 588,
    createdAt: "2024-01-26T22:22:53.928Z",
    updatedAt: "2024-01-26T22:22:53.928Z",
    createdByMe: true,
  },
  {
    id: 2527,
    title: "초급 프로젝트",
    color: "#ffa500",
    userId: 588,
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
];
