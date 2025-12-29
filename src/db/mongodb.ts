import mongoose, { Mongoose } from "mongoose";

const globalWithMongoose = global as typeof global & {
  mongoose?: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

const cached = globalWithMongoose.mongoose;

export async function connectToDatabase(): Promise<Mongoose> {
  if (!process.env.MONGODB_URI || !process.env.MONGODB_NAME)
    throw new Error(
      "Please provide a MongoDB URI and name in the environment variables"
    );

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_NAME,
    });
  }

  cached.conn = await cached.promise;
  console.log("✓ Database connected");
  return cached.conn;
}
