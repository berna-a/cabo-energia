# CABO ENERGIA

Website de energia solar para casas e negócios em Cabo Verde.
React, TypeScript e Vite; alojamento Vercel; base dedicada Convex.

## Desenvolvimento

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
npm audit
```

Node.js 22 ou superior. O lockfile de referência é `package-lock.json`.

## Arquitectura

O browser submete para `/api/notify-lead`. O servidor valida, limita pedidos e
grava no Convex antes de confirmar sucesso. Um identificador estável permite
repetir pedidos sem duplicar leads. A notificação por email é assíncrona,
com tentativas e estado de entrega separados da gravação.

As queries de leads são internas. Nenhuma credencial de administração é enviada
ao browser. `/proposta` e o respectivo módulo são protegidos no servidor;
o gerador produz minutas PDF no dispositivo, sem guardar dados do destinatário.

## Configuração de servidor

Ver `.env.example`. Nunca prefixar segredos com `VITE_`.

- Vercel: `CABO_CONVEX_URL`, `LEAD_INGEST_KEY`, `RESEND_API_KEY`,
  `LEAD_NOTIFY_FROM`, `LEAD_NOTIFY_TO` e `PROPOSAL_PASSWORD`.
- Convex: o mesmo `LEAD_INGEST_KEY` e `NOTIFICATION_BASE_URL`.
- Desenvolvimento: usar um deployment Convex isolado, nunca a produção por omissão.
- Propostas: utilizador HTTP Basic `cabo`; palavra-passe definida no servidor.
  Sem configuração, o acesso permanece fechado.

Publicar backend e frontend apenas no projecto verificado e com autorização.
GitHub Actions executa lint, testes, verificação de tipos e build.
A configuração Vercel inclui cabeçalhos de segurança e protecção das propostas.

## Conteúdo comercial

`src/lib/catalog.ts` é a fonte comum das configurações do website, simulador e
propostas. As configurações são indicativas e dependem da avaliação técnica.
Não há preços fixos nem prazo de retorno garantido. O simulador apresenta
pressupostos editáveis e um intervalo de poupança, não uma proposta vinculativa.

PT, EN e FR em `src/i18n/locales/` e `src/lib/commercialCopy.ts`.
A marca e os componentes vivem em `src/components/brand/`.

## Dados e documentação privada

Backups, credenciais, históricos de clientes e documentação operacional não
pertencem a este repositório público. Os directórios privados são excluídos
de Git e do pacote de alojamento. `supabase/` e `db/` preservam apenas
definições históricas e não integram o fluxo activo do website.
