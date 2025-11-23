import { NextResponse } from 'next/server';
import { getProducts, saveProduct } from '@/lib/db';

export async function GET() {
    try {
        const db = getProducts();
        return NextResponse.json(db.products);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.title || !body.price) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const newProduct = saveProduct(body);
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        );
    }
}
