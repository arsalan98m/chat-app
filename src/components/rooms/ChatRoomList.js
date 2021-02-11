import React from "react";
import { Nav, Loader } from "rsuite";
import RoomItem from "./RoomItem";
import { useRoomContext } from "../../context/RoomContext";
import { Link, useLocation } from "react-router-dom";

const ChatRoomList = ({ aboveElHeight }) => {
  const rooms = useRoomContext();
  const location = useLocation();

  if (!rooms) {
    return <Loader center vertical size="md" content="Loading" speed="slow" />;
  }
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveElHeight}px - 20px)`,
      }}
      activeKey={location.pathname}
    >
      {rooms.length === 0 ? (
        <h3 className="text-disappear" style={{ marginLeft: "0.5rem" }}>
          No Chat rooms Available
        </h3>
      ) : (
        <h3 className="text-disappear" style={{ marginLeft: "0.5rem" }}>
          Available Chat rooms
        </h3>
      )}{" "}
      {!rooms && (
        <Loader center vertical content="Loading" speed="slow" size="md" />
      )}
      {rooms &&
        rooms.length > 0 &&
        rooms.map((room) => (
          <Nav.Item
            componentClass={Link}
            to={`/chat/${room.id}`}
            key={room.id}
            eventKey={`/chat/${room.id}`}
          >
            <RoomItem room={room} />
          </Nav.Item>
        ))}
    </Nav>
  );
};

export default ChatRoomList;
