import React from "react";
import { Button, Alert } from "rsuite";
import moment from "moment";
import { useProfileContext } from "../../context/ProfileContext";
import { db } from "../../db/firebase";
import ProfileAvatar from "../dashboard/ProfileAvatar";

const RoomItem = ({ room }) => {
  const { createdAt, name, lastMessage } = room;
  const { profile } = useProfileContext();

  // date and time
  // const { nanoseconds, seconds } = createdAt !== null && createdAt;
  // var timestamp = { nanoseconds, seconds };
  // const dateTime = new Date(timestamp?.seconds * 1000);
  let dateTime = null;

  if (lastMessage) {
    const { nanoseconds, seconds } =
      lastMessage.createdAt !== null && lastMessage.createdAt;
    const timestamp = { nanoseconds, seconds };
    dateTime = new Date(timestamp?.seconds * 1000);
  } else {
    const { nanoseconds, seconds } = createdAt !== null && createdAt;
    const timestamp = { nanoseconds, seconds };
    dateTime = new Date(timestamp?.seconds * 1000);
  }

  // Deleting room

  const deleteRoom = async (id) => {
    try {
      await db.collection("rooms").doc(id).delete();
      Alert.success("Room Deleted", 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-disappear">{name}</h3>

        {room.id === profile.id && (
          <Button onClick={() => deleteRoom(room.id)}>Delete Room</Button>
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center text-black-70">
        {lastMessage ? (
          <div className="d-flex">
            <div className="d-flex align-items-center">
              <ProfileAvatar src={lastMessage.author.photoUrl} />
            </div>

            <div className="text-disappear ml-2">
              <div className="italic">{lastMessage.author.name}</div>
              <span>{lastMessage.text}</span>
            </div>
          </div>
        ) : (
          <span>No Messages yet ....</span>
        )}
        <span className="text-blue"> {moment(dateTime).fromNow()}</span>
      </div>
    </div>
  );
};

export default RoomItem;
