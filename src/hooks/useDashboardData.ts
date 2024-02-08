import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { dashboard, findDashboard } from "@/lib/services/dashboards";
import { me } from "@/lib/services/users";
import { DashboardApplicationServiceResponseDto, FindDashboardsResponseDto } from "@/lib/services/dashboards/schema";
import { UserServiceResponseDto } from "@/lib/services/auth/schema";

export const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState<DashboardApplicationServiceResponseDto>({});
  const [dashboardList, setDashboardList] = useState<FindDashboardsResponseDto>({
    cursorId: null,
    totalCount: 0,
    dashboards: [],
  });

  // 대시보드 목록 업데이트
  const updateDashboardData = async (updatedData: DashboardApplicationServiceResponseDto) => {
    try {
      setDashboardData(updatedData);

      const updatedDashboardList = dashboardList.dashboards.map((dashboard) => {
        if (dashboard.id === updatedData.id) {
          return updatedData;
        }
        return dashboard;
      });

      setDashboardList({
        ...dashboardList,
        dashboards: updatedDashboardList,
      });
    } catch (error) {
      console.error("대시보드 데이터 업데이트 실패:", error);
    }
  };

  const [myData, setMyData] = useState<UserServiceResponseDto>({} as UserServiceResponseDto);
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);

  useEffect(() => {
    if (!id) return;
    const getData = async () => {
      try {
        const dashboardResponse = await dashboard("get", dashboardId);
        setDashboardData(dashboardResponse?.data as DashboardApplicationServiceResponseDto);

        const meResponse = await me("get");
        setMyData(meResponse.data as UserServiceResponseDto);

        const qs = { navigationMethod: "pagination", cursorId: 0, page: 1, size: 999 };
        const dashboardsResponse = await findDashboard(qs);
        setDashboardList(dashboardsResponse.data as FindDashboardsResponseDto);
      } catch (error) {
        console.error("Error getting dashboard data:", error);
      }
    };

    getData();
  }, [id]);

  return { dashboardData, updateDashboardData, setDashboardData, dashboardList, myData };
};
