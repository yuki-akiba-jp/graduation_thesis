import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(

    // to use mongodb in production like mongodb atlas
    // process.env.NEXT_PUBLIC_MONGODB_URI as string

    //
    // to use mongodb in local
    process.env.MONGODB_URI as string
  );
  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
