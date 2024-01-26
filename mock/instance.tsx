import axios from "axios";

const instance = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/2-7",
});

// interface PostCardProps {
//   assigneeUserId: number;
//   dashboardId: number;
//   columnId: number;
//   title: string;
//   description: string;
//   dueDate: string;
//   tags: string[];
//   imageUrl: string;
// }
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTg4LCJ0ZWFtSWQiOiIyLTciLCJpYXQiOjE3MDYxNDk5NTQsImlzcyI6InNwLXRhc2tpZnkifQ.oRWlJ7hqt4K52KObn5Q02vbZlvH_YlzXtgpDJ6T1-5M";

export const postCard = async () => {
  const body = {
    assigneeUserId: 588,
    dashboardId: 2527,
    columnId: 8398,
    title: "오전 팀미팅",
    description: "오전 11시에 팀미팅을 진행하려고 합니다.",
    dueDate: "2024-02-10 00:00",
    tags: ["스프린트", "코드잇", "프로젝트", "2-7팀", "테스트"],
    imageUrl: "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/1-7_8278_1706167101191.png",
  };

  try {
    const response = await instance.post("/cards", body, {
      headers: {
        Authorization: `Bearer ${token}`, // Assuming it's a JWT token
      },
    });
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};

export const getCardDetail = async () => {
  try {
    const res = await instance.get("/cards/2101", {
      headers: {
        Authorization: `Bearer ${token}`,
        //   Authorization:
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTg4LCJ0ZWFtSWQiOiIyLTciLCJpYXQiOjE3MDYxNDk5NTQsImlzcyI6InNwLXRhc2tpZnkifQ.oRWlJ7hqt4K52KObn5Q02vbZlvH_YlzXtgpDJ6T1-5M",
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getColumns = async () => {
  try {
    const res = await instance.get("/columns", {
      headers: {
        Authorization: `Bearer ${token}`,
        //   Authorization:
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTg4LCJ0ZWFtSWQiOiIyLTciLCJpYXQiOjE3MDYxNDk5NTQsImlzcyI6InNwLXRhc2tpZnkifQ.oRWlJ7hqt4K52KObn5Q02vbZlvH_YlzXtgpDJ6T1-5M",
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
