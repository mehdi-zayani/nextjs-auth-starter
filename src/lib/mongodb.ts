// src/lib/mongodb.ts
import { MongoClient, MongoClientOptions } from "mongodb";

// Use environment variable or fallback to a local MongoDB URI for dev/testing
const uri: string =
  process.env.MONGODB_URI || "mongodb://localhost:27017/devdb";
const options: MongoClientOptions = {}; // Options object can be extended if needed

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Warn if no real Mongo URI is provided
if (!process.env.MONGODB_URI) {
  console.warn(
    "⚠ MONGODB_URI is not set. Using fallback local MongoDB for development/testing.",
  );
}

if (process.env.NODE_ENV === "development") {
  // Prevent multiple connections in development
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
