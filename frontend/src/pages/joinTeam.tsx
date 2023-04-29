import React, { useState } from "react";
import { useRouter } from "next/router";
import { io, Socket } from "socket.io-client";

const Index: React.FC = () => {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const router = useRouter();

  const joinTeam = () => {
    if (name && team) {
      const socket: Socket = io(
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
      );
      socket.emit("joinTeam", { name, team });
      router.push({ pathname: "room", query: { team: team } });
    }
  };

  return (
    <div>
      <h1>Join a Team</h1>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Team Name"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
      />
      <button onClick={joinTeam}>Join</button>
    </div>
  );
};

export default Index;
