# Supabase Database Setup

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in:
   - **Name**: nakshatra-boutique
   - **Database Password**: (create a strong password - save it!)
   - **Region**: Choose closest to you
5. Click "Create new project" (takes ~2 minutes)

## Step 2: Get Connection String

1. In your Supabase project dashboard, click "Project Settings" (gear icon)
2. Go to "Database" section
3. Scroll to "Connection string" → "URI"
4. Copy the connection string (looks like):
   ```
   postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with your actual database password

## Step 3: Update .env.local

The file already exists. Just update the `DATABASE_URL` with your Supabase connection string:

```env
DATABASE_URL="postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres"
```

## Step 4: Create Tables and Add Data

Run these commands:

```bash
# Push schema to create tables
npm run db:push

# Seed with demo products
npm run db:seed
```

## Step 5: Restart Dev Server

```bash
# Stop current server (Ctrl+C if needed)
npm run dev
```

Visit `http://localhost:3000` to see your products!

## View Your Data

You can view and edit your data directly in Supabase:
1. Go to your project dashboard
2. Click "Table Editor" in the sidebar
3. You'll see `products` and `product_images` tables
