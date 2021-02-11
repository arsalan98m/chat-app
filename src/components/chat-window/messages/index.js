import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../db/firebase";
import { collectIdsAndDocs } from "../../../utils/utils";
import MessageItem from "./MessageItem";

const Messages = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(() => {
    const messagesRef = db
      .collection("rooms")
      .doc(chatId)
      .collection("messages")
      .orderBy("createdAt", "asc");

    messagesRef.onSnapshot((snapshot) => {
      const data = snapshot.docs.map(collectIdsAndDocs);
      setMessages(data);
    });

    return () => messagesRef;
  }, []);

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No Messages Yet</li>}

      {canShowMessages &&
        messages.map((message) => (
          <MessageItem key={message.id} {...message} />
        ))}
    </ul>
  );
};

export default Messages;
