import Image from "next/image";
import { useRouter } from "next/router";

interface DashboardLinkButtonProps {
  id: number;
  title: string;
  color: string;
  createdByMe: boolean;
}

function DashboardLinkButton({ id, title, color, createdByMe }: DashboardLinkButtonProps) {
  const router = useRouter();
  const dashboardColor = `bg-[${color.toLowerCase()}]`;

  const handleClick = (id: number) => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <div
      className="flex items-center justify-between px-20 bg-white border hover:border-violet border-gray-D9D9 rounded-8 h-58 tablet:h-68 grow cursor-pointer"
      onClick={() => handleClick(id)}>
      <div className="flex items-center gap-12 pc:gap-16">
        <p className={`w-8 h-8 rounded-full ${dashboardColor}`}></p>
        <div className="flex items-center gap-4 font-semibold tablet:gap-6 pc:gap-8 text-14 tablet:text-16 text-black-3332">
          {title}
          {createdByMe && (
            <div className="relative h-12 w-15 tablet:w-18 tablet:h-14 pc:w-20 pc:h-16">
              <Image fill src="/images/crown.png" alt="왕관 아이콘 이미지" />
            </div>
          )}
        </div>
      </div>
      <Image src="/images/arrow_forward_right_black_3332.png" alt="이동 화살표 이미지" width="18" height="18" />
    </div>
  );
}

export default DashboardLinkButton;
