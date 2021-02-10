import React from "react";
import moment from "moment";

const RoomItem = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-disappear">Room name</h3>
        <span>xxx</span>
      </div>

      <div className="d-flex align-items-center text-black-70">
        <span>No Messages yet ....</span>
      </div>
    </div>
  );
};

export default RoomItem;
