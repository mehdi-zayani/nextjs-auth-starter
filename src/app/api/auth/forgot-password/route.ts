import clientPromise from "@/lib/mongodb";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  const client = await clientPromise;
  const db = client.db();

  // Cherche l'utilisateur
  const user = await db.collection("users").findOne({ email });
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  // Génère token + expiry
  const token = crypto.randomBytes(32).toString("hex");
  const expiry = Date.now() + 1000 * 60 * 60; // 1h

  // Met à jour l'utilisateur
  await db
    .collection("users")
    .updateOne({ email }, { $set: { resetToken: token, resetTokenExpiry: expiry } });

  // Affiche le lien en console (dev mode)
  console.log(`Reset link (dev mode): http://localhost:3000/reset-password/${token}`);

  return NextResponse.json({ message: "Reset link generated (check console in dev mode)" });
}
