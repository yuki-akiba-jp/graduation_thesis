import React, { useState } from "react";
import { useRouter } from "next/router";
import { io, Socket } from "socket.io-client";

const Index: React.FC = () => {
  const [memberNames, setMemberNames] = useState("");
  const [teamName, setTeamName] = useState("");
  const router = useRouter();
  router.query.team = teamName;
  useEffect(() => {
    setMemberNames(router.query.memberNames);
    setTeamName(router.query.teamName);
  }, []);

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
