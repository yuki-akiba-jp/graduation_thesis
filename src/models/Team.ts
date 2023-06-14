import mongoose, { Document, Model } from "mongoose";
import Player, { PlayerDocument } from "./Player";
import Problem, { ProblemDocument } from "./Problem";

export interface ITeam {
  name: string;
  score?: number;
  players: PlayerDocument[];
  problems: ProblemDocument[];
}

export interface ITeamForRanking {
  name: string;
  score?: number;
  players: PlayerDocument[];
}

export interface TeamDocument extends ITeam, Document {}
export interface TeamForRanking extends ITeamForRanking, Document {}

const TeamSchema = new mongoose.Schema<TeamDocument>({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  score: Number,
  players: [Player.schema],
  problems: [Problem.schema],
});

let Team: Model<TeamDocument>;

if (mongoose.models.Team) {
  Team = mongoose.model<TeamDocument>("Team");
} else {
  Team = mongoose.model<TeamDocument>("Team", TeamSchema);
}

export default Team;
