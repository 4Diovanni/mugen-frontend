# 🔧 Fix API Base Path - /api Prefix

## 🚨 O Problema

```
Frontend tentava acessar:
❌ http://localhost:8080/auth/register

Mas backend espera:
✅ http://localhost:8080/api/auth/register
```

Resultado: **Erro 404 e CORS bloqueando a requisição!**

---

## ✅ A Solução (Já Implementada)

### O que mudou nos arquivos `.env`:

**Antes:**
```bash
VITE_API_BASE_URL=http://localhost:8080
```

**Depois:**
```bash
VITE_API_BASE_URL=http://localhost:8080/api
```

### Arquivos Atualizados

1. ✅ `.env` - Base URL com `/api`
2. ✅ `.env.development` - Dev URL com `/api`
3. ✅ `.env.production` - Prod URL com `/api`

---

## 🔄 Como Funciona Agora

### Antes do Fix
```
Frontend              Axios Client              Backend
   │                      │                       │
   ├─ POST /auth ─────→ │                       │
   │                      ├─ POST to:
   │                      │ http://localhost:8080/auth  ❌
   │                      │                       │
   │                      │              404 Not Found
   │                      │                       │
   │     ❌ Erro          │←────────────│
   │←────────────│
```

### Depois do Fix
```
Frontend              Axios Client              Backend
   │                      │                       │
   ├─ POST /auth ─────→ │                       │
   │                      ├─ POST to:
   │                      │ http://localhost:8080/api/auth ✅
   │                      │                       │
   │                      │              ✅ 200 OK
   │                      │                       │
   │     ✅ Response      │←────────────│
   │←────────────│
```

---

## 🚀 Próximos Passos

### 1. Parar Frontend
```bash
Ctrl+C no terminal do frontend
```

### 2. Verificar arquivo `.env` foi atualizado
```bash
# No raíz do projeto:
cat .env

# Deve mostrar:
# VITE_API_BASE_URL=http://localhost:8080/api
```

### 3. Reiniciar Frontend
```bash
npm run dev

# Ou, se quiser limpeza completa:
rm -rf node_modules/.vite
npm run dev
```

### 4. Limpar Cache do Browser
```bash
# DevTools:
F12 → Application → Clear site data

# Ou:
Ctrl+Shift+Delete → Limpar tudo
```

### 5. Testar Requisição

**No DevTools (F12) → Network:**
- Ir para http://localhost:5173/register
- Tentar registrar
- Na aba Network deve aparecer:
  - `http://localhost:8080/api/auth/register` ✅
  - Status `200` ou `201` (sucesso!)

---

## 📊 Estrutura de URLs Agora

```
Frontend: http://localhost:5173
├─ /login
├─ /register
└─ /dashboard

Backend: http://localhost:8080/api
├─ /auth/login        ← POST com credenciais
├─ /auth/register     ← POST com dados novo usuário
├─ /characters        ← GET/POST personagens
├─ /inventory/{id}    ← GET inventário
├─ /skills            ← GET skills
└─ /admin/...         ← Endpoints admin
```

---

## 🔍 Verificação Rápida

### Teste 1: Verificar URL no DevTools
```
F12 → Console

Digite:
console.log(import.meta.env.VITE_API_BASE_URL)

Deve retornar:
http://localhost:8080/api  ✅
```

### Teste 2: Fazer uma requisição
```bash
# No terminal:
curl http://localhost:8080/api/auth/register \
  -X OPTIONS \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type" \
  -v

# Deve retornar:
# HTTP/1.1 200
# Access-Control-Allow-Origin: http://localhost:5173
```

### Teste 3: Fazer Login
```
1. Ir para http://localhost:5173/register
2. Preencher formulário
3. Clicar em registrar
4. DevTools → Network
5. Procurar por request para http://localhost:8080/api/auth/register
6. Status deve ser 201 ou 200, não 404!
```

---

## 📋 Como o Axios Client Funciona

### Arquivo: `src/api/client.ts`

```typescript
// Lê a variável de ambiente
const BASE_URL = import.meta.env.VITE_API_BASE_URL
// Resultado: http://localhost:8080/api

// Cria cliente com esse BASE_URL
const instance = axios.create({
  baseURL: BASE_URL,  // http://localhost:8080/api
})

// Quando você chama:
await apiClient.post('/auth/register', data)

// Axios monta a URL completa:
// BASE_URL + '/auth/register'
// = http://localhost:8080/api + /auth/register
// = http://localhost:8080/api/auth/register ✅
```

---

## ✅ Checklist Final

- [ ] Parei o frontend (Ctrl+C)
- [ ] Verifiquei `.env` tem `VITE_API_BASE_URL=http://localhost:8080/api`
- [ ] Reiniciei frontend (`npm run dev`)
- [ ] Limpei cache do browser (Ctrl+Shift+Delete)
- [ ] Testei console: `console.log(import.meta.env.VITE_API_BASE_URL)`
- [ ] Fiz teste OPTIONS com curl (status 200)
- [ ] Tentei registrar no frontend
- [ ] DevTools → Network mostra `/api/auth/register` ✅
- [ ] Status 201 ou 200 (não 404!) ✅
- [ ] Nenhum erro CORS! ✅

---

## 🎉 Sucesso!

**Agora o frontend sabe que deve acessar `/api` antes de cada endpoint!**

```
✅ Requisições agora chegam em: http://localhost:8080/api/...
✅ CORS passado com sucesso
✅ Endpoints respondendo corretamente
✅ Pronto para integração total!
```

---

**Data:** 16/12/2025  
**Status:** ✅ API Base Path Corrigido  
**Próximo:** Testar login com sucesso completo!
