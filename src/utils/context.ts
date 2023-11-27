import { createContext } from "react";

export const UserContext = createContext<UserContextProps | null>(null);

type UserContextProps = {
  user: string;
};
