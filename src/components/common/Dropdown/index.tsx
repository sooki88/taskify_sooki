import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useOnClickOutside, useToggle } from "usehooks-ts";
import { MemberApplicationServiceResponseDto } from "@/lib/services/members/schema";
import { ColumnServiceResponseDto } from "@/lib/services/columns/schema";
import { Lists, Option } from "./Lists";
import { ChipProgress } from "../Chips";
import ProfileLabel from "../ProfileLabel";

interface OptionCommon {
  id: number;
}

interface DropdownProps {
  defaultIndex: number;
  options: (ColumnServiceResponseDto | MemberApplicationServiceResponseDto)[];
  filteringTerm?: string;
  autoComplete?: boolean;
  onChange: (value: number) => void;
}

function Dropdown({ defaultIndex, options, filteringTerm, autoComplete, onChange }: DropdownProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const [inputValue, setInputValue] = useState("");
  const [isInputMode, setIsInputMode] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null); //outsideClick ref
  const inputRef = useRef<HTMLInputElement>(null); // inputfocus ref

  const [toggleValue, handleToggle, setToggleValue] = useToggle();

  const handleDivClick = () => {
    if (autoComplete) setIsInputMode(true);
    handleToggle();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOptionClick = (selectedId: number) => {
    const selectedOption = options.find((option) => option.id === selectedId);
    const selectedIndex = options.findIndex((option) => option.id === selectedId);
    setSelectedIndex(selectedIndex);
    if (selectedOption) {
      onChange(selectedId);
    }

    setIsInputMode(false);
    setToggleValue(false);
  };

  const handleButtonToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setToggleValue((prev) => !prev);
  };

  const handleClickOutside = () => {
    setToggleValue(false);
    setIsInputMode(false);
    setInputValue("");
  };

  const renderOptions = (option: ColumnServiceResponseDto | MemberApplicationServiceResponseDto) => {
    if ("title" in option) {
      return <ChipProgress columnTitle={option.title} />;
    } else if ("nickname" in option) {
      return <ProfileLabel data={option} />;
    }
    return null; // 또는 적절한 대체 컴포넌트
  };

  const filteredOptions =
    isInputMode && filteringTerm
      ? options.filter((option) => {
          let optionValue: string = "";
          if (typeof option === "object" && option !== null && filteringTerm in option) {
            optionValue = option[filteringTerm as keyof OptionCommon]?.toString() ?? "";
          }
          return optionValue.includes(inputValue);
        })
      : options;

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    // 입력 모드일 때 입력 필드에 자동으로 포커스
    if (autoComplete && isInputMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoComplete, isInputMode]);

  return (
    <div ref={ref} className="relative tablet:w-220 h-48">
      {autoComplete && isInputMode ? (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onClick={() => setToggleValue(true)}
          className="flex w-full h-48 px-14 py-16 border border-gray-D9D9 rounded-6 justify-between"
          placeholder="이름을 입력해 주세요"
        />
      ) : (
        <div
          className="flex items-center w-full h-48 px-16 border border-gray-D9D9 rounded-6 justify-between cursor-pointer"
          onClick={handleDivClick}>
          <div>{renderOptions(options[selectedIndex])}</div>
          <button onClick={handleButtonToggle}>
            <Image src={"/images/arrow_drop_down.png"} width={26} height={26} alt="down" />
          </button>
        </div>
      )}
      {toggleValue && (
        <Lists>
          {filteredOptions.map((option, index) => (
            <Option key={index} onClick={() => handleOptionClick(option.id)} isSelected={selectedIndex === index}>
              {renderOptions(option)}
            </Option>
          ))}
        </Lists>
      )}
    </div>
  );
}

export default Dropdown;
