import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, password } = await req.json();
  const client = await clientPromise;
  const db = client.db();

  // Cherche l'utilisateur avec token valide
  const user = await db.collection("users").findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });

  // Hash le nouveau mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Met à jour le mot de passe et supprime le token
  await db.collection("users").updateOne(
    { _id: user._id },
    {
      $set: { password: hashedPassword },
      $unset: { resetToken: "", resetTokenExpiry: "" },
    }
  );

  return NextResponse.json({ message: "Password successfully reset" });
}
