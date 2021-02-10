import React, { useState, useRef } from "react";
import { useModalState } from "../utils/utils";
import {
  Modal,
  Button,
  Icon,
  Form,
  ControlLabel,
  FormControl,
  FormGroup,
  Schema,
  Alert,
} from "rsuite";
import firebase from "firebase/app";
import { db } from "../db/firebase";
import { useProfileContext } from "../context/ProfileContext";

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Chat name is Required"),
  description: StringType().isRequired("Description is Required"),
});

const INITIAL_FORM = {
  name: "",
  description: "",
};

const CreateRoomBtnModal = () => {
  const { isOpen, open, close } = useModalState();
  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const { profile } = useProfileContext();

  const onFormChange = (value) => {
    setFormValue(value);
  };

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }

    setIsLoading(true);
    const newRoomData = {
      ...formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
      await db.collection("rooms").doc(profile.id).set(newRoomData);
      Alert.info(`${formValue.name} room has been created`, 4000);

      setIsLoading(false);
      setFormValue(INITIAL_FORM);
      close();
    } catch (error) {
      setIsLoading(false);
      Alert.error(error.message, 4000);
    }
  };

  return (
    <div className="mt-2">
      <Button color="green" block onClick={open}>
        <Icon icon="creative" /> Create new chat room
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>New Chat room</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Room name</ControlLabel>
              <FormControl name="name" placeholder="Enter chat room name..." />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="description"
                placeholder="Enter room description..."
              />
            </FormGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            appearance="primary"
            block
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create new Chatroom
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
