import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "./Elements";
import { Controller, Control } from "react-hook-form";
import { SignUpForm } from "@/pages/signup";

interface AuthCheckboxProps {
  name: "agreeCheck";
  control: Control<SignUpForm>;
}

function AuthCheckbox({ name, control }: AuthCheckboxProps) {
  const rules = {
    required: true,
  };

  return (
    <div className="flex items-center mt-8 gap-8 ">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Checkbox id="TOS-checkbox" ref={field.ref} checked={field.value} onCheckedChange={field.onChange} />
        )}
      />
      <Label htmlFor="TOS-checkbox" auth>
        이용약관에 동의합니다.
      </Label>
    </div>
  );
}
export default AuthCheckbox;
