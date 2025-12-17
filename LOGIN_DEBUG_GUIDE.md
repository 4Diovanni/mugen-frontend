# 🔍 Debug Login Issue - Backend Response Mismatch

## 🚨 O Problema

```
✅ Backend retorna 200 para login
❌ Frontend gera erro: "Erro ao fazer login"
❌ Usuário fica na página /login
```

**Causa Provável:** Backend retorna formato diferente do esperado

---

## 🎯 Diagnóstico Rápido

### Passo 1: Verificar Resposta do Backend

**Abra DevTools (F12) → Network → Filtrar por login**

```
1. Ir para http://localhost:5173/login
2. Preencher credenciais
3. Clicar "Entrar"
4. Na aba Network, procurar por:
   POST /api/auth/login
```

**IMPORTANTE: Clica nesse request e olha a aba "Response"**

### O que você deve ver:

**❌ ERRADO (causa do erro):**
```json
{
  "data": {
    "user": {...},
    "token": "..."
  }
}
```
OU
```json
{
  "user": {...},
  "token": "..."
}
```

**✅ CORRETO (esperado pelo frontend):**
```json
{
  "user": {
    "id": "123",
    "email": "test@example.com",
    "name": "Test User",
    "role": "ROLE_PLAYER"
  },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "..." (opcional)
}
```

---

## 🔧 Como Verificar a Resposta Exata

### Método 1: Console do Browser

```javascript
// F12 → Console

// Cole isso:
await fetch('http://localhost:8080/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'seu@email.com',
    password: 'sua_senha'
  })
}).then(r => r.json()).then(data => {
  console.log('Response:', data)
  console.log('User:', data.user || data.data?.user || 'NÃO ENCONTRADO')
  console.log('Token:', data.token || data.data?.token || 'NÃO ENCONTRADO')
})

// Verá exatamente o que backend está retornando
```

### Método 2: cURL no Terminal

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"seu@email.com","password":"sua_senha"}' \
  | jq .

# Mostra a resposta formatada
```

### Método 3: Postman

```
1. Abrir Postman
2. New → POST
3. URL: http://localhost:8080/api/auth/login
4. Headers: Content-Type: application/json
5. Body (raw, JSON):
{
  "email": "seu@email.com",
  "password": "sua_senha"
}
6. Send
7. Olhar a "Response"
```

---

## 💪 Solução Conforme o Problema

### ✅ PRIMEIRO: Atualizar useAuth Hook

Já fiz isso! O novo `useAuth.ts` trata vários formatos de resposta:

```typescript
const parseLoginResponse = (response: any) => {
  // Format 1: { user: {...}, token: "..." }
  if (response?.user && response?.token) {
    userData = response.user
    newToken = response.token
  }
  // Format 2: { data: { user: {...}, token: "..." } }
  else if (response?.data?.user && response?.data?.token) {
    userData = response.data.user
    newToken = response.data.token
  }
  // ... outras opções
}
```

---

## 📋 Verificar Resposta Passo a Passo

### 1. Abra DevTools
```
F12 → Network
```

### 2. Limpe o Network
```
Clique no ícone de lixeira (Clear)
```

### 3. Faça Login
```
- Ir para http://localhost:5173/login
- Preencher:
  Email: seu@email.com
  Senha: sua_senha
- Clicar "Entrar"
```

### 4. Procure a Request
```
DevTools → Network
Procure por: POST /api/auth/login
Status: 200 OK
```

### 5. Clique na Request
```
- Clique no nome da request
- Abra aba "Response"
- Copie a resposta JSON
```

### 6. Compare com Esperado

**Esperado:**
```json
{
  "user": {
    "id": "...",
    "email": "...",
    "name": "...",
    "role": "ROLE_PLAYER" ou "ROLE_MASTER"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 7. Ver Logs no Console
```
F12 → Console

Deve aparecer:
🔐 Attempting login for: seu@email.com
✅ Login response received: {...}
🔍 Login Response: {...}
✅ Login successful: seu@email.com
```

---

## 🔧 Se ainda der erro

### 1. Copie o erro do console

```
F12 → Console → Procure por
"❌ Login error:"
```

### 2. Verifique o que vem na resposta

```
Console mostra🔍 Login Response:
Veja exatamente o JSON que está vindo
```

### 3. Compartilhe:

- O erro do console
- A resposta JSON da request
- A estrutura que backend está retornando

---

## ⚠️ Debug com Logs

O novo useAuth mostra muitos logs! Abra console e procure por:

```
🔐 Attempting login for:        ← Quando começa
✅ Login response received:     ← Response do backend
🔍 Login Response:              ← Resposta parseada
❌ Could not parse:              ← Se não conseguir fazer parse
❌ Login error:                  ← Se houver erro
✅ Login successful:             ← Se sucesso!
```

---

## 🚀 Próximos Passos

1. **Parar frontend**
   ```bash
   Ctrl+C
   ```

2. **Reiniciar**
   ```bash
   npm run dev
   ```

3. **Limpar cache**
   ```bash
   Ctrl+Shift+Delete
   ```

4. **Tentar login novamente**
   ```
   http://localhost:5173/login
   ```

5. **Abrir DevTools (F12)**
   - Console tab
   - Procure pelos logs
   - Veja a resposta exata

6. **Se ainda der erro**
   - Copie a resposta
   - Compartilhe comigo!

---

## 🌟 Se Funcionar!

```
✅ Login bem-sucedido
✅ Token salvo
✅ Redirecionado para /dashboard
✅ Pronto para usar! 🚀
```

---

**Status:** 🔐 Aguardando seu feedback  
**Próximo:** Compartilhe a resposta do backend e corrigiremos!
