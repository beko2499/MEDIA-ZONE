import { NextResponse } from "next/server";
import { getOrders, saveOrder } from "@/lib/db";

export async function GET() {
    try {
        const db = getOrders();
        // Sort by createdAt desc
        const orders = db.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        // body contains: items, total, paymentMethod, whatsappNumber, paymentProofImage, fullName, phone, address, notes

        const newOrder = saveOrder(body);
        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

