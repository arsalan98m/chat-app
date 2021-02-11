import React, { useState } from "react";
import { Icon, Input, InputGroup, Alert } from "rsuite";
import { useProfileContext } from "../../../context/ProfileContext";
import { useParams } from "react-router-dom";
import { db } from "../../../db/firebase";
import firebase from "firebase/app";

const ChatBottom = () => {
  const [input, setInput] = useState("");
  const { profile } = useProfileContext();
  const { chatId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (value) => {
    setInput(value);
  };

  const onSendClick = async () => {
    if (input.trim() === "") {
      return;
    }

    setIsLoading(true);
    try {
      const newMessage = {
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        roomId: chatId,
        text: input,
        author: { ...profile },
      };

      const msgId = await db
        .collection("rooms")
        .doc(chatId)
        .collection("messages")
        .add(newMessage);

      const lastMessage = {
        author: { ...profile },
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        msgId: msgId.id,
        text: input,
      };

      await db.collection("rooms").doc(chatId).update({ lastMessage });

      setInput("");
      setIsLoading(false);
      Alert.success("Message Sent", 4000);
    } catch (error) {
      setIsLoading(false);
      Alert.error(error.message, 4000);
    }
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSendClick();
    }
  };
  return (
    <div>
      <InputGroup>
        <Input
          placeholder="Write a new message here..."
          value={input}
          onChange={handleChange}
          onPressEnter={onKeyDown}
        />

        <InputGroup.Button
          color="blue"
          appearance="primary"
          onClick={onSendClick}
          disabled={isLoading}
        >
          <Icon icon="send" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default ChatBottom;
