import React from "react";
import { Button, Alert } from "rsuite";
import moment from "moment";
import { useProfileContext } from "../../context/ProfileContext";
import { db } from "../../db/firebase";

const RoomItem = ({ room }) => {
  const { createdAt, name } = room;
  const { profile } = useProfileContext();

  // date and time
  const { nanoseconds, seconds } = createdAt !== null && createdAt;
  var timestamp = { nanoseconds, seconds };
  const dateTime = new Date(timestamp?.seconds * 1000);

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
        <div className="d-flex flex-direction-column">
          <span> {moment(dateTime).fromNow()}</span>
          {room.id === profile.id && (
            <Button onClick={() => deleteRoom(room.id)}>Delete</Button>
          )}
        </div>
      </div>

      <div className="d-flex align-items-center text-black-70">
        <span>No Messages yet ....</span>
      </div>
    </div>
  );
};

export default RoomItem;
