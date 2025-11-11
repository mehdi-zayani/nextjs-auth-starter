// src/app/api/auth/register/route.ts
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// Define the shape of the request body for registration
interface RegisterRequestBody {
  name?: string;
  email: string;
  password: string;
}

// POST handler for user registration
export async function POST(req: NextRequest) {
  try {
    // Parse JSON body with proper typing
    const { name, email, password }: RegisterRequestBody = await req.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Missing email or password" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const usersCollection = client.db().collection("users");

    // Check if the user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 },
      );
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    // Return a success response with the inserted user ID
    return NextResponse.json({
      success: true,
      message: "User created",
      userId: result.insertedId,
    });
  } catch (err: unknown) {
    // Log error and return a generic 500 response
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
