# 🔧 Fix Environment Variables - TypeScript import.meta.env

## 🚨 O Problema

```
TS2339: Property 'env' does not exist on type 'ImportMeta'.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
```

### Por que aconteceu?

Você estava usando `import.meta.env` mas TypeScript não tinha:
1. ❌ Tipos definidos para `import.meta.env`
2. ❌ Arquivo `.env` com as variáveis
3. ❌ Configuração no `tsconfig.json`

---

## ✅ A Solução (Já Implementada)

### 1. Criar arquivo `src/vite-env.d.ts`
```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

**O que faz:** Define os tipos TypeScript para `import.meta.env`

### 2. Criar arquivo `.env`
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8080
VITE_API_TIMEOUT=10000

# App Configuration
VITE_APP_TITLE=Mugen RPG
VITE_APP_VERSION=1.0.0
```

**O que faz:** Define as variáveis de ambiente para desenvolvimento

### 3. Criar arquivo `.env.development`
```bash
# Development Environment
VITE_API_BASE_URL=http://localhost:8080
VITE_API_TIMEOUT=10000
VITE_APP_TITLE=Mugen RPG (Dev)
VITE_APP_VERSION=1.0.0-dev
```

**O que faz:** Configuração específica para desenvolvimento (pode sobrescrever `.env`)

### 4. Criar arquivo `.env.production`
```bash
# Production Environment
VITE_API_BASE_URL=https://api.seu-dominio.com
VITE_API_TIMEOUT=10000
VITE_APP_TITLE=Mugen RPG
VITE_APP_VERSION=1.0.0
```

**O que faz:** Configuração específica para produção

### 5. Atualizar `tsconfig.json`
```json
{
  "compilerOptions": {
    "types": ["vite/client"],  // ← Adicione isto
    // ... resto da config
  },
  "include": ["src", "src/vite-env.d.ts"],  // ← Adicione vite-env.d.ts
}
```

### 6. Melhorar `src/api/client.ts`
```typescript
const BASE_URL: string = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
const TIMEOUT: number = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10)

// Type-safe, com defaults, e logging em desenvolvimento
```

---

## 🚀 Próximos Passos

### 1. Reiniciar o TypeScript
```bash
# No VSCode, pressiona: Ctrl+Shift+P
# Digita: TypeScript: Restart TS Server
# Enter
```

### 2. Reiniciar o Dev Server
```bash
Ctrl+C no terminal do frontend
npm run dev
```

### 3. Verificar que funcionou
```bash
# Abre DevTools (F12)
# Console deve mostrar:
# 🔧 API Client Configuration:
#    Base URL: http://localhost:8080
#    Timeout: 10000ms
```

---

## 📚 Como Funciona Vite + Env Vars

### Prefixo VITE_
Todas as variáveis de ambiente DEVEM começar com `VITE_`

**Por quê?** Segurança - garante que só variáveis explícitas sejam expostas ao cliente

```bash
✅ VITE_API_BASE_URL=http://localhost:8080     Exposto ao frontend
✅ VITE_APP_TITLE=Mugen RPG                   Exposto ao frontend
❌ DATABASE_PASSWORD=secret123                 NÃO exposto
❌ SECRET_KEY=xyz                              NÃO exposto
```

### Usando Env Vars no Código

```typescript
// ✅ Correto
const apiUrl = import.meta.env.VITE_API_BASE_URL
const appTitle = import.meta.env.VITE_APP_TITLE

// ❌ Errado (não expõe variáveis sem VITE_)
const dbPassword = import.meta.env.DATABASE_PASSWORD // undefined!
```

### Substituição em Build Time

Vite substitui `import.meta.env.VITE_*` na fase de build:

```typescript
// Antes da build
const BASE_URL = import.meta.env.VITE_API_BASE_URL

// Depois da build (production)
const BASE_URL = 'https://api.seu-dominio.com'

// Depois da build (development)
const BASE_URL = 'http://localhost:8080'
```

---

## 🔐 Boas Práticas

### ✅ Fazer
```bash
# .env - Default (desenvolvimento)
VITE_API_BASE_URL=http://localhost:8080

# .env.production - Override para produção
VITE_API_BASE_URL=https://api.seu-dominio.com
```

```typescript
// Usar type-safe com defaults
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
```

### ❌ Evitar
```bash
# NUNCA commite credenciais reais
VITE_API_KEY=sk_live_51234567890  # ❌ Nunca!
```

```typescript
// Nunca assume que env var existe
const BASE_URL = import.meta.env.VITE_API_BASE_URL  // ❌ Pode ser undefined
```

---

## 📋 Arquivos Criados

```
mugen-frontend/
├── src/
│   └── vite-env.d.ts          ✅ NOVO - Tipos TypeScript
├── .env                        ✅ NOVO - Env padrão
├── .env.development            ✅ NOVO - Env desenvolvimento
├── .env.production             ✅ NOVO - Env produção
├── tsconfig.json               ✅ ATUALIZADO - Types adicionados
└── src/api/client.ts           ✅ ATUALIZADO - Melhor handling
```

---

## 🎯 A OPTIONS Request (Preflight)

Você viu no erro:
```
OPTIONS /auth/register HTTP/1.1
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type
```

### O que é?

Quando o browser faz uma requisição POST com headers customizados (`Authorization`, `Content-Type`), ele primeiro faz uma requisição **OPTIONS** (preflight) para verificar:

1. ✅ Origem permitida?
2. ✅ Método POST permitido?
3. ✅ Header `Content-Type` permitido?

**É normal e esperado!** O CORS já está configurado para permitir isso.

---

## 🔬 Teste Rápido

### 1. Verificar tipos
```bash
# Abra o arquivo src/api/client.ts
# Hovere sobre BASE_URL
# Deve mostrar: const BASE_URL: string
# Se mostrar: const BASE_URL: any → Problema ainda existe
```

### 2. Verificar variáveis
```bash
# Abra DevTools Console (F12)
# Digite: Object.keys(import.meta.env)
# Deve mostrar array com suas variáveis VITE_*
```

### 3. Testar login
```bash
# Tente fazer login em http://localhost:5173
# Deve fazer:
# 1. OPTIONS /auth/register (preflight) - 200 OK
# 2. POST /auth/register - sucesso
```

---

## ⚠️ Se Ainda Não Funcionar

### 1. Limpar node_modules
```bash
rm -rf node_modules package-lock.json
npm install
```

### 2. Reiniciar tudo
```bash
# Terminal 1
Ctrl+C
npm run dev

# Terminal 2 (backend)
Ctrl+C
./mvnw spring-boot:run
```

### 3. Verificar .env está no raiz
```bash
ls -la | grep .env
# Deve listar:
# .env
# .env.development
# .env.production
```

### 4. Verificar vite-env.d.ts existe
```bash
ls -la src/vite-env.d.ts
# Deve existir
```

---

## 📚 Referências

- [Vite Env Variables](https://vitejs.dev/guide/env-and-mode.html)
- [TypeScript Vite Types](https://vitejs.dev/guide/ssr.html#setting-up-the-dev-server)
- [CORS Preflight](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request)

---

## ✅ Checklist

- [ ] Criar src/vite-env.d.ts
- [ ] Criar .env com VITE_API_BASE_URL
- [ ] Criar .env.development
- [ ] Criar .env.production
- [ ] Atualizar tsconfig.json com "types": ["vite/client"]
- [ ] Atualizar tsconfig.json include com vite-env.d.ts
- [ ] Reiniciar TypeScript Server (Ctrl+Shift+P)
- [ ] Reiniciar dev server (npm run dev)
- [ ] Erro TS2339 desapareceu ✅
- [ ] Login funciona sem erros ✅

---

**Status:** 🚀 Pronto!  
**Data:** 16/12/2025  
**Próximo:** Testar login com sucesso 🎮
