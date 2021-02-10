import { useContext, createContext, useEffect, useState } from "react";
import { db } from "../db/firebase";
import { collectIdsAndDocs } from "../utils/utils";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState();

  useEffect(() => {
    const roomListRef = db.collection("rooms");

    roomListRef.onSnapshot((snapshot) => {
      const data = snapshot.docs.map(collectIdsAndDocs);
      setRooms(data);
    });

    // return () => roomListRef();
  }, []);

  return <RoomContext.Provider value={rooms}>{children}</RoomContext.Provider>;
};

export const useRoomContext = () => useContext(RoomContext);
