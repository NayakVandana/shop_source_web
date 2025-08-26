
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export async function isLoggedin() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return false;
    }
    return true;
}

export async function isAdminLoggedin() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return false;
    }
    const isAdmin = session?.user?.is_admin
    
    return isAdmin;
}