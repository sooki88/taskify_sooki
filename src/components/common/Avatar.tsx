import React from "react";

type AvatarType = "default" | "card" | "modal" | "dropdown" | "table";

interface AvatarProps {
  nickname?: string;
  profileImageUrl?: string | null;
  avatarType?: AvatarType;
}

function Avatar({ nickname, profileImageUrl, avatarType = "default" }: AvatarProps) {
  const initial = nickname?.charAt(0) || "";

  const backgroundStyle = {
    background: profileImageUrl ? `url(${profileImageUrl})` : "orange",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const sizeClasses = {
    default: "w-34 h-34 text-14 tablet:w-38 tablet:h-38 tablet:text-16 font-semibold",
    card: "w-22 h-22 text-10 tablet:w-24 tablet:h-24 tablet:text-12 font-semibold",
    modal: "w-26 h-26 text-12 tablet:w-34 tablet:h-34 tablet:text-14 font-normal",
    dropdown: "w-26 h-26 text-12",
    table: "w-34 h-34 text-14 tablet:w-38 tablet:h-38 tablet:text-16",
  };

  const avatarStyle = sizeClasses[avatarType];

  return (
    <div
      className={`flex items-center justify-center text-white border-2 border-white rounded-full ${avatarStyle}`}
      style={backgroundStyle}>
      <span className="text-12 tablet:text-16">{initial}</span>
    </div>
  );
}

export default Avatar;
