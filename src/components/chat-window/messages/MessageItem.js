import React from "react";
import ProfileAvatar from "../../dashboard/ProfileAvatar";
import moment from "moment";
import { useProfileContext } from "../../../context/ProfileContext";
import ProfileInfoBtnModal from "./ProfileInfoBtnModal";

const MessageItem = ({ author, createdAt, text }) => {
  // date and time
  const { nanoseconds, seconds } = createdAt !== null && createdAt;
  var timestamp = { nanoseconds, seconds };
  const dateTime = new Date(timestamp?.seconds * 1000);

  const { profile } = useProfileContext();

  return (
    <li className="padded mb-1 ">
      <div
        className="d-flex align-items-center font-bolder mb-1"
        style={{
          justifyContent: `${profile.id === author.id && "flex-end"}`,
        }}
      >
        <ProfileAvatar src={author.photoUrl} className="ml-1" size="xs" />

        <ProfileInfoBtnModal
          profile={author}
          appearance="link"
          className="p-0 ml-1 text-black"
        />
        <span className="font-normal text-black-45 ml-2">
          {moment(dateTime).fromNow()}
        </span>
      </div>

      <div
        style={{
          textAlign: `${profile.id === author.id && "right"}`,
        }}
      >
        <span className="word-break-all">{text}</span>
      </div>
    </li>
  );
};

export default MessageItem;
