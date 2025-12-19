# 🎯 **CRÔNICAS - Design System Guide**

## **Páleta Oficial**

### **Azuis - Bússola Mágica**
- `--cronica-blue-dark:    #003F5F`
- `--cronica-blue-medium:  #0077AA`
- `--cronica-blue-light:   #35C6FF` ✨

### **Vermelhos - Crônicas**
- `--cronica-red-dark:     #7B0015`
- `--cronica-red-vivid:    #C8001F` 🔒 (Primaria)

### **Laranjas/Amarelos - 2AAS**
- `--cronica-orange:       #FF7A1A`
- `--cronica-yellow:       #FFD63B`

### **Dark Mode - Fundos**
- `--dark-bg-primary:      #0A0E1A`
- `--dark-bg-secondary:    #141823`
- `--dark-bg-tertiary:     #1A1F2E`

---

## **Componentes CSS Prontos**

```html
<!-- Botões -->
<button class="btn btn-primary">Ação Principal</button>
<button class="btn btn-secondary">Secundaria</button>
<button class="btn btn-accent">Destaque Azul</button>

<!-- Cards -->
<div class="card card--accent">
  <div class="card-header">
    <h3 class="card-title">Título</h3>
  </div>
  <div class="card-body">Conteúdo</div>
</div>

<!-- Badges -->
<span class="badge badge-success">Ativo</span>
<span class="badge badge-error">Erro</span>
<span class="badge badge-info">Info</span>

<!-- Grid Responsivo -->
<div class="grid grid--cols-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

## **Variações de Botões**

```
.btn-primary    - Vermelho vivo (CTAs)
.btn-secondary  - Cinza transparente (Alternativas)
.btn-accent     - Azul claro com glow (Destaques)

.btn-sm         - Pequeno
.btn-lg         - Grande
.btn-full       - 100% width
```

---

## **Variações de Cards**

```
.card           - Normal
.card--accent   - Azul com toque mágico
.card--danger   - Vermelho para ações periénicas
```

---

## **Efeitos Mágicos**

```css
box-shadow: var(--glow-subtle);    /* Sutil */
box-shadow: var(--glow-medium);    /* Fortes */
box-shadow: var(--glow-intense);   /* Muito forte */
box-shadow: var(--glow-red);       /* Vermelha */

transition: all var(--transition-normal);  /* 250ms */
```

---

**Tudo pronto! Comece a usar!**
