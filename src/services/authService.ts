import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function registerUser(name: string, email: string, password: string) {
  const client = await clientPromise;
  const db = client.db();

  const usersCollection = db.collection("users");

  // check if email already exists
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const result = await usersCollection.insertOne({
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });

  return { id: result.insertedId.toString(), name, email };
}
