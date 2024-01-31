import { Input, Label, ErrorMessage } from "./Elements";
import { useState } from "react";

interface AuthInputProps {
  labelName: string;
  id: string;
  type: string;
  placeholder: string;
}

function AuthInputField({ labelName, id, type, placeholder, ...props }: AuthInputProps) {
  const [errorMsg, setErrorMsg] = useState(null);

  return (
    <div className="w-full flex flex-col gap-8">
      <Label id={id}>{labelName}</Label>
      <Input id={id} type={type} placeholder={placeholder} isError={!!errorMsg} {...props} />
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
    </div>
  );
}

function AuthCheckBox({ ...props }) {
  return (
    <div className="flex items-center mt-8">
      <input className=" mr-8 w-20 h-20" id="TOS-checkbox" type="checkbox" name="TOS" {...props} />
      <Label id="TOS-checkbox">이용약관에 동의합니다.</Label>
    </div>
  );
}

export { AuthInputField, AuthCheckBox };
