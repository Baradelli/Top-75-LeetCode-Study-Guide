# Deploy (Vercel)

O curso é um app **Next.js 16** que gera **páginas estáticas** (todas as rotas
são SSG/estáticas — não há serverless functions nem banco). Isso o torna ideal
para a Vercel (ou qualquer host estático). Pyodide (Python) e o Monaco Editor
são carregados de CDN no navegador, então não há nada para configurar no
servidor.

## Importante: o app fica na subpasta `web/`

Este repositório é um monorepo; o app está em `web/`. Há duas formas de
implantar:

### Opção A — CLI (mais simples)

A partir da pasta `web/`:

```bash
cd web
npx vercel        # primeira vez: faz login e cria o projeto
npx vercel --prod # publica em produção
```

Como você roda de dentro de `web/`, a Vercel já usa essa pasta como raiz — sem
configuração extra.

> Login interativo: se precisar autenticar, rode no chat com o prefixo `!`,
> por exemplo `! cd web && npx vercel login`, para a saída aparecer aqui.

### Opção B — Dashboard (conectando o GitHub)

1. Importe o repositório na Vercel.
2. Em **Settings → Build & Development**, defina **Root Directory = `web`**.
3. Framework: **Next.js** (detectado automaticamente). Build/Install padrão.
4. Deploy.

## Detalhes técnicos

- **Node:** `package.json` declara `engines.node >= 20`. A Vercel usa Node 20/22
  por padrão — compatível. (O `.nvmrc` da raiz do repo, com `24`, é só para o
  ambiente de desenvolvimento local.)
- **Build:** `next build` (Turbopack). Sem variáveis de ambiente necessárias.
- **Saída:** todas as rotas são pré-renderizadas; `/` redireciona para `/pt`.
- **i18n:** `/pt` e `/en` são geradas estaticamente.
