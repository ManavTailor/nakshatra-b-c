// db/schema.ts
import { pgTable, serial, text, integer, boolean, decimal, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(), // e.g., "Sarees", "Blouses", "Lehengas"
  price: decimal('price', { precision: 10, scale: 2 }).notNull(), // e.g., 2500.00
  // sku: text('sku').unique(), // e.g., "NK-SAR-001"
  discount: integer('discount').default(0), // Discount percentage (0-100)
  shortDescription: text('short_description'), // For product cards
  detailDescription: text('detail_description'), // For product detail pages
  isFeatured: boolean('is_featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const productImages = pgTable('product_images', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  imageUrl: text('image_url').notNull(),
  altText: text('alt_text'),
  displayOrder: integer('display_order').default(0), // For ordering images in carousel
  isPrimary: boolean('is_primary').default(false), // Main product image
  createdAt: timestamp('created_at').defaultNow(),
});

// Define relationships
export const productsRelations = relations(products, ({ many }) => ({
  images: many(productImages),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));
