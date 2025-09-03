-- Basic schema for ContentFlow
create table if not exists profiles (
  user_id uuid primary key,
  email text unique,
  plan text not null default 'free',
  created_at timestamp with time zone default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(user_id) on delete set null,
  title text,
  input text not null,
  created_at timestamp with time zone default now()
);

create table if not exists outputs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  kind text not null, -- linkedin/twitter/instagram/youtube
  content text not null,
  created_at timestamp with time zone default now()
);
