"use client"

import { useAuth } from "@/components/providers/AuthProvider";

export default function Home() {
  const { user } = useAuth()
  return (
    <div className="w-full h-screen flex justify-center items-center text-3xl">
      Hello {user?.username}
    </div>
  );
}
