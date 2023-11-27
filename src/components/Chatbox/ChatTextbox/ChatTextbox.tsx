import React, { useContext, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Message } from "../../../utils/types";
import "./style.css";
import { UserContext } from "../../../utils/context";

interface ChatTextboxProps {
  handleSendMessage: (message: Message) => void;
}

export default function ChatTextbox(props: ChatTextboxProps) {
  const [text, setText] = useState("");
  const userContext = useContext(UserContext);

  const sendMessage = () => {
    props.handleSendMessage({
      id: Date.now(),
      content: text,
      sender: userContext!.user,
    });
    setText("");
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="chatbox__textbox">
      <textarea
        className="input chatbox__textfield"
        onChange={handleTextChange}
        onKeyDown={handleEnterPress}
        value={text}
      />
      <span className="chatbox__send" onClick={sendMessage}>
        <SendIcon className="chatbox__sendicon" />
      </span>
    </div>
  );
}
