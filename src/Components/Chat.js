import React, { useEffect, useState } from "react";
import "../assets/css/Chat.css";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { Avatar, IconButton } from "@material-ui/core";
function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed 👉", input);
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chatHeader">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chatHeaderInfo">
          {" "}
          <h3>ROOM NAME</h3>
          <p>last seen at...</p>
        </div>
        <div className="chatHeaderRight">
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
          <IconButton aria-label="attach-file">
            <AttachFileIcon className="chat__header__icons__attachFile" />
          </IconButton>
          <IconButton aria-label="menu">
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chatBody">
        <p className={`chatMessage ${true && "chatReceiver"}`}>
          <span className="chatName">Bishtji God</span>Hey Guys
          <span className="chatTimestamp">2:20pm</span>
        </p>
        <p className="chatMessage">Hey Guys</p>
      </div>
      <div className="chatFooter">
        <InsertEmoticonIcon />
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
