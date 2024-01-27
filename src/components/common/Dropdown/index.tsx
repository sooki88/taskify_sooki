import { useState } from "react";
import { Lists, Option } from "./Lists";
import { ChipProgress } from "../Chips";
import Layout from "./Layout";

function Dropdown({ defaultOption, setValues, options, name }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  /** value 타입 변경 예정*/
  const handleChange = (value: any) => {
    setValues((pre) => ({ ...pre, [name]: value }));
    setSelectedOption(value);
  };

  return (
    <Layout isOpen={isOpen} setIsOpen={setIsOpen}>
      <span className="flex items-center">
        <ChipProgress columnTitle={selectedOption} />
      </span>
      {isOpen && (
        <Lists>
          {options.map((option: TitleOption) => (
            <Option key={option.id} option={option} handleChange={handleChange} selectedOption={selectedOption}>
              <ChipProgress columnTitle={option.title} />
            </Option>
          ))}
        </Lists>
      )}
    </Layout>
  );
}

function InputDropdown({ defaultOption, setValues, options, name }: InputDropdownProps) {
  const { profileImageUrl, nickname, userId } = defaultOption;
  const DEFAULT_PROFILE = {
    profileImageUrl: profileImageUrl,
    nickname: nickname,
  };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(userId);
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

  const handleChange = (value: any) => {
    setValues((pre) => ({ ...pre, [name]: value }));
    setSelectedOption(value);
  };
  const handleProfileChange = (option: MembersOption) => {
    if (option.nickname) {
      setProfile((pre) => ({ ...pre, profileImageUrl: option.profileImageUrl, nickname: option.nickname }));
    }
  };
  return (
    <Layout isOpen={isOpen} setIsOpen={setIsOpen}>
      <span className="flex items-center">
        {/* <ProfileLabel name={profile.nickname} src={profile.profileImageUrl} /> */}
      </span>
      {isOpen && (
        <Lists>
          {options.map((option: MembersOption) => (
            <Option
              key={option.userId}
              option={option}
              handleChange={handleChange}
              selectedOption={selectedOption}
              handleProfileChange={handleProfileChange}>
              {/* <ProfileLabel name={option.nickname} src={option.profileImageUrl} profile /> */}
            </Option>
          ))}
        </Lists>
      )}
    </Layout>
  );
}

export { Dropdown, InputDropdown };

interface InitValue {
  title: string;
  assigneeUserId: number;
}

interface SelectProps<T> {
  options: T[];
  defaultOption: T;
  setValues: React.Dispatch<React.SetStateAction<InitValue>>;
  name: string;
}

export interface MembersOption {
  profileImageUrl: string;
  nickname: string;
  userId: number;
}

export interface TitleOption {
  id: number;
  title: string;
}

type DropdownProps = SelectProps<TitleOption>;

type InputDropdownProps = SelectProps<MembersOption>;
