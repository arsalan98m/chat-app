import React from "react";
import { useMediaQuery } from "../../../utils/utils";
import { Link } from "react-router-dom";
import { ButtonToolbar, Icon } from "rsuite";
import RoomInfoBtnModal from "./RoomInfoBtnModal";
import EditRoomBtnDrawer from "./EditRoomBtnDrawer";

const ChatTop = ({ currentRoom }) => {
  const { name } = currentRoom;
  const isMobile = useMediaQuery("(max-width:992px)");
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear d-flex- align-items-center">
          <Icon
            componentClass={Link}
            icon="arrow-circle-left"
            size="2x"
            to="/"
            className={
              isMobile
                ? "d-inline-block p-0 mr-2 text-blue link-unstyled"
                : "d-none"
            }
          />
          <span className="text-disappear">{name}</span>
        </h4>
        <ButtonToolbar className="ws-nowrap">
          <EditRoomBtnDrawer />
        </ButtonToolbar>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <span></span>
        <RoomInfoBtnModal currentRoom={currentRoom} />
      </div>
    </div>
  );
};

export default ChatTop;
