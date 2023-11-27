import { LoremIpsum } from "lorem-ipsum";
import { Message } from "./types";

const mockData = generateMockData("Jeff", "Friend");

export function fetchMessages(endpoint: string, params?: Object) {
  return new Promise<Message[]>((resolve, reject) => {
    try {
      switch (endpoint) {
        case "getMessages":
          resolve(mockData);
      }
    } catch (error) {
      if (error instanceof Error) {
        reject(error.message);
      }
    }
  });
}

function generateMockData(person1: string, person2: string) {
  const lorem = new LoremIpsum({
    wordsPerSentence: {
      min: 4,
      max: 6,
    },
  });
  let messages: Message[] = [];

  for (let i = 0; i < 8; ++i) {
    messages.push({
      id: Date.now() + i,
      content: lorem.generateSentences(2),
      sender: i % 2 ? person1 : person2,
    });
  }

  return messages;
}
