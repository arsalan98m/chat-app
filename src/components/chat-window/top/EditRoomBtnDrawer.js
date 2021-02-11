import React from "react";
import { Drawer, Button, Alert } from "rsuite";
import { useMediaQuery, useModalState } from "../../../utils/utils";
import EditableInput from "../../dashboard/EditableInput";
import { useRoomContext } from "../../../context/RoomContext";
import { useParams } from "react-router-dom";
import { db } from "../../../db/firebase";

const EditRoomBtnDrawer = () => {
  const { isOpen, open, close } = useModalState();
  const { chatId } = useParams();
  const data = useRoomContext();

  const room = data.find((r) => r.id === chatId);
  const isMobile = useMediaQuery("(max-width:992px)");

  const updateData = (key, value) => {
    try {
      db.collection("rooms")
        .doc(chatId)
        .update({
          [key]: value,
        });

      Alert.success("Successfully Updated Room info", 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  const onNameSave = (newName) => {
    updateData("name", newName);
  };

  const onDescriptionSave = (newDesc) => {
    updateData("description", newDesc);
  };

  return (
    <div>
      <Button size="sm" color="red" onClick={open}>
        Edit Room
      </Button>

      <Drawer full={isMobile} show={isOpen} onHide={close} placement="right">
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
          <EditableInput
            initialValue={room.name}
            onSave={onNameSave}
            label={<h6 className="mb-2">Name</h6>}
            emptyMsg="Name can not be empty"
          />

          <EditableInput
            componentClass="textarea"
            rows={5}
            initialValue={room.description}
            onSave={onDescriptionSave}
            emptyMsg="Description can not be empty"
            wrapperClassName="mt-3"
          />
        </Drawer.Body>

        <Drawer.Footer></Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default EditRoomBtnDrawer;
