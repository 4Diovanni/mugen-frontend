# 🔗 Mugen Frontend - Backend Integration Guide

## ✅ O que foi feito

### 1. **Types TypeScript** (`src/@types/character.ts`)
✅ Interfaces para Character, Stats, Skills, TP, etc
✅ Type-safe integration com backend
✅ DTOs para requests/responses

### 2. **API Endpoints** (`src/api/endpoints/characters.ts`)
✅ Configuração de todas as rotas do backend
✅ Suporte a CRUD completo
✅ Endpoints para Stats, Skills, TP, Experience, Transformations

### 3. **Services** (`src/services/characterService.ts`)
✅ CharacterService - CRUD de personagens
✅ CharacterStatsService - Estatísticas calculadas
✅ CharacterSkillsService - Gerenciar habilidades
✅ CharacterTPService - Sistema TP
✅ CharacterExpService - Experiência e leveling
✅ CharacterTransformationService - Transformações

## 🔧 Configuração Necessária

### 1. Variáveis de Ambiente (`.env`)

Atualize seu `.env` com:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_TIMEOUT=10000

# App Name
VITE_APP_NAME=Mugen
VITE_ENVIRONMENT=development
```

### 2. Backend Rodando

Certifique-se de que o backend está rodando:

```bash
# No backend (mugen-backend)
cd mugen-backend
springboot run  # ou mvn spring-boot:run
```

Backend deve estar em `http://localhost:8080`

### 3. CORS Configuration no Backend

Verifique se CORS está configurado em `application.yml`:

```yaml
spring:
  web:
    cors:
      allowed-origins: http://localhost:5173
      allowed-methods: GET,POST,PUT,DELETE,PATCH
      allowed-headers: "*"
      allow-credentials: true
      max-age: 3600
```

## 📚 Como Usar os Services

### Exemplo 1: Carregar Personagens do Usuário

```typescript
import { characterService } from '@/services/characterService';

// Em um componente ou hook
const userId = localStorage.getItem('userId'); // ou do contexto de auth
const characters = await characterService.getCharactersByOwner(userId);
console.log('Personagens:', characters);
```

### Exemplo 2: Criar Novo Personagem

```typescript
import { characterService } from '@/services/characterService';
import { CreateCharacterRequest } from '@/@types/character';

const newCharacter: CreateCharacterRequest = {
  name: 'Goku',
  race: 'Saiyan',
  attributes: {
    str: 15,
    dex: 12,
    con: 14,
    wil: 10,
    mnd: 11,
    spi: 13
  }
};

const created = await characterService.createCharacter(newCharacter);
console.log('Personagem criado:', created);
```

### Exemplo 3: Obter Stats do Personagem

```typescript
import { characterStatsService } from '@/services/characterService';

const stats = await characterStatsService.getStats(characterId);
console.log('Attack:', stats.attack);
console.log('Defense:', stats.defense);
console.log('Speed:', stats.speed);
```

### Exemplo 4: Gerenciar TP

```typescript
import { characterTPService } from '@/services/characterService';

// Calcular custo para aumentar atributo
const cost = await characterTPService.calculateTPCost(
  characterId,
  'STR',  // Aumentar Strength
  5       // 5 pontos
);

console.log('Custo em TP:', cost);

// Alocar TP
const updated = await characterTPService.allocateAttribute(
  characterId,
  {
    characterId: characterId,
    attributeName: 'STR',
    points: 5
  }
);
```

### Exemplo 5: Ganhar Experiência

```typescript
import { characterExpService } from '@/services/characterService';

const updated = await characterExpService.gainExp(
  characterId,
  {
    amount: 1000,
    reason: 'Boss defeated'
  }
);

console.log('Novo nível:', updated.level);
console.log('Nova experiência:', updated.exp);
```

## 🎯 Próximos Passos

### 1. Criar Custom Hooks (em `src/hooks/`)

```typescript
// useCharacters.ts
import { useState, useEffect } from 'react';
import { characterService } from '@/services/characterService';
import { Character } from '@/@types/character';

export function useCharacters(userId: string) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const data = await characterService.getCharactersByOwner(userId);
        setCharacters(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [userId]);

  return { characters, loading, error };
}
```

### 2. Atualizar Componentes de Characters

Os componentes em `src/pages/characters/` devem usar os novos services:

- `CharacterList.tsx` - Listar personagens com loading state
- `CharacterDetail.tsx` - Mostrar detalhes + stats
- `CreateCharacter.tsx` - Formulário integrado com backend

### 3. Implementar Endpoints Adicionais (conforme necessário)

Criar arquivos similares em `src/api/endpoints/` para:

- `skills.ts` - Endpoints de Skills
- `equipment.ts` - Endpoints de Equipment
- `inventory.ts` - Endpoints de Inventory
- `weapons.ts` - Endpoints de Weapons
- `armor.ts` - Endpoints de Armor

### 4. Criar Services Adicionais (conforme necessário)

Em `src/services/` para:

- `skillService.ts`
- `equipmentService.ts`
- `inventoryService.ts`
- `weaponService.ts`
- `armorService.ts`

## 🧪 Teste de Integração

### Para testar se tudo está funcionando:

1. **Abra o DevTools** (F12) → Console
2. **No Console, teste:**

```javascript
// Test 1: Import e testar service
import { characterService } from './src/services/characterService.ts';
const userId = 'seu-user-id-aqui';
const characters = await characterService.getCharactersByOwner(userId);
console.log('✅ Characters:', characters);

// Test 2: Verificar se token está sendo enviado
// Abra Network tab (F12) e veja os headers Authorization
// Deve conter: Authorization: Bearer seu-token-jwt
```

## 🐛 Troubleshooting

### Problema: 401 Unauthorized
**Solução:** Verificar se JWT token está em `localStorage.getItem('token')`

### Problema: 403 Forbidden
**Solução:** Verificar se usuário tem permissão para acessar esse recurso

### Problema: CORS Error
**Solução:** Verificar CORS configuration no backend application.yml

### Problema: API Endpoint not found (404)
**Solução:** Verificar se backend está rodando e URL está correta em `.env`

## 📝 Endpoints do Backend Disponíveis

```
✅ Characters:
  GET    /characters
  GET    /characters/:id
  GET    /characters/owner/{userId}
  POST   /characters
  PUT    /characters/:id
  DELETE /characters/:id
  PATCH  /characters/{id}/name
  PATCH  /characters/{id}/deactivate

✅ Stats & TP:
  GET    /characters/{id}/stats
  GET    /characters/{id}/tp-summary
  POST   /characters/{id}/allocate-attribute
  GET    /characters/{id}/tp-cost/{attribute}/{points}
  GET    /characters/{id}/tp-history

✅ Skills:
  GET    /characters/{characterId}/skills
  POST   /characters/{characterId}/skills/{skillId}
  DELETE /characters/{characterId}/skills/{skillId}

✅ Experience:
  POST   /characters/{characterId}/gain-exp
  GET    /characters/{characterId}/level-progress
  GET    /characters/{characterId}/exp-info

✅ Transformations:
  GET    /characters/{characterId}/transformations
  GET    /characters/{characterId}/transformations/available
  GET    /characters/{characterId}/transformations/unlocked
  POST   /characters/{characterId}/transformations/{transformationId}
```

## 🚀 Deploy

Ao fazer deploy:

1. Atualize `VITE_API_BASE_URL` para URL do backend em produção
2. Certifique-se CORS está configurado para domínio da aplicação
3. Use HTTPS em produção

---

**Desenvolvido com ❤️ para Mugen RPG** 🎮
