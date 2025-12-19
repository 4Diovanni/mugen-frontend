# 💫 Mugen RPG - Integration Checklist

## 🏗️ Arquivos Criados

### Type Safety
- ✅ `src/@types/character.ts` - Interfaces TypeScript

### API Layer
- ✅ `src/api/endpoints/characters.ts` - Character endpoints

### Services (Business Logic)
- ✅ `src/services/characterService.ts` - Character operations
  - CharacterService
  - CharacterStatsService
  - CharacterSkillsService
  - CharacterTPService
  - CharacterExpService
  - CharacterTransformationService

### Documentation
- ✅ `BACKEND_INTEGRATION_GUIDE.md` - Guia completo
- ✅ `MUGEN_API_INTEGRATION.md` - Overview rápido
- ✅ `INTEGRATION_CHECKLIST.md` - Este arquivo

---

## 🕒 TODO - Próximos Passos

### 1. Custom Hooks (🃣 PRIORITY: HIGH)
- [ ] `src/hooks/useCharacters.ts` - Carregar lista de personagens
- [ ] `src/hooks/useCharacter.ts` - Carregar um personagem
- [ ] `src/hooks/useCharacterStats.ts` - Carregar stats
- [ ] `src/hooks/useCharacterSkills.ts` - Gerenciar skills
- [ ] `src/hooks/useTP.ts` - Sistema TP

### 2. Adicionar Endpoints (TODO)
- [ ] `src/api/endpoints/skills.ts` - Skills API
- [ ] `src/api/endpoints/equipment.ts` - Equipment API
- [ ] `src/api/endpoints/weapons.ts` - Weapons API
- [ ] `src/api/endpoints/armor.ts` - Armor API
- [ ] `src/api/endpoints/inventory.ts` - Inventory API

### 3. Adicionar Services (TODO)
- [ ] `src/services/skillService.ts`
- [ ] `src/services/equipmentService.ts`
- [ ] `src/services/weaponService.ts`
- [ ] `src/services/armorService.ts`
- [ ] `src/services/inventoryService.ts`

### 4. Adicionar Types (TODO)
- [ ] `src/@types/skill.ts`
- [ ] `src/@types/equipment.ts`
- [ ] `src/@types/weapon.ts`
- [ ] `src/@types/armor.ts`
- [ ] `src/@types/inventory.ts`

### 5. Atualizar Pages/Components (🃣 PRIORITY: HIGH)
- [ ] `src/pages/characters/CharacterList.tsx` - Usar characterService
- [ ] `src/pages/characters/CharacterDetail.tsx` - Usar characterService + hooks
- [ ] `src/pages/characters/CreateCharacter.tsx` - Usar characterService
- [ ] Atualizar componentes de inventory
- [ ] Atualizar componentes de skills
- [ ] Atualizar componentes de equipment

### 6. Configuração (🃣 PRIORITY: CRITICAL)
- [ ] Atualizar `.env` com `VITE_API_BASE_URL`
- [ ] Verificar CORS no backend
- [ ] Testar API client com DevTools
- [ ] Certificar JWT token está sendo enviado

### 7. Testes (TODO)
- [ ] Teste de criação de personagem
- [ ] Teste de carregamento de personagens
- [ ] Teste de atualização de stats
- [ ] Teste de TP allocation
- [ ] Teste de ganho de experiência
- [ ] Teste de error handling (401, 403, 404)

---

## 🚀 Getting Started

### 1. Instalar/Atualizar .env

```bash
cp .env.example .env
```

Editar `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_TIMEOUT=10000
VITE_APP_NAME=Mugen
VITE_ENVIRONMENT=development
```

### 2. Iniciar Backend

```bash
cd mugen-backend
mvn spring-boot:run
# ou ./mvnw spring-boot:run
```

### 3. Iniciar Frontend

```bash
cd mugen-frontend
npm install
npm run dev
```

### 4. Testar no Browser

1. Abrir `http://localhost:5173`
2. Fazer login (autenticao existente)
3. Abrir DevTools (F12) → Console
4. Testar:

```javascript
import { characterService } from './src/services/characterService';
const user = localStorage.getItem('userId');
const chars = await characterService.getCharactersByOwner(user);
console.log('Characters:', chars);
```

---

## 📚 Estrutura Final Esperada

```
src/
├─ @types/
│  ├─ character.ts ✅ DONE
│  ├─ skill.ts
│  ├─ equipment.ts
│  ├─ inventory.ts
│  ├─ weapon.ts
│  └─ armor.ts
├─ api/
│  ├─ client.ts ✅ EXISTING
│  ├─ supabase.ts ✅ EXISTING
│  └─ endpoints/
│     ├─ characters.ts ✅ DONE
│     ├─ skills.ts
│     ├─ equipment.ts
│     ├─ weapons.ts
│     ├─ armor.ts
│     └─ inventory.ts
├─ services/
│  ├─ characterService.ts ✅ DONE
│  ├─ skillService.ts
│  ├─ equipmentService.ts
│  ├─ weaponService.ts
│  ├─ armorService.ts
│  └─ inventoryService.ts
├─ hooks/
│  ├─ useCharacters.ts
│  ├─ useCharacter.ts
│  ├─ useCharacterStats.ts
│  ├─ useCharacterSkills.ts
│  └─ useTP.ts
└─ pages/
   └─ characters/
      ├─ CharacterList.tsx (😘 NEEDS UPDATE)
      ├─ CharacterDetail.tsx (😘 NEEDS UPDATE)
      └─ CreateCharacter.tsx (😘 NEEDS UPDATE)
```

---

## 🌟 Important Notes

1. **JWT Token**: Certificar que está em `localStorage['token']`
2. **User ID**: Certificar que está em `localStorage['userId']`
3. **Backend URL**: Verificar em `.env` > `VITE_API_BASE_URL`
4. **CORS**: Verificar configuração no backend
5. **Error Handling**: Todos os endpoints já tém try-catch

---

## 🐋 Suporte

Para dúvidas:

1. Consulte `BACKEND_INTEGRATION_GUIDE.md`
2. Verifique os exemplos em `src/services/characterService.ts`
3. Veja console do browser (F12) para erros
4. Verifique Network tab para ver requests/responses

---

**Mugen RPG - Backend Integration Ready! 🎮**
