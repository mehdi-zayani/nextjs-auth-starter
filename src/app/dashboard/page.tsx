"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100 dark:bg-purple-900 px-4">
      <h1 className="text-4xl font-bold text-purple-900 dark:text-purple-100 mb-4">Dashboard</h1>
      <p className="text-center text-purple-700 dark:text-purple-300">
        Welcome to your dashboard. Everything here is protected after login.
      </p>
    </div>
  );
}
