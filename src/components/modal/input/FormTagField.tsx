import { ChipCard } from "@/components/common/Chips";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

function FormTagField({ defaultValue }: { defaultValue?: string[] }) {
  const { control, getValues, setValue } = useFormContext();
  const [isInputFocused, setInputFocused] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const newTag = event.currentTarget.value.trim();
      if (newTag) {
        const currentTags = getValues("tags") || [];
        if (!currentTags.includes(newTag)) {
          const updatedTags = [...currentTags, newTag];
          setValue("tags", updatedTags, { shouldValidate: true });
          event.currentTarget.value = "";
        } else {
          event.currentTarget.value = "";
        }
      }
    }
  };
  const handleDelete = (index: number) => {
    const currentTags = getValues("tags") || [];
    const updatedTags = currentTags.filter((_unused: unknown, tagIndex: number) => tagIndex !== index);
    setValue("tags", updatedTags, { shouldValidate: true });
  };

  const handleFocus = () => setInputFocused(true);
  const handleBlur = () => setInputFocused(false);

  useEffect(() => {
    if (defaultValue) {
      setValue("tags", defaultValue, { shouldValidate: true });
    }
  }, [defaultValue, setValue]);

  const isFocus = isInputFocused ? `border-violet` : "border-gray-D9D9";

  return (
    <Controller
      name="tags"
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        const { value } = field;
        return (
          <div>
            <label className="text-16 tablet:text-18">태그</label>
            <div
              className={`flex gap-2 p-2 border-gray-300 border-1 rounded-6 px-16 border-gray-D9D9 h-42 tablet:h-48 overflow-x-auto ${isFocus}`}>
              <div className="flex flex-wrap items-center gap-2">
                {value?.map((tag: string, index: number) => {
                  return (
                    <div key={`${tag}-${index}`} className="cursor-pointer" onClick={() => handleDelete(index)}>
                      <ChipCard key={index} tag={tag} index={index} />
                    </div>
                  );
                })}
              </div>
              <input
                type="text"
                className="flex-1"
                onKeyDown={handleKeyDown}
                placeholder="태그를 입력하세요"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
        );
      }}
    />
  );
}

export default FormTagField;
