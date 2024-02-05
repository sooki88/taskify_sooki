import { Input, Label, ErrorMessage } from "./Elements";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
interface AuthInputProps {
  labelName: string;
  id: string;
  type: string;
  placeholder: string;
  auth?: boolean;
}

function AuthInputField({ labelName, id, type, placeholder, auth, ...props }: AuthInputProps) {
  const [errorMsg, setErrorMsg] = useState(null);
  const AUTH_GAP = auth ? "gap-8" : "gap-10";

  return (
    <div className={`flex flex-col w-full ${AUTH_GAP}`}>
      <Label id={id} auth={auth}>
        {labelName}
      </Label>
      <Input id={id} type={type} placeholder={placeholder} isError={!!errorMsg} auth={auth} {...props} />
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
    </div>
  );
}

function AuthCheckBox({ ...props }) {
  return (
    <div className="flex items-center mt-8 gap-8 ">
      <Checkbox />
      <Label id="TOS-checkbox" auth>
        이용약관에 동의합니다.
      </Label>
    </div>
  );
}

export { AuthInputField, AuthCheckBox };
