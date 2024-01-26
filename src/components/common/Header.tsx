import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const router = useRouter();
  const isLandingPage = router.pathname === "/";

  return (
    <div
      className={`flex items-center justify-between w-full h-70 pr-24 tablet:pr-40 pc:pr-80 pl-30 py-16 bg-white 
      ${isLandingPage ? "" : "border-b-1 border-b-gray-D9D9"}`}>
      <Link href="/" className="flex items-center">
        <Image className="w-full h-auto" width={29} height={33} src="/images/logo.png" alt="로고 이미지" />
        <Image
          className="hidden w-full h-auto tablet:block"
          width={80}
          height={22}
          src="/images/Taskify.png"
          alt="Taskify 이미지"
          priority={true}
        />
      </Link>
      <div className="flex gap-36">
        <Link className="font-normal font-Pretendard text-16" href="/login">
          로그인
        </Link>
        <Link className="font-normal font-Pretendard text-16" href="/signup">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default Header;
