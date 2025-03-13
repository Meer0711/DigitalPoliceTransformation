"use client";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function ChatRoom() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useKindeBrowserClient();
  const messages = useQuery(api.messages.getMessages, { roomId: id });
  const sendMessage = useMutation(api.messages.sendMessage);
  const [message, setMessage] = useState("");
  const [isClient, setIsClient] = useState(false); // Prevent hydration error

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevents hydration mismatch
  if (!isAuthenticated) return <p className="text-center mt-10">Please log in to continue.</p>;

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    await sendMessage({ roomId: id, userId: user?.email, content: message.trim() });
    setMessage("");
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-xl font-semibold text-center">Chat Room</h1>

      <button
        onClick={() => router.back()}
        className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition"
      >
        Go Back
      </button>

      <div className="border border-gray-300 p-3 rounded-lg h-64 overflow-y-auto bg-gray-50">
        {messages?.length > 0 ? (
          messages.map((msg) => (
            <p key={msg._id} className="mb-2">
              <strong>{msg.userId === user?.id ? "You" : msg.userId}:</strong> {msg.content}
            </p>
          ))
        ) : (
          <p className="text-gray-500">No messages yet. Start the conversation!</p>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}