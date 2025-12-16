# 🎮 Mugen Frontend

Frontend moderno em **React 18 + TypeScript + Tailwind CSS** para o RPG Game Mugen.

## 🚀 Stack Tecnológico

- **Framework**: React 18 com TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Authentication**: Supabase Auth + JWT
- **HTTP Client**: Axios
- **Database**: Supabase (PostgreSQL)
- **Deploy**: Vercel

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Criar arquivo .env local
cp .env.example .env

# Preencher variáveis de ambiente
# VITE_SUPABASE_URL
# VITE_SUPABASE_ANON_KEY
# VITE_API_BASE_URL
```

## 🏃 Desenvolvimento

```bash
# Rodar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Type checking
npm run type-check
```

## 📁 Estrutura de Pastas

```
src/
├── @types/          # Tipos TypeScript globais
├── api/             # Chamadas HTTP & Supabase
├── components/      # Componentes React reutilizáveis
├── pages/           # Páginas da aplicação
├── services/        # Lógica de negócio
├── stores/          # Estado global (Zustand)
├── hooks/           # Custom React hooks
├── utils/           # Funções utilitárias
├── styles/          # Estilos globais
├── middleware/      # Middlewares (ProtectedRoute, etc)
├── App.tsx          # Router e setup principal
└── main.tsx         # Entry point
```

## 🔐 Autenticação

- **Login/Register**: Via Supabase Auth
- **Tokens**: JWT armazenados no localStorage
- **Protected Routes**: Guarded via ProtectedRoute middleware
- **Roles**: ROLE_PLAYER e ROLE_MASTER

## 🎯 Features Principais

- ✅ Autenticação com Supabase
- ✅ Gerenciamento de Personagens
- ✅ Sistema de Inventário
- ✅ Achievements & Badges
- ✅ Minigames
- ✅ Admin Panel (Master only)
- ✅ Tema Dark Mode
- ✅ Responsivo (Mobile-first)

## 📝 Variáveis de Ambiente

```env
# Supabase
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima

# API
VITE_API_BASE_URL=http://localhost:8080
VITE_API_TIMEOUT=10000

# App
VITE_APP_NAME=Mugen
VITE_ENVIRONMENT=development
```

## 🤝 Contribuindo

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.

---

**Desenvolvido com ❤️ por Diovanni**
