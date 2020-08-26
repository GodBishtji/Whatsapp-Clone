import React, { useEffect, useState } from "react";
import "../assets/css/Chat.css";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { Avatar, IconButton } from "@material-ui/core";
import { useParams } from "react-router-dom";
import db from "../firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
    return () => {
      // cleanup
    };
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed 👉", input);
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chatHeader">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chatHeaderInfo">
          {" "}
          <h3>{roomName}</h3>
          <p>
            last seen at{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
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
        {messages.map((message) => (
          <p
            className={`chatMessage ${
              message.name === user.displayName && "chatReceiver"
            }`}
          >
            <span className="chatName">{message.name}</span>
            {message.message}
            <span className="chatTimestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
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
