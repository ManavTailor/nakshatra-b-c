// db/seed.ts
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

import { db } from './index';
import { products, productImages } from './schema';

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Sample products for Nakshatra Boutique
    const sampleProducts = [
      {
        name: 'Elegant Silk Saree',
        category: 'Sarees',
        price: '4500.00',
        discount: 15,
        shortDescription: 'Luxurious pure silk saree with intricate golden border',
        detailDescription: 'This exquisite pure silk saree features traditional handwoven patterns with a stunning golden zari border. Perfect for weddings and special occasions. The rich fabric drapes beautifully and comes with a matching blouse piece.',
        isFeatured: true,
      },
      {
        name: 'Designer Blouse',
        category: 'Blouses',
        price: '1200.00',
        discount: 0,
        shortDescription: 'Trendy designer blouse with embroidery work',
        detailDescription: 'Contemporary designer blouse featuring delicate embroidery and modern cut. Available in multiple sizes. Perfect pairing for your favorite sarees.',
        isFeatured: false,
      },
      {
        name: 'Bridal Lehenga Set',
        category: 'Lehengas',
        price: '25000.00',
        discount: 20,
        shortDescription: 'Stunning bridal lehenga with heavy embellishments',
        detailDescription: 'Breathtaking bridal lehenga set with intricate zardozi work, sequins, and stone embellishments. Includes lehenga, choli, and dupatta. Custom fitting available.',
        isFeatured: true,
      },
      {
        name: 'Cotton Kurti',
        category: 'Kurtis',
        price: '800.00',
        discount: 10,
        shortDescription: 'Comfortable cotton kurti for everyday wear',
        detailDescription: 'Soft, breathable cotton kurti with elegant prints. Perfect for daily wear and casual occasions. Machine washable and easy to maintain.',
        isFeatured: false,
      },
      {
        name: 'Banarasi Silk Saree',
        category: 'Sarees',
        price: '6500.00',
        discount: 0,
        shortDescription: 'Authentic Banarasi silk with traditional motifs',
        detailDescription: 'Genuine Banarasi silk saree featuring traditional buti work and rich pallu design. A timeless piece that represents Indian heritage and craftsmanship.',
        isFeatured: true,
      },
      {
        name: 'Anarkali Suit',
        category: 'Suits',
        price: '3200.00',
        discount: 25,
        shortDescription: 'Graceful Anarkali suit with flared silhouette',
        detailDescription: 'Beautiful Anarkali suit set with flowing silhouette, intricate embroidery on the yoke, and matching dupatta. Perfect for festive occasions.',
        isFeatured: false,
      },
    ];

    // Insert products
    const insertedProducts = await db.insert(products).values(sampleProducts).returning();
    console.log(`✅ Inserted ${insertedProducts.length} products`);

    // Sample images for products (using placeholder images)
    const sampleImages = [
      // Elegant Silk Saree
      { productId: insertedProducts[0].id, imageUrl: '/images/products/saree-1-main.jpg', altText: 'Elegant Silk Saree - Front View', displayOrder: 1, isPrimary: true },
      { productId: insertedProducts[0].id, imageUrl: '/images/products/saree-1-detail.jpg', altText: 'Elegant Silk Saree - Border Detail', displayOrder: 2, isPrimary: false },
      { productId: insertedProducts[0].id, imageUrl: '/images/products/saree-1-drape.jpg', altText: 'Elegant Silk Saree - Draped View', displayOrder: 3, isPrimary: false },
      
      // Designer Blouse
      { productId: insertedProducts[1].id, imageUrl: '/images/products/blouse-1-main.jpg', altText: 'Designer Blouse - Front', displayOrder: 1, isPrimary: true },
      { productId: insertedProducts[1].id, imageUrl: '/images/products/blouse-1-back.jpg', altText: 'Designer Blouse - Back Design', displayOrder: 2, isPrimary: false },
      
      // Bridal Lehenga Set
      { productId: insertedProducts[2].id, imageUrl: '/images/products/lehenga-1-main.jpg', altText: 'Bridal Lehenga - Complete Set', displayOrder: 1, isPrimary: true },
      { productId: insertedProducts[2].id, imageUrl: '/images/products/lehenga-1-detail.jpg', altText: 'Bridal Lehenga - Embroidery Detail', displayOrder: 2, isPrimary: false },
      { productId: insertedProducts[2].id, imageUrl: '/images/products/lehenga-1-dupatta.jpg', altText: 'Bridal Lehenga - Dupatta', displayOrder: 3, isPrimary: false },
      
      // Cotton Kurti
      { productId: insertedProducts[3].id, imageUrl: '/images/products/kurti-1-main.jpg', altText: 'Cotton Kurti', displayOrder: 1, isPrimary: true },
      { productId: insertedProducts[3].id, imageUrl: '/images/products/kurti-1-side.jpg', altText: 'Cotton Kurti - Side View', displayOrder: 2, isPrimary: false },
      
      // Banarasi Silk Saree
      { productId: insertedProducts[4].id, imageUrl: '/images/products/saree-2-main.jpg', altText: 'Banarasi Silk Saree', displayOrder: 1, isPrimary: true },
      { productId: insertedProducts[4].id, imageUrl: '/images/products/saree-2-pallu.jpg', altText: 'Banarasi Silk Saree - Pallu Design', displayOrder: 2, isPrimary: false },
      
      // Anarkali Suit
      { productId: insertedProducts[5].id, imageUrl: '/images/products/anarkali-1-main.jpg', altText: 'Anarkali Suit', displayOrder: 1, isPrimary: true },
      { productId: insertedProducts[5].id, imageUrl: '/images/products/anarkali-1-detail.jpg', altText: 'Anarkali Suit - Embroidery Detail', displayOrder: 2, isPrimary: false },
    ];

    await db.insert(productImages).values(sampleImages);
    console.log(`✅ Inserted ${sampleImages.length} product images`);

    console.log('🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

seed();
