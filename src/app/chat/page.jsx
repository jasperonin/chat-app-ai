"use client";
import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendMessageToApi } from "../api-service/chat-api";

export default function chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messageRef = useRef(null);

  const handleMessage = async () => {
    try {
      const botRepo = await sendMessageToApi(input);
      setMessages([
        ...messages,
        { sender: "user", text: input },
        { sender: "bot", text: botRepo || "No response from bot." },
      ]);
      setInput("");
    } catch (error) {
      console.error("error while sending a message", error);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleMessage();
    }
  };

  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="container mx-auto mt-20 h-[700px] w-[500px] bg-white rounded">
      <Card className="rounded-md">
        <CardHeader>
          <CardTitle>Chat with your AI Friend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[60vh] overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => {
              console.log("Rendering message:", msg); // Debugging log
              return (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[60%] p-3 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-blue-300 text-black"
                        : "bg-gray-400 text-black"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
            <div ref={messageRef}></div>
          </div>
        </CardContent>
        <CardFooter>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message ...."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <Button onClick={handleMessage} className="ml-2 w-10 bg-blue-600">
            <Send />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
