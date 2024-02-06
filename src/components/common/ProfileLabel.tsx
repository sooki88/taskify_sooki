import React from "react";
import Avatar from "./Avatar";

interface ProfileData {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
}

interface ProfileLabelProps {
  data: ProfileData;
  avatarType?: "default" | "modal" | "dropdown" | "table";
}

function ProfileLabel({ data, avatarType = "default" }: ProfileLabelProps) {
  const labelType = avatarType === "default" ? "hidden tablet:block" : "";
  const labelSize = avatarType === "modal" ? "text-12 tablet:text-14" : "text-14 tablet:text-16";
  const labelGaps = {
    default: "gap-12",
    modal: "gap-8",
    dropdown: "gap-6",
    table: "gap-8 tablet:gap-12",
  };

  return (
    <div className={`flex items-center ${labelGaps[avatarType]}`}>
      <Avatar nickname={data?.nickname} profileImageUrl={data?.profileImageUrl} avatarType={avatarType} />
      <span className={`${labelSize} shrink-0 text-black-3332 ${labelType}`}>{data?.nickname}</span>
    </div>
  );
}

export default ProfileLabel;
