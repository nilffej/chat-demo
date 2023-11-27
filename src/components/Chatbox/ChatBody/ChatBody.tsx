import React, { useEffect, useRef } from "react";
import "./style.css";

interface ChatBodyProps {
  children: React.ReactElement[];
}

export default function ChatBody(props: ChatBodyProps) {
  const bottomOfChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomOfChatRef.current!.scrollIntoView();
  }, [props.children]);

  return (
    <div className="chatbox__body">
      {props.children}
      <div className="chatbox__scrollto" ref={bottomOfChatRef}></div>
    </div>
  );
}
