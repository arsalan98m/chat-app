import React from "react";
import { Button, Modal } from "rsuite";

import ProfileAvatar from "../../dashboard/ProfileAvatar";
import { useModalState } from "../../../utils/utils";

const ProfileInfoBtnModal = ({ profile, ...btnProps }) => {
  const { isOpen, open, close } = useModalState();

  const shortName = profile.name.split(" ")[0];

  const { name, photoUrl, createdAt } = profile;

  const { nanoseconds, seconds } = createdAt !== null && createdAt;
  var timestamp = { nanoseconds, seconds };
  const dateTime = new Date(timestamp?.seconds * 1000);

  const memberSince = new Date(dateTime).toLocaleDateString();

  return (
    <>
      <Button {...btnProps} onClick={open}>
        {shortName}
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{shortName} profile</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <ProfileAvatar
            src={photoUrl}
            className="width-200 height-200 img-fullsize font-huge avatar__image"
          />
          <h4 className="mt-2">{name}</h4>

          <p>Member since {memberSince}</p>
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

export default ProfileInfoBtnModal;
