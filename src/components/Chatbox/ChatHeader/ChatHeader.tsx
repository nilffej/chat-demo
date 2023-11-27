import React from "react";
import "./style.css";

interface ChatHeaderProps {
  recipient: string;
}

export default function ChatHeader(props: ChatHeaderProps) {
  return (
    <div className="chatbox__header">
      <span className="chatbox__title">{props.recipient}</span>
    </div>
  );
}
