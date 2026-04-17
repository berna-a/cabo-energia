-- CABO ENERGIA — leads table migration
--
-- IMPORTANTE: Esta migration NÃO é aplicada automaticamente.
-- Cole este SQL no SQL Editor do seu projeto Supabase e execute manualmente,
-- depois de definir VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no ambiente.

create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  phone        text not null,
  client_type  text not null check (client_type in ('residencial', 'empresarial')),
  source       text not null default 'website_homepage',
  status       text not null default 'new_lead',
  created_at   timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Visitantes anónimos só podem INSERIR leads a partir do site público.
-- Não podem SELECT, UPDATE nem DELETE.
drop policy if exists "Anon can insert leads" on public.leads;
create policy "Anon can insert leads"
  on public.leads
  for insert
  to anon
  with check (
    char_length(name) between 1 and 120
    and char_length(phone) between 5 and 30
    and client_type in ('residencial', 'empresarial')
  );

-- A leitura/edição é feita por staff autenticado (service role / app de admin).
-- Por design, não existe policy pública de SELECT.
