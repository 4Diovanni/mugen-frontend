# 🚀 Guia de Deploy - Mugen Frontend

## Deploy em Vercel (Recomendado)

### 1. Preparar Aplicação

```bash
# Build local
npm run build

# Verificar se build está OK
ls -la dist/
```

### 2. Conectar ao Vercel

```bash
# Instalar CLI do Vercel
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel
```

### 3. Configurar Variáveis de Ambiente

No dashboard do Vercel:

```
Settings > Environment Variables

VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
VITE_API_BASE_URL=https://seu-backend.com
VITE_API_TIMEOUT=10000
VITE_APP_NAME=Mugen
VITE_ENVIRONMENT=production
```

### 4. Configurar Domínio Customizado

No Vercel:
- `Settings > Domains`
- Adicionar seu domínio
- Adicionar DNS records conforme instruído

### 5. Testar Deploy

```bash
# Acessar https://seu-projeto.vercel.app
# Testar todos os fluxos:
# - Login
# - Criação de personagem
# - Navegação
```

---

## Deploy em Render

### 1. Criar Arquivo `render.yaml`

```yaml
services:
  - type: web
    name: mugen-frontend
    env: static
    buildCommand: npm run build
    staticPublishPath: dist
    routes:
      - path: '/*'
        destination: /index.html
        match: ignore
    envVars:
      - key: VITE_SUPABASE_URL
        value: https://seu-projeto.supabase.co
      - key: VITE_SUPABASE_ANON_KEY
        value: ${SUPABASE_KEY}
      - key: VITE_API_BASE_URL
        value: https://seu-backend.com
```

### 2. Fazer Push para GitHub

```bash
git add .
git commit -m "Deploy configuration"
git push origin main
```

### 3. Conectar ao Render

- Acessar [render.com](https://render.com)
- Conectar GitHub
- Selecionar repositório
- Deploy automático

---

## Deploy em AWS (S3 + CloudFront)

### 1. Criar bucket S3

```bash
aws s3 mb s3://mugen-frontend
```

### 2. Configurar bucket para hosting

```bash
# Copiar arquivos de build
aws s3 sync dist/ s3://mugen-frontend/

# Configurar permissões públicas
aws s3 cp s3://mugen-frontend/ s3://mugen-frontend/ --recursive --acl public-read
```

### 3. Configurar CloudFront

- Criar distribuição
- Apontar para bucket S3
- Adicionar SSL certificate
- Adicionar domínio customizado

---

## Checklist pré-Deploy

- [ ] Build roda sem erros: `npm run build`
- [ ] Sem warnings de TypeScript: `npm run type-check`
- [ ] Variáveis de ambiente configuradas
- [ ] Backend endpoints testados
- [ ] CORS configurado no backend
- [ ] Supabase credentials corretos
- [ ] Testes de funcionalidade completos
- [ ] Performance otimizada
- [ ] SEO tags configuradas

---

## Monitoramento pós-Deploy

### Ferramentas Recomendadas

1. **Sentry** - Error tracking
   ```bash
   npm install @sentry/react
   ```

2. **Google Analytics**
   ```bash
   npm install react-ga4
   ```

3. **Vercel Analytics** - Dashboard automático

---

## Troubleshooting

### Build falha em produção

```bash
# Limpar cache
rm -rf dist node_modules
npm install
npm run build
```

### Variáveis de ambiente não funcionam

- Verificar nome: `VITE_` prefix obrigatório
- Verificar se foram definidas no platform
- Rebuildar após mudança

### Site lento

- Verificar bundle size: `npm run build` deve ser < 500KB
- Usar Lighthouse para análise
- Otimizar imagens
- Implementar lazy loading

---

**Desenvolvido com ❤️ por Diovanni**
