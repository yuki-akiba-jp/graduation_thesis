import { Player } from "./Player";

export class Team {
  id: number;
  name: string;
  score: number;
  players: Player[];

  constructor(id: number, name: string, score: number, players: Player[]) {
    this.id = id;
    this.name = name;
    this.score = score;
    this.players = players;
  }
}
