// Quick demo data insert script
// Run with: npx tsx insert-demo-data.ts

import { createClient } from '@supabase/supabase-js';

// Get these from your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertDemoData() {
  console.log('🌱 Inserting demo data...');

  try {
    // Insert products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .insert([
        {
          name: 'Elegant Silk Saree',
          category: 'Sarees',
          price: '4500.00',
          discount: 15,
          short_description: 'Luxurious pure silk saree with intricate golden border',
          detail_description: 'This exquisite pure silk saree features traditional handwoven patterns with a stunning golden zari border. Perfect for weddings and special occasions.',
          is_featured: true,
        },
        {
          name: 'Bridal Lehenga Set',
          category: 'Lehengas',
          price: '25000.00',
          discount: 20,
          short_description: 'Stunning bridal lehenga with heavy embellishments',
          detail_description: 'Breathtaking bridal lehenga set with intricate zardozi work, sequins, and stone embellishments. Includes lehenga, choli, and dupatta.',
          is_featured: true,
        },
        {
          name: 'Designer Blouse',
          category: 'Blouses',
          price: '1200.00',
          discount: 0,
          short_description: 'Trendy designer blouse with embroidery work',
          detail_description: 'Contemporary designer blouse featuring delicate embroidery and modern cut. Available in multiple sizes.',
          is_featured: false,
        },
        {
          name: 'Banarasi Silk Saree',
          category: 'Sarees',
          price: '6500.00',
          discount: 0,
          short_description: 'Authentic Banarasi silk with traditional motifs',
          detail_description: 'Genuine Banarasi silk saree featuring traditional buti work and rich pallu design. A timeless piece that represents Indian heritage.',
          is_featured: true,
        },
      ])
      .select();

    if (productsError) {
      console.error('❌ Error inserting products:', productsError);
      return;
    }

    console.log(`✅ Inserted ${products?.length} products`);

    // Insert product images
    if (products && products.length > 0) {
      const images = [
        // Elegant Silk Saree
        {
          product_id: products[0].id,
          image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
          alt_text: 'Elegant Silk Saree - Main View',
          display_order: 1,
          is_primary: true,
        },
        {
          product_id: products[0].id,
          image_url: 'https://images.unsplash.com/photo-1583391733981-5edd8e1e9c6f?w=800&q=80',
          alt_text: 'Elegant Silk Saree - Detail View',
          display_order: 2,
          is_primary: false,
        },
        // Bridal Lehenga Set
        {
          product_id: products[1].id,
          image_url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
          alt_text: 'Bridal Lehenga Set - Main View',
          display_order: 1,
          is_primary: true,
        },
        {
          product_id: products[1].id,
          image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
          alt_text: 'Bridal Lehenga Set - Detail View',
          display_order: 2,
          is_primary: false,
        },
        // Designer Blouse
        {
          product_id: products[2].id,
          image_url: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80',
          alt_text: 'Designer Blouse - Main View',
          display_order: 1,
          is_primary: true,
        },
        // Banarasi Silk Saree
        {
          product_id: products[3].id,
          image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80',
          alt_text: 'Banarasi Silk Saree - Main View',
          display_order: 1,
          is_primary: true,
        },
        {
          product_id: products[3].id,
          image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
          alt_text: 'Banarasi Silk Saree - Detail View',
          display_order: 2,
          is_primary: false,
        },
      ];

      const { data: insertedImages, error: imagesError } = await supabase
        .from('product_images')
        .insert(images)
        .select();

      if (imagesError) {
        console.error('❌ Error inserting images:', imagesError);
        return;
      }

      console.log(`✅ Inserted ${insertedImages?.length} product images`);
    }

    console.log('🎉 Demo data inserted successfully!');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

insertDemoData();
