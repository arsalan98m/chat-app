import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { Modal, Button, Alert } from "rsuite";
import { useModalState } from "../../utils/utils";

const fileInputTypes = ".png, .jpeg, .jpg";

const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];

const isValidFile = (file) => acceptedFileTypes.includes(file.type);

const AvatarUploadBtn = () => {
  const { isOpen, open, close } = useModalState();
  const [image, setImage] = useState(null);

  const onFileInputChange = (e) => {
    const currentFiles = e.target.files;
    if (currentFiles.length === 1) {
      const file = currentFiles[0];

      if (isValidFile(file)) {
        setImage(file);

        open();
      } else {
        Alert.warning(`Wrong File Type ${file.type}`, 4000);
      }
    }
  };

  return (
    <div className="mt-3 text-center">
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select new avatar
          <input
            type="file"
            id="avatar-upload"
            className="d-none"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>

        <Modal show={isOpen} onHide={close}>
          <Modal.Header>Adjust and upload new avatar</Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-100">
              {image && (
                <AvatarEditor
                  image={image}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button appearance="ghost" block>
              Upload new avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadBtn;