# CABO ENERGIA

Energia solar para casas e negócios em Cabo Verde.

## Configuração do Supabase (manual)

O site usa o Supabase para receber leads do formulário "Pedir Estudo de Poupança".
A ligação é manual — define duas variáveis de ambiente no teu deploy:

```
VITE_SUPABASE_URL=https://<teu-projeto>.supabase.co
VITE_SUPABASE_ANON_KEY=<chave-anon-publica>
```

Sem estas variáveis, o formulário continua a funcionar visualmente
(submissões são apenas registadas na consola para teste).

## Migration da tabela `leads`

A migration **não é aplicada automaticamente**.
Cola o conteúdo de `db/migrations/0001_create_leads.sql` no SQL Editor do
Supabase e executa manualmente. A tabela tem RLS ativada e apenas permite
INSERT a visitantes anónimos.

## Stack

- React + Vite + TypeScript
- Tailwind CSS + shadcn/ui (primitivos)
- Sistema de design próprio em `src/components/brand/`
- Secções da homepage em `src/components/sections/`
