import { Player } from "./Player";
import { Problem } from "./Problem";
export interface Team {
  _id: string;
  name: string;
  score: number;
  players: Player[];
  problems: Problem[];
}
