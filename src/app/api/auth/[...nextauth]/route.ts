// src/app/api/auth/[...nextauth]/route.ts
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// NextAuth configuration object
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // Google OAuth provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Custom email/password provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const client = await clientPromise;
        const usersCollection = client.db().collection("users");

        // Find user by email
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        // Compare hashed password
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        }

        // Return null if authentication fails
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt" as const, // use JWT strategy
  },
  pages: {
    signIn: "/login", // custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET, // used to encrypt JWT
};

// Create NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
