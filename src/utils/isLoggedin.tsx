// src/utils/isLoggedin.tsx - do NOT call from client components

import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export async function isLoggedin() {
  const session = await getServerSession(authOptions);
  return !!session;
}

export async function isAdminLoggedin() {
  const session = await getServerSession(authOptions);
  return session?.user?.is_admin || false;
}
