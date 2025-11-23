import { NextResponse } from 'next/server';
import { updateOrder } from '@/lib/db';

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();

        const updatedOrder = updateOrder(id, body);

        if (!updatedOrder) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedOrder);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update order' },
            { status: 500 }
        );
    }
}
