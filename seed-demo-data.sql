-- Demo data for Nakshatra Boutique
-- Run this in your Supabase SQL Editor

-- Insert demo products
INSERT INTO products (name, category, price, discount, short_description, detail_description, is_featured, created_at, updated_at)
VALUES 
  (
    'Elegant Silk Saree',
    'Sarees',
    4500.00,
    15,
    'Luxurious pure silk saree with intricate golden border',
    'This exquisite pure silk saree features traditional handwoven patterns with a stunning golden zari border. Perfect for weddings and special occasions. The rich fabric drapes beautifully and comes with a matching blouse piece.',
    true,
    NOW(),
    NOW()
  ),
  (
    'Bridal Lehenga Set',
    'Lehengas',
    25000.00,
    20,
    'Stunning bridal lehenga with heavy embellishments',
    'Breathtaking bridal lehenga set with intricate zardozi work, sequins, and stone embellishments. Includes lehenga, choli, and dupatta. Custom fitting available.',
    true,
    NOW(),
    NOW()
  ),
  (
    'Designer Blouse',
    'Blouses',
    1200.00,
    0,
    'Trendy designer blouse with embroidery work',
    'Contemporary designer blouse featuring delicate embroidery and modern cut. Available in multiple sizes. Perfect pairing for your favorite sarees.',
    false,
    NOW(),
    NOW()
  ),
  (
    'Banarasi Silk Saree',
    'Sarees',
    6500.00,
    0,
    'Authentic Banarasi silk with traditional motifs',
    'Genuine Banarasi silk saree featuring traditional buti work and rich pallu design. A timeless piece that represents Indian heritage and craftsmanship.',
    true,
    NOW(),
    NOW()
  );

-- Insert product images (adjust product IDs based on the inserted products)
-- Get the IDs of the products we just inserted
WITH inserted_products AS (
  SELECT id, name FROM products 
  WHERE name IN ('Elegant Silk Saree', 'Bridal Lehenga Set', 'Designer Blouse', 'Banarasi Silk Saree')
  ORDER BY id DESC
  LIMIT 4
)
INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary, created_at)
SELECT 
  p.id,
  CASE 
    WHEN p.name = 'Elegant Silk Saree' THEN 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80'
    WHEN p.name = 'Bridal Lehenga Set' THEN 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80'
    WHEN p.name = 'Designer Blouse' THEN 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80'
    WHEN p.name = 'Banarasi Silk Saree' THEN 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80'
  END,
  p.name || ' - Main View',
  1,
  true,
  NOW()
FROM inserted_products p;

-- Add additional images for featured products
WITH inserted_products AS (
  SELECT id, name FROM products 
  WHERE name IN ('Elegant Silk Saree', 'Bridal Lehenga Set', 'Banarasi Silk Saree')
  ORDER BY id DESC
  LIMIT 3
)
INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary, created_at)
SELECT 
  p.id,
  CASE 
    WHEN p.name = 'Elegant Silk Saree' THEN 'https://images.unsplash.com/photo-1583391733981-5edd8e1e9c6f?w=800&q=80'
    WHEN p.name = 'Bridal Lehenga Set' THEN 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80'
    WHEN p.name = 'Banarasi Silk Saree' THEN 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80'
  END,
  p.name || ' - Detail View',
  2,
  false,
  NOW()
FROM inserted_products p;

-- Verify the data
SELECT 
  p.id,
  p.name,
  p.category,
  p.price,
  p.discount,
  COUNT(pi.id) as image_count
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id
GROUP BY p.id, p.name, p.category, p.price, p.discount
ORDER BY p.id DESC;
