import React from "react";
import Button from "@/components/common/Button/Button";
import { useForm, Controller } from "react-hook-form";
import { ChipColors } from "@/components/common/Chips";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Input } from "@/components/Auth/Elements";
import { dashboard } from "@/lib/services/dashboards";

export default function DashboardEdit() {
  const { dashboardData } = useDashboardData();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: dashboardData?.title,
      color: dashboardData?.color,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await dashboard("put", dashboardData.id, data);
      console.log(response); // 데이터 잘 들어갔는지 확인용
    } catch (error) {
      console.error("Dashboard update failed", error);
    }
  };

  return (
    <form className="bg-white px-20 rounded-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-10 pt-27 pb-20 tablet:pt-32 tablet:pb-37 tablet:flex-row tablet:justify-between tablet:items-center tablet:gap-y-0">
        <label htmlFor="title" className="text-20 font-bold">
          {dashboardData?.title}
        </label>
        <Controller
          name="color"
          control={control}
          render={({ field }) => <ChipColors selectColor={field.value} setSelectColor={field.onChange} />}
        />
      </div>
      <Controller name="title" control={control} render={({ field }) => <Input {...field} id="title" />} />
      <div className="flex justify-end pt-16 tablet:pt-24 pb-20 tablet:pb-28">
        <Button type="submit" variant="filled_4" buttonType="comment">
          변경
        </Button>
      </div>
    </form>
  );
}
