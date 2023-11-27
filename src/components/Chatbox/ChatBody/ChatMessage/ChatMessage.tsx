import React from "react";
import { Message } from "../../../../utils/types";
import "./style.css";

export interface ChatMessageProps {
  isUserSender: boolean;
  message: Message;
  handleDeleteMessage: (id: number) => void;
}

const ChatMessage = React.memo((props: ChatMessageProps) => {
  const { isUserSender, message } = props;

  return (
    <div
      className={`chatbox__message ${
        isUserSender ? "user-sent" : "user-received"
      }`}
    >
      {message.content}
    </div>
  );
});

export default ChatMessage;
