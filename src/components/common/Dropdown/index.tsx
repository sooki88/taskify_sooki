import React, { useRef, useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import { useOnClickOutside, useToggle } from "usehooks-ts";
import { Lists, Option } from "./Lists";

type OptionType = string | { [key: string]: string };

interface DropdownProps {
  options: OptionType[];
  renderOptions?: (option: OptionType) => ReactNode;
  filteringTerm?: string;
  autoComplete?: boolean;
}

function Dropdown({ options, renderOptions, filteringTerm, autoComplete }: DropdownProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isInputMode, setIsInputMode] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null); //outsideClick ref
  const inputRef = useRef<HTMLInputElement>(null); // inputfocus ref

  const [toggleValue, handleToggle, setToggleValue] = useToggle();

  const handleDivClick = () => {
    setIsInputMode(true);
    handleToggle();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOptionClick = (index: number) => {
    setSelectedIndex(index);
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

  const defaultRenderOptions = (option: OptionType) => {
    return typeof option === "object" ? option[filteringTerm as keyof typeof option] : option;
  };

  const renderOption = renderOptions || defaultRenderOptions;

  const filteredOptions = isInputMode
    ? options.filter((option) => {
        const optionValue =
          typeof option === "object" && option !== null
            ? option[filteringTerm as keyof typeof option]?.toString().toLowerCase()
            : option.toString().toLowerCase();
        return optionValue.includes(inputValue.toLowerCase());
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
    <div ref={ref} className="relative w-220 h-48">
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
          <div>{renderOption(options[selectedIndex])}</div>
          <button onClick={handleButtonToggle}>
            <Image src={"/images/arrow_drop_down.png"} width={26} height={26} alt="down" />
          </button>
        </div>
      )}
      {toggleValue && (
        <Lists>
          {filteredOptions.map((option, index) => (
            <Option key={index} onClick={() => handleOptionClick(index)} isSelected={selectedIndex === index}>
              {renderOption(option)}
            </Option>
          ))}
        </Lists>
      )}
    </div>
  );
}

export default Dropdown;
