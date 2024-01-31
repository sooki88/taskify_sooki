import Image from "next/image";
import Link from "next/link";
import { AUTH_MAPPING } from "@/lib/constants";
import { AuthType } from ".";

interface AuthHeaderProps {
  type: AuthType;
}

function AuthHeader({ type }: AuthHeaderProps) {
  return (
    <header className="w-full flex flex-col justify-center items-center gap-11 tablet:gap-12 pc:gap-14 mb-40 pc:mb-38">
      <Link className="flex flex-col items-end  max-w-544" href="/">
        <span className=" relative w-98 h-114 tablet:w-165 tablet:h-190">
          <Image src="/images/logo.png" fill alt="logo" />
        </span>
        <span className=" relative w-120 h-33 mt-18 tablet:mt-30 tablet:w-199 tablet:h-55">
          <Image src="/images/Taskify.png" fill alt="Taskify" />
        </span>
      </Link>
      <div className="text-20 font-medium text-black-3332">{AUTH_MAPPING[type].welcomeMsg}</div>
    </header>
  );
}

export default AuthHeader;
