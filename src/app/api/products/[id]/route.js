import { NextResponse } from 'next/server';
import { updateProduct, deleteProduct, getProducts } from '@/lib/db';

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const db = getProducts();
        const product = db.products.find(p => p.id === id);

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch product' },
            { status: 500 }
        );
    }
}


export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();

        const updated = updateProduct(id, body);

        if (!updated) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update product' },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const success = deleteProduct(id);

        if (!success) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete product' },
            { status: 500 }
        );
    }
}
