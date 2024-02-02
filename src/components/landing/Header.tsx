import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between w-full py-16 pr-24 bg-white h-70 tablet:pr-40 pc:pr-80 pl-30">
      <Link href="/" className="flex items-center">
        <Image className="w-full h-auto" width={29} height={33} src="/images/logo.png" alt="로고 이미지" />
        <Image
          className="hidden tablet:block"
          width={80}
          height={22}
          src="/images/Taskify.png"
          alt="Taskify 이미지"
          priority={true}
        />
      </Link>
      <div className="flex gap-36">
        <Link className="font-normal cursor-pointer font-Pretendard text-16" href="/login">
          로그인
        </Link>
        <Link className="font-normal cursor-pointer font-Pretendard text-16" href="/signup">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default Header;
