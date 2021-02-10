import React from "react";
import { Avatar } from "rsuite";
import { getNameInitials } from "../../utils/helpers";

const ProfileAvatar = ({ name, ...avatarProps }) => {
  return <Avatar circle {...avatarProps} />;
};

export default ProfileAvatar;
