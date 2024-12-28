"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim())
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, sender: "user", text: input },
      ]);

    setInput("");

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, sender: "bot", text: "Got it! Let me help." },
      ]);
    }, 1000);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="container mx-auto mt-20 h-[500px] w-[500px] bg-white rounded">
      <Card className="rounded-md">
        <CardHeader>
          <CardTitle>Chat with your AI Friend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[60vh] overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
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
            ))}
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
          <Button onClick={sendMessage} className="ml-2 w-10 bg-blue-600">
            <Send />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
