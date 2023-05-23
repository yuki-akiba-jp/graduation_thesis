import { IPlayer } from "./IPlayer";
import { IProblem } from "./IProblem";

export interface ITeam {
  _id: string;
  name: string;
  score: number;
  players: IPlayer[];
  problems: IProblem[];
}
