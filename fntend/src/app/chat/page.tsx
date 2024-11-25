'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/user";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useEffect, useRef, useState } from "react";

interface Message {
  type: string;
  payload: {
    message: string;
    imageURL?: string;
    room: string;
  };
}
export default function Page() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const user = useCurrentUser();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            room: "red",
            imageURL: user?.user?.profileImageURL,
          },
        })
      );
    };

    ws.onmessage = (ev) => {
      try {
        const data: Message = JSON.parse(ev.data);
        setMessages((prev) => [...prev, data]);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [user?.user?.profileImageURL]);

  const sendMessage = () => {
    if (socket && inputRef.current?.value) {
      const messageToSend: Message = {
        type: "message",
        payload: {
          room: "red",
          message: inputRef.current.value,
          // @ts-ignore
          imageURL: user?.user?.profileImageURL,
        },
      };
      socket.send(JSON.stringify(messageToSend));
      inputRef.current.value = ""; 
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <header className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
        Chat
      </header>
      <main className="flex flex-col p-4 space-y-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage
                className="rounded-3xl"
                src={
                  message.payload.imageURL
                    ? message.payload.imageURL
                    : "https://avatars.githubusercontent.com/u/184803610?s=96&v=4"
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="border-2 p-2 text-white bg-gray-800 rounded-lg">
              {message.payload.message}
            </div>
          </div>
        ))}
      </main>
      <footer className="flex items-center space-x-2 p-4">
        <Input ref={inputRef} className="flex-1" placeholder="Type a message..." />
        <Button onClick={sendMessage}>Send</Button>
      </footer>
    </div>
  );
}
