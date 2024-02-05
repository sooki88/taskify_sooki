import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "./AuthInputField/Elements";
import { Controller } from "react-hook-form";

function AuthCheckbox({ name, control }: any) {
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
