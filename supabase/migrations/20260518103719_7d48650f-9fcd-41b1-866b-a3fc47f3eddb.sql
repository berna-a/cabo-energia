create extension if not exists "pgcrypto";

create table public.leads (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  phone        text not null,
  client_type  text not null check (client_type in ('residencial', 'empresarial')),
  source       text not null default 'website_homepage',
  status       text not null default 'new_lead',
  created_at   timestamptz not null default now()
);

alter table public.leads enable row level security;

create policy "Anon can insert leads"
  on public.leads
  for insert
  to anon
  with check (
    char_length(name) between 1 and 120
    and char_length(phone) between 5 and 30
    and client_type in ('residencial', 'empresarial')
  );

create policy "Authenticated can insert leads"
  on public.leads
  for insert
  to authenticated
  with check (
    char_length(name) between 1 and 120
    and char_length(phone) between 5 and 30
    and client_type in ('residencial', 'empresarial')
  );