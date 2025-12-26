// app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/app/db';
import { products } from '@/app/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Fetch product with images
    const product = await db.query.products.findFirst({
      where: eq(products.id, productId),
      with: {
        images: {
          orderBy: (images, { asc }) => [asc(images.displayOrder)],
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
