import React from "react";
import { Loader } from "rsuite";
import ChatTop from "../../components/chat-window/top";
import Messages from "../../components/chat-window/messages";
import ChatBottom from "../../components/chat-window/bottom";
import { useParams } from "react-router-dom";
import { useRoomContext } from "../../context/RoomContext";

const Chat = () => {
  const { chatId } = useParams();

  const rooms = useRoomContext();

  if (!rooms) {
    return <Loader center vertical size="md" content="Loading" speed="slow" />;
  }

  const currentRoom = rooms.find((room) => room.id === chatId);

  if (!currentRoom) {
    return <h6 className="text-center mt-page">Chat not found</h6>;
  }
  return (
    <>
      <div className="chat-top">
        <ChatTop currentRoom={currentRoom} />
      </div>

      <div className="chat-middle">
        <Messages />
      </div>

      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </>
  );
};

export default Chat;
