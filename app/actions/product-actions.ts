'use server';

import { db } from '@/app/db';
import { products, productImages } from '@/app/db/schema';
import { ilike, eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function searchProducts(query: string) {
  if (!query) return [];

  const results = await db.query.products.findMany({
    where: ilike(products.name, `%${query}%`),
    limit: 5,
    with: {
      images: {
        limit: 1,
        orderBy: (images, { asc }) => [asc(images.displayOrder)],
      }
    }
  });

  return results;
}

export async function getProductById(id: number) {
  try {
    const product = await db.query.products.findFirst({
      where: eq(products.id, id),
      with: {
        images: {
          orderBy: (images, { asc }) => [asc(images.displayOrder)],
        }
      }
    });

    return { success: true, product };
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return { success: false, error: 'Failed to fetch product' };
  }
}

export async function createProduct(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const price = formData.get('price') as string;
    // const sku = formData.get('sku') as string;
    const discount = parseInt(formData.get('discount') as string) || 0;
    const shortDescription = formData.get('shortDescription') as string;
    const detailDescription = formData.get('detailDescription') as string;
    const isFeatured = formData.get('isFeatured') === 'on';

    const [newProduct] = await db.insert(products).values({
      name,
      category,
      price: price,
      // sku,
      discount,
      shortDescription,
      detailDescription,
      isFeatured,
    }).returning();

    // Handle Image URL if provided directly (Simplified for demo)
    const imageUrl = formData.get('imageUrl') as string;
    if (imageUrl && newProduct) {
      await db.insert(productImages).values({
        productId: newProduct.id,
        imageUrl: imageUrl,
        isPrimary: true,
        displayOrder: 1,
      });
    }

    revalidatePath('/admin');
    revalidatePath('/products');
    return { success: true, product: newProduct };
  } catch (error) {
    console.error('Failed to create product:', error);
    return { success: false, error: 'Failed to create product' };
  }
}
