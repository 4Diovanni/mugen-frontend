# 🚀 Instruções de Setup - Mugen Frontend

## 📋 Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn
- Git configurado

## 🎯 Passo a Passo de Configuração

### 1️⃣ Instalar Dependências

```bash
cd mugen-frontend
npm install
```

### 2️⃣ Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env com suas credenciais
# VITE_SUPABASE_URL=sua-url-aqui
# VITE_SUPABASE_ANON_KEY=sua-chave-aqui
# VITE_API_BASE_URL=http://localhost:8080
```

### 3️⃣ Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

Aplicação vai abrir em: `http://localhost:5173`

### 4️⃣ Verificar Estrutura

```bash
# Type checking
npm run type-check

# Build para produção
npm run build
```

---

## 🏗️ Estrutura de Projeto

```
src/
├── @types/              # Tipos TypeScript
├── api/                 # API clients (Axios, Supabase)
├── components/          # Componentes React
│   ├── common/         # Componentes genéricos
│   ├── layout/         # Layout components
│   └── features/       # Game feature components
├── pages/              # Páginas da aplicação
├── services/           # Lógica de negócio
├── stores/             # Estado global (Zustand)
├── hooks/              # Custom React hooks
├── utils/              # Funções utilitárias
├── styles/             # Estilos globais
└── middleware/         # Middlewares (ProtectedRoute)
```

---

## ✅ Próximos Passos

- [ ] Confirmar que `npm install` rodou sem erros
- [ ] Confirmar que `npm run dev` subiu na porta 5173
- [ ] Configurar `.env` com credenciais Supabase
- [ ] Configurar VITE_API_BASE_URL com URL do backend (http://localhost:8080)
- [ ] Testar página de Login
- [ ] Integrar com endpoints do backend
- [ ] Adicionar tema Dark Mode
- [ ] Implementar páginas faltantes (admin, achievements, minigames)

---

## 🔗 Conexão com Backend

Antes de testar, certifique-se de que:

1. **Backend está rodando** em `http://localhost:8080`
2. **Endpoints disponíveis:**
   - `POST /auth/login`
   - `POST /auth/register`
   - `GET /characters`
   - `POST /characters`
   - etc.

3. **CORS configurado** no backend para aceitar `http://localhost:5173`

---

## 🐛 Troubleshooting

### Erro: Cannot find module
```bash
# Limpar node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro: Port 5173 já em uso
```bash
# Usar porta diferente
npm run dev -- --port 5174
```

### Erro de CORS
- Verificar se backend tem CORS habilitado
- Verificar se `VITE_API_BASE_URL` está correto

---

## 📚 Referências

- [React 18 Docs](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [Supabase](https://supabase.com)
- [Axios](https://axios-http.com)
- [React Router](https://reactrouter.com)

---

**Desenvolvido com ❤️ por Diovanni**
