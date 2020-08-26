import React from "react";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";
import "./assets/css/App.css";

function App() {
  return (
    <div className="app">
      <h1>HELLO</h1>
      <div className="appBody">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
