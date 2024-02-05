import { ChipProgress } from "@/components/common/Chips";
import ProfileLabel from "@/components/common/ProfileLabel";
import Dropdown from ".";
import { useState } from "react";
export default function DropdownTest() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const options = ["홍길동", "김길동", "이길동"];
  const MOCK_OPTIONS_DEFAULT = [
    {
      title: "To do",
    },
    {
      title: "On Progress",
    },
    {
      title: "Done",
    },
  ];

  const MOCK_OPTIONS_MEMBERS = [
    { profileImageUrl: "", nickname: "홍길동", userId: "1" },
    { profileImageUrl: "", nickname: "김길동", userId: "2" },
    { profileImageUrl: "", nickname: "나길동", userId: "3" },
  ];

  const renderOptionPrograss = (option: any) => {
    console.log(option);
    return <ChipProgress columnTitle={option.title} />;
    //  <ChipProgress columnTitle={option.title} />};
  };
  const renderOptionNickName = (option: any) => <ProfileLabel data={option} />;

  return (
    <div className="p-10">
      {/* <Dropdown options={options} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      <Dropdown
        options={MOCK_OPTIONS_DEFAULT}
        renderOptions={renderOptionPrograss}
        filteringTerm="title"
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <Dropdown
        options={MOCK_OPTIONS_MEMBERS}
        renderOptions={renderOptionNickName}
        filteringTerm="nickname"
        autoComplete
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      /> */}
    </div>
  );
}
