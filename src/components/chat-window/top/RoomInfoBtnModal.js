import React from "react";
import { Button, Modal } from "rsuite";
import { useModalState } from "../../../utils/utils";

const RoomInfoBtnModal = ({ currentRoom }) => {
  const { isOpen, open, close } = useModalState();
  const { description, name } = currentRoom;

  return (
    <>
      <Button appearance="link" className="px-0" onClick={open}>
        Room information
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>About {name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h6 className="mb-1">Description</h6>
          <p>{description}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RoomInfoBtnModal;
