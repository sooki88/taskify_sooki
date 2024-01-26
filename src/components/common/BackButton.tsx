import Image from "next/image";
import Link from "next/link";

function BackButton() {
  return (
    <Link className="flex items-center animate-bounce" href="/mydashboard">
      <Image className="transform scale-x-[-1]" width={18} height={18} src="/images/arrow.png" alt="arrow 이미지" />
      <span className="font-medium font-Pretendard text-16">돌아가기</span>
    </Link>
  );
}

export default BackButton;
