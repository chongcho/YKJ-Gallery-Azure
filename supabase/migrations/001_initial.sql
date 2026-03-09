-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Paintings table
create table paintings (
  id text primary key,
  title text not null,
  category text not null check (category in ('adobe', 'cactus', 'flowers', 'imaginary', 'other')),
  year integer not null,
  medium text not null,
  size text not null,
  image text not null,
  "order" integer default 0,
  created_at timestamptz default now()
);

-- Exhibitions table
create table exhibitions (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  tagline text,
  description text,
  location text,
  link text,
  link_label text,
  "order" integer default 0,
  created_at timestamptz default now()
);

-- Exhibition images (one exhibition can have many images)
create table exhibition_images (
  id uuid primary key default uuid_generate_v4(),
  exhibition_id uuid not null references exhibitions(id) on delete cascade,
  src text not null,
  "order" integer default 0,
  created_at timestamptz default now()
);

-- Videos table
create table videos (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  placeholder text not null,
  src text,
  youtube_id text,
  vimeo_id text,
  "order" integer default 0,
  created_at timestamptz default now()
);

-- RLS: allow public read for all content
alter table paintings enable row level security;
alter table exhibitions enable row level security;
alter table exhibition_images enable row level security;
alter table videos enable row level security;

create policy "Public read paintings" on paintings for select using (true);
create policy "Public read exhibitions" on exhibitions for select using (true);
create policy "Public read exhibition_images" on exhibition_images for select using (true);
create policy "Public read videos" on videos for select using (true);

-- Only authenticated users can write (admin)
create policy "Auth insert paintings" on paintings for insert with check (auth.role() = 'authenticated');
create policy "Auth update paintings" on paintings for update using (auth.role() = 'authenticated');
create policy "Auth delete paintings" on paintings for delete using (auth.role() = 'authenticated');

create policy "Auth insert exhibitions" on exhibitions for insert with check (auth.role() = 'authenticated');
create policy "Auth update exhibitions" on exhibitions for update using (auth.role() = 'authenticated');
create policy "Auth delete exhibitions" on exhibitions for delete using (auth.role() = 'authenticated');

create policy "Auth insert exhibition_images" on exhibition_images for insert with check (auth.role() = 'authenticated');
create policy "Auth update exhibition_images" on exhibition_images for update using (auth.role() = 'authenticated');
create policy "Auth delete exhibition_images" on exhibition_images for delete using (auth.role() = 'authenticated');

create policy "Auth insert videos" on videos for insert with check (auth.role() = 'authenticated');
create policy "Auth update videos" on videos for update using (auth.role() = 'authenticated');
create policy "Auth delete videos" on videos for delete using (auth.role() = 'authenticated');
