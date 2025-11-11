// src/lib/mongodb.ts
import { MongoClient, MongoClientOptions } from "mongodb";

// MongoDB connection URI from environment variables
const uri: string = process.env.MONGODB_URI!;
const options: MongoClientOptions = {}; // Options object can be extended if needed

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Ensure the Mongo URI exists
if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development, prevent multiple connections using a global variable
  if (
    !(global as unknown as { _mongoClientPromise?: Promise<MongoClient> })
      ._mongoClientPromise
  ) {
    client = new MongoClient(uri, options);
    (
      global as unknown as { _mongoClientPromise?: Promise<MongoClient> }
    )._mongoClientPromise = client.connect();
  }
  clientPromise = (
    global as unknown as { _mongoClientPromise?: Promise<MongoClient> }
  )._mongoClientPromise!;
} else {
  // In production, create a new client for each connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export the client promise for usage in NextAuth or other API routes
export default clientPromise;
