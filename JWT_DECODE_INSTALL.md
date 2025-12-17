# 📦 Instalar jwt-decode

## 🚨 Problema

O `useAuth.ts` agora usa `jwt-decode` para extrair dados do token JWT.

**Você precisa instalar este pacote!**

---

## ✅ Solução

### Passo 1: Parar Frontend
```bash
Ctrl+C no terminal do frontend
```

### Passo 2: Instalar Pacote
```bash
npm install jwt-decode
```

Esperai terminar a instalação...

### Passo 3: Verificar Instalação
```bash
npm list jwt-decode

# Deve mostrar algo como:
# mugen-frontend@1.0.0 /path/to/mugen-frontend
# └─ jwt-decode@4.0.0 (ou similar)
```

### Passo 4: Reiniciar Frontend
```bash
npm run dev
```

### Passo 5: Limpar Cache
```bash
Ctrl+Shift+Delete no browser
```

### Passo 6: Testar
```
http://localhost:5173/login
→ Fazer login
→ Deve funcionar agora!
```

---

## 🔍 O que jwt-decode faz

```typescript
import { jwtDecode } from 'jwt-decode'

const token = "eyJhbGciOiJIUzUxMiJ9..."
const decoded = jwtDecode(token)

// Resultado:
// {
//   sub: "2dad1d1d-e3b8-44d5-a32a-fa959a69e74f",
//   email: "diovanni.2566@gmail.com",
//   roles: ["ROLE_PLAYER"],
//   iat: 1765946700,
//   exp: 1766033100
// }
```

---

## ✅ Se der erro "Cannot find module"

### Opção 1: Reinstalar
```bash
rm -rf node_modules package-lock.json
npm install
npm install jwt-decode
```

### Opção 2: Verificar package.json
```bash
# Abrir package.json
# Procurar por "jwt-decode"
# Se não estiver lá, adicionar:

"dependencies": {
  "jwt-decode": "^4.0.0",
  // ... outros
}
```

### Opção 3: Limpar cache npm
```bash
npm cache clean --force
npm install jwt-decode
```

---

## 🎯 Como Funciona Agora

### Backend retorna (OAuth2):
```json
{
  "access_token": "eyJhbGciOiJIUzUxMiJ9...",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

### Frontend faz:
```typescript
1. Recebe { access_token, expires_in, token_type }
2. Detecta: "É formato OAuth2!"
3. Extrai token: access_token → newToken
4. Decodifica JWT: jwtDecode(newToken)
5. Extrai dados:
   - id (sub)
   - email
   - name (se existir)
   - role (roles[0])
6. Salva token + dados
7. Redireciona para dashboard ✅
```

---

## 📋 Checklist

- [ ] Parei frontend (Ctrl+C)
- [ ] Rodei: npm install jwt-decode
- [ ] Verifiquei: npm list jwt-decode
- [ ] Reiniciei: npm run dev
- [ ] Limpei cache (Ctrl+Shift+Delete)
- [ ] Tentei fazer login
- [ ] ✅ Funcionou!

---

## 🚀 Pronto!

Agora o frontend consegue:

```
✅ Receber resposta OAuth2/JWT
✅ Extrair token
✅ Decodificar JWT
✅ Extrair dados do usuário
✅ Fazer login com sucesso!
✅ Redirecionar para dashboard!
```

---

**Status:** 📦 Instale jwt-decode e teste!  
**Próximo:** Login deve funcionar perfeitamente!
