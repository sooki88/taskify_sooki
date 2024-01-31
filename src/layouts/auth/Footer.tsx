import Link from "next/link";
import { AuthType } from ".";
import { AUTH_MAPPING } from "@/lib/constants";

interface AuthFooterProps {
  type: AuthType;
}

function AuthFooter({ type }: AuthFooterProps) {
  return (
    <footer className="pt-24 ">
      <div className="text-center">
        <p className="text-black-3332">
          {AUTH_MAPPING[type].footerMsg}
          <Link className="text-violet underline underline-offset-2 ml-8" href={AUTH_MAPPING[type].href}>
            {AUTH_MAPPING[type].linkText}
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default AuthFooter;
