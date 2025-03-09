"use client";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
export default function Home() {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = io("http://localhost:3000");
    setSocket(socket);
    socket.on("connect", () => {
      console.log("connected");
      console.log(socket.id);
    });
    socket.on("all", (data) => {
      console.log(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handle = (e) => {
    e.preventDefault();
    socket.emit("msg", message);
    setMessage("");
  };
  return (
    <>
      Testing
      <form onSubmit={handle}>
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></input>
        <button>Send</button>
      </form>
    </>
  );
}
