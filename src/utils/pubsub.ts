import { v4 as uuid } from "uuid";

interface ChatPubSub {
  events: {
    [key: string]: { id: string; callback: () => void }[];
  };
}

class ChatPubSub {
  constructor() {
    this.events = {};
  }

  subscribe(event: SubscribeEvent, func: { (): void }) {
    const unique_id = uuid();
    const identifier =
      event.user1 < event.user2
        ? event.user1 + event.user2
        : event.user2 + event.user1;
    if (identifier in this.events) {
      this.events[identifier].push({ id: unique_id, callback: func });
    } else {
      this.events[identifier] = [{ id: unique_id, callback: func }];
    }
    return unique_id;
  }

  unsubscribe(event: string, unique_id: string) {
    if (event in this.events) {
      this.events[event] = this.events[event].filter(
        (item) => item.id != unique_id
      );
    }
  }
}

type SubscribeEvent = {
  user1: string;
  user2: string;
};

export default new ChatPubSub();
