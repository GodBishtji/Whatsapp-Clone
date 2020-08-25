import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
function Chat() {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  return (
    <div className="chat">
      <div className="chatHeader">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chatHeaderInfo">
          {" "}
          <h3>ROOM NAME</h3>
          <p>last seen at...</p>
        </div>
      </div>
      <div className="chatBody"></div>
      <div className="chatFooter"></div>
    </div>
  );
}

export default Chat;
