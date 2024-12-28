"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Bot } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/chat");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] mt-56 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button
        onClick={handleClick}
        className="p-4 w-56 flex items-center justify-center space-x-2 bg-blue-500 text-white rounded-s-lg hover:bg-blue-600"
      >
        <Bot className="h-20 w-20" />
        <span>Click to Chat</span>
      </Button>
    </div>
  );
}
