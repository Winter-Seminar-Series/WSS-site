'use server';

import { redirect } from "next/navigation";
import { getSession } from "../session";

export default async function logout() {
    const session = await getSession();
    session.isLoggedIn = false;
    session.accessToken = null;
    session.refreshToken = null;
    await session.save();

    redirect("/");
}