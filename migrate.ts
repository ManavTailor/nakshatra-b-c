// Simple migration script using pg
import { config } from 'dotenv';
import pg from 'pg';

config({ path: '.env.local' });

const { Client } = pg;

async function migrate() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    // Create products table
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        discount INTEGER DEFAULT 0,
        short_description TEXT,
        detail_description TEXT,
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Created products table');

    // Create product_images table
    await client.query(`
      CREATE TABLE IF NOT EXISTS product_images (
        id SERIAL PRIMARY KEY,
        product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        image_url TEXT NOT NULL,
        alt_text TEXT,
        display_order INTEGER DEFAULT 0,
        is_primary BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Created product_images table');

    // Insert sample products
    const products = [
      ['Elegant Silk Saree', 'Sarees', 4500.00, 15, 'Luxurious pure silk saree with intricate golden border', 'This exquisite pure silk saree features traditional handwoven patterns with a stunning golden zari border. Perfect for weddings and special occasions.', true],
      ['Designer Blouse', 'Blouses', 1200.00, 0, 'Trendy designer blouse with embroidery work', 'Contemporary designer blouse featuring delicate embroidery and modern cut. Available in multiple sizes.', false],
      ['Bridal Lehenga Set', 'Lehengas', 25000.00, 20, 'Stunning bridal lehenga with heavy embellishments', 'Breathtaking bridal lehenga set with intricate zardozi work, sequins, and stone embellishments.', true],
      ['Cotton Kurti', 'Kurtis', 800.00, 10, 'Comfortable cotton kurti for everyday wear', 'Soft, breathable cotton kurti with elegant prints. Perfect for daily wear and casual occasions.', false],
      ['Banarasi Silk Saree', 'Sarees', 6500.00, 0, 'Authentic Banarasi silk with traditional motifs', 'Genuine Banarasi silk saree featuring traditional buti work and rich pallu design.', true],
    ];

    for (const product of products) {
      await client.query(
        `INSERT INTO products (name, category, price, discount, short_description, detail_description, is_featured) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        product
      );
    }
    console.log(`✅ Inserted ${products.length} products`);

    // Insert sample images
    const images = [
      [1, '/images/products/saree-1.jpg', 'Elegant Silk Saree', 1, true],
      [1, '/images/products/saree-1-detail.jpg', 'Silk Saree Detail', 2, false],
      [2, '/images/products/blouse-1.jpg', 'Designer Blouse', 1, true],
      [3, '/images/products/lehenga-1.jpg', 'Bridal Lehenga', 1, true],
      [3, '/images/products/lehenga-1-detail.jpg', 'Lehenga Detail', 2, false],
      [4, '/images/products/kurti-1.jpg', 'Cotton Kurti', 1, true],
      [5, '/images/products/saree-2.jpg', 'Banarasi Silk Saree', 1, true],
    ];

    for (const image of images) {
      await client.query(
        `INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary) 
         VALUES ($1, $2, $3, $4, $5)`,
        image
      );
    }
    console.log(`✅ Inserted ${images.length} product images`);

    console.log('🎉 Migration and seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await client.end();
  }
}

migrate();
