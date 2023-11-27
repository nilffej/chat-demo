import React from "react";
import Chatbox from "./components/Chatbox/Chatbox";
import { Container } from "@mui/material";
import { UserContext } from "./utils/context";

import "./style.css";

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <div className="body-wrapper">
          <UserContext.Provider value={{ user: "Jeff" }}>
            <Chatbox recipient={"Friend"} />
          </UserContext.Provider>
          <UserContext.Provider value={{ user: "Friend" }}>
            <Chatbox recipient={"Jeff"} />
          </UserContext.Provider>
        </div>
      </Container>
    </div>
  );
}

export default App;
