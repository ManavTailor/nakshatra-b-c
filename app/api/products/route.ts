// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/app/db';
import { products, productImages } from '@/app/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    // Fetch all products with their images
    const allProducts = await db.query.products.findMany({
      with: {
        images: {
          orderBy: (images, { asc }) => [asc(images.displayOrder)],
        },
      },
      orderBy: (products, { desc }) => [desc(products.isFeatured), desc(products.createdAt)],
    });

    return NextResponse.json(allProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
