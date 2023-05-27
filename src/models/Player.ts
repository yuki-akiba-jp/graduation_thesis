import mongoose, { Document, Model } from "mongoose";

export interface IPlayer {
  name: string;
  score?: number;
  teamName?: string;
}

export interface PlayerDocument extends IPlayer, Document {}

const PlayerSchema = new mongoose.Schema<PlayerDocument>({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  score: Number,
  teamName: {
    type: String,
    min: 3,
    max: 20,
  },
});

let Player: Model<PlayerDocument>;

if (mongoose.models.Player) {
  Player = mongoose.model<PlayerDocument>("Player");
} else {
  Player = mongoose.model<PlayerDocument>("Player", PlayerSchema);
}

export default Player;
