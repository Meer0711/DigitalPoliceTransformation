"use client";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function ChatRooms() {
  const { user, isAuthenticated } = useKindeBrowserClient();
  const rooms = useQuery(api.rooms.getRooms);
  const createRoom = useMutation(api.rooms.createRoom);
  const [roomName, setRoomName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  if (!isAuthenticated) {
    return <p className="text-center text-lg mt-10">Please log in to continue.</p>;
  }

  const handleCreateRoom = async () => {
    if (!roomName.trim()) return;
    setIsCreating(true);
    await createRoom({ name: roomName.trim(), userId: user?.id });
    setRoomName("");
    setIsCreating(false);
  };

  return (
    <div className="max-w-2xl mx-auto h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-semibold text-center mb-4">Chat Rooms</h1>

      {/* Create Room Input */}
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleCreateRoom} disabled={isCreating || !roomName.trim()}>
          {isCreating ? <Loader2 className="animate-spin h-5 w-5" /> : "Create"}
        </Button>
      </div>

      {/* Rooms List */}
      <div className="mt-6 space-y-3">
        {rooms === undefined ? (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin h-6 w-6 text-gray-600" />
          </div>
        ) : rooms.length === 0 ? (
          <p className="text-center text-gray-500">No rooms available. Create one above!</p>
        ) : (
          rooms.map((room) => (
            <Card key={room._id} className="p-4 hover:bg-gray-100 transition rounded-lg">
              <a href={`/chat/${room._id}`} className="block text-lg font-medium text-blue-600">
                {room.name}
              </a>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}