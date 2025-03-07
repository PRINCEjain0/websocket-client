"use client";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

export default function Home() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000/");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected:", newSocket.id);
    });

    // Cleanup: Disconnect when component unmounts
    return () => {
      newSocket.disconnect();
      console.log("Socket disconnected:", newSocket.id);
    };
  }, []);

  return <>{socket?.id} hello</>;
}
