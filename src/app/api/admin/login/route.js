import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function POST(request) {
    try {
        const { idToken } = await request.json();
        const decodedToken = await adminAuth.verifyIdToken(idToken);

        // Here you could set a session cookie if you wanted to do server-side auth management
        // For now, we just return success to let the client know the token is valid

        return NextResponse.json({ uid: decodedToken.uid, email: decodedToken.email });
    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}
