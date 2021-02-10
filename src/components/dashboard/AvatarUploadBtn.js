import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { Modal, Button, Alert } from "rsuite";
import { useModalState } from "../../utils/utils";
import { storage, db } from "../../db/firebase";
import { useProfileContext } from "../../context/ProfileContext";
import ProfileAvatar from "./ProfileAvatar";

const fileInputTypes = ".png, .jpeg, .jpg";

const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];

const isValidFile = (file) => acceptedFileTypes.includes(file.type);

// converting canvas to actual image file
const getBlob = (canvas) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("File process error"));
      }
    });
  });
};

const AvatarUploadBtn = () => {
  const { isOpen, open, close } = useModalState();

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const avatarEditorRef = useRef();

  const { profile } = useProfileContext();

  console.log("p=>", profile);
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

  const onUploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();

    setIsLoading(true);
    try {
      const blob = await getBlob(canvas);

      const avatarFileRef = storage
        .ref(`/profile/${profile.id}`)
        .child("avatar");

      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });

      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

      const userAvatarRef = db.collection("profiles").doc(profile.id).update({
        photoUrl: downloadUrl,
      });

      close();

      setIsLoading(false);

      Alert.info("Avatar has been uploaded", 4000);
    } catch (error) {
      setIsLoading(false);
      Alert.error(error.message, 4000);
    }
  };

  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={profile.photoUrl}
        name={profile.name}
        className="width-200 height-200 img-fullsize font-huge avatar__image"
      />
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
                  ref={avatarEditorRef}
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
            <Button
              appearance="ghost"
              block
              onClick={onUploadClick}
              disabled={isLoading}
            >
              Upload new avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadBtn;
