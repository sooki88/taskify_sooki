import Image from "next/image";
import { useRouter } from "next/router";

function BackButton() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <button className="flex items-center animate-bounce" onClick={goBack}>
      <Image className="transform scale-x-[-1]" width={18} height={18} src="/images/arrow.png" alt="arrow 이미지" />
      <span className="font-medium font-Pretendard text-16">돌아가기</span>
    </button>
  );
}

export default BackButton;
