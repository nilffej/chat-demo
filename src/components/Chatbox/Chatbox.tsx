import React, { useContext, useEffect, useReducer } from "react";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatTextbox from "./ChatTextbox/ChatTextbox";
import ChatBody from "./ChatBody/ChatBody";
import { Message } from "../../utils/types";
import ChatMessage from "./ChatBody/ChatMessage/ChatMessage";
import { UserContext } from "../../utils/context";
import { fetchMessages } from "../../utils/fetch";

import "./style.css";
import ChatPubSub from "../../utils/pubsub";

interface ChatboxProps {
  recipient: string;
}

export default function Chatbox(props: ChatboxProps) {
  const [messages, dispatch] = useReducer(chatboxReducer, []);
  const userContext = useContext(UserContext);

  useEffect(() => {
    fetchMessages("getMessages", {
      sender: userContext!.user,
      recipient: props.recipient,
    }).then((result) => {
      dispatch({ type: CHATACTIONS.LOADHISTORY, messages: result });
    });

    const id = ChatPubSub.subscribe(
      { user1: userContext!.user, user2: props.recipient },
      () => {}
    );

    return () => {
      ChatPubSub.unsubscribe();
    };
  }, [props.recipient]);

  const handleDeleteMessage = (id: number) => {
    dispatch({ type: CHATACTIONS.DELETE, id: id });
  };

  const handleSendMessage = (message: Message) => {
    dispatch({ type: CHATACTIONS.SEND, message: message });
  };

  const receiveMessage = (message: Message) => {};

  return (
    <div className="chatbox">
      <ChatHeader recipient={props.recipient} />
      <ChatBody>
        {messages.map((message) => {
          return (
            <ChatMessage
              isUserSender={userContext!.user === message.sender}
              key={message.id}
              message={message}
              handleDeleteMessage={handleDeleteMessage}
            />
          );
        })}
      </ChatBody>
      <ChatTextbox handleSendMessage={handleSendMessage} />
    </div>
  );
}

export function chatboxReducer(state: Message[], action: ChatAction) {
  switch (action.type) {
    case CHATACTIONS.LOADHISTORY:
      console.log("Loaded message history!");
      if (action.messages) {
        return action.messages;
      }
    case CHATACTIONS.SEND:
      console.log(
        `Sent message with id ${action.message!.id}: ${action.message!.content}`
      );
      return state.concat(action.message!);
    case CHATACTIONS.DELETE:
      console.log(`Deleting message with id {action.messageid!}`);
      return state.filter((message) => action.id! != message.id);
    default:
      return state;
  }
}

export type ChatAction = {
  type: CHATACTIONS;
  message?: Message;
  messages?: Message[];
  id?: number;
};

export enum CHATACTIONS {
  LOADHISTORY,
  SEND,
  DELETE,
}
