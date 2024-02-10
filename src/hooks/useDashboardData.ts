import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { dashboard, findDashboard } from "@/lib/services/dashboards";
import { DashboardApplicationServiceResponseDto, FindDashboardsResponseDto } from "@/lib/services/dashboards/schema";

export const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState<DashboardApplicationServiceResponseDto | null>(null);
  const [dashboardList, setDashboardList] = useState<FindDashboardsResponseDto>({
    cursorId: null,
    totalCount: 0,
    dashboards: [],
  });

  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);

  useEffect(() => {
    if (!id) return;
    const getData = async () => {
      try {
        const dashboardResponse = await dashboard("get", dashboardId);
        setDashboardData(dashboardResponse?.data as DashboardApplicationServiceResponseDto);
        const qs = { navigationMethod: "pagination", cursorId: 0, page: 1, size: 999 } as any;
        const dashboardsResponse = await findDashboard(qs);
        setDashboardList(dashboardsResponse.data as FindDashboardsResponseDto);
      } catch (error) {
        console.error("Error getting dashboard data:", error);
      }
    };

    getData();
  }, [id]);

  return { dashboardData, setDashboardData, dashboardList, setDashboardList };
};
