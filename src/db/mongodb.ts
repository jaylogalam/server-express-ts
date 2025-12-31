import mongoose from "mongoose";

async function main() {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log("✓ Database connected");
}

main().catch((err) => console.log(err));

export const client = mongoose.connection.getClient();
export const db = client.db(process.env.MONGODB_NAME!);
