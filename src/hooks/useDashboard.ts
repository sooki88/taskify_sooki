import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { findDashboard } from "@/lib/services/dashboards";
import { DashboardRequestDto, FindDashboardsRequestDto } from "@/lib/services/dashboards/schema";
import { DashboardApplicationServiceResponseDto } from "@/lib/services/comments/schema";
import { checkLogin } from "@/lib/util/checkLogin";

export function useDashboards() {
  const [dashboardList, setDashboardList] = useState<DashboardApplicationServiceResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  async function fetchDashboardList() {
    setLoading(true);
    try {
      const qs: FindDashboardsRequestDto = { navigationMethod: "pagination", size: 999 };
      const res = await findDashboard(qs);
      if (res.data) setDashboardList(res.data.dashboards);
    } catch (error) {
      if (error instanceof Error) setError(error);
    } finally {
      setLoading(false);
    }
  }

  function updateDashboardList(data: DashboardRequestDto, dashboardId: number) {
    setDashboardList((prev: DashboardApplicationServiceResponseDto[]) =>
      prev.map((dashboard) => {
        return dashboard.id === dashboardId ? { ...dashboard, ...data } : dashboard;
      }),
    );
  }

  //함수를 처음 불러왔을 때, 랜더링 시도.
  useEffect(() => {
    checkLogin(router);
    if (checkLogin(router)) fetchDashboardList();
  }, [router]);

  return { dashboardList, loading, error, updateDashboardList, fetchDashboardList };
}
