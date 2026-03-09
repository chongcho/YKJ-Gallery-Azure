# Admin Setup Guide

The YKJ Gallery has an admin panel for managing content (paintings, exhibitions, videos). It uses **Supabase** for authentication and database.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Create a new project
3. Wait for the database to be ready

## 2. Run the database migration

1. In Supabase Dashboard → **SQL Editor**
2. Copy the contents of `supabase/migrations/001_initial.sql`
3. Run the SQL to create tables and policies

## 3. Create an admin user

1. In Supabase Dashboard → **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter email and password (this will be your admin login)
4. Click **Create user**

## 4. Configure environment variables

1. Copy `.env.example` to `.env.local`
2. Add your Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL` — from Supabase → Settings → API
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Supabase → Settings → API (anon public key)

## 5. Seed initial data (optional)

If you want to populate the database with your existing paintings, exhibitions, and videos:

1. Get your **Service Role Key** from Supabase → Settings → API (keep this secret!)
2. Add to `.env.local`: `SUPABASE_SERVICE_ROLE_KEY=your-service-role-key`
3. Run: `npm run seed`

## 6. Access the admin panel

1. Go to `/admin/login` (or click **Admin** in the footer)
2. Sign in with the email and password you created
3. Manage paintings, exhibitions, and videos

## Notes

- **Without Supabase**: The site still works using static data from `src/data/`. The admin panel will show "Supabase not configured."
- **Image paths**: When adding paintings or exhibitions, use paths like `/images/paintings/your-image.jpg`. Upload images to `public/images/` first.
- **Video files**: Place video files in `public/videos/` and reference them as `/videos/filename.mp4`.
