# Farcaster Mini App — Embed Valid ✓ та зображення

Короткий чеклист, щоб **Embed Valid** був зелений і **зображення** коректно відображалось у прев’ю та в cast.

---

## 1. URL у metadata (критично)

**Проблема:** На Vercel у meta потрапляв `localhost` → Farcaster не міг завантажити зображення.

**Рішення:** Жорстко заданий production URL у fallback (як у [nibbles](https://github.com/larkakio/nibbles)):

```ts
// app/layout.tsx
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://ВАШ-ДОМЕН.vercel.app'
```

- Не використовувати тільки `VERCEL_URL` або `localhost` як fallback.
- У Vercel задати `NEXT_PUBLIC_APP_URL` = повний URL (наприклад `https://app.vercel.app`).

---

## 2. Hero image для embed

**Що потрібно:**

- **Формат:** справжній **PNG** (не JPEG з розширенням `.png`).
- **Розміри:** **1200×630** (перевірено, працює в Embed Tool і в cast).
- **Файл:** `public/hero-image.png`.
- **URL у meta:** `${APP_URL}/hero-image.png` (абсолютний HTTPS).

Перевірка типу файлу:
```bash
file public/hero-image.png   # має бути: PNG image data
```

У `openGraph.images` вказати ті самі розміри:
```ts
images: [{ url: `${APP_URL}/hero-image.png`, width: 1200, height: 630 }]
```

---

## 3. sdk.actions.ready() — "Ready not called"

**Проблема:** Сплеш не зникає, Mini App "не відкривається" — Farcaster чекає виклику `ready()`.

**Рішення:**

- Використовувати **@farcaster/miniapp-sdk** (не лише frame-sdk).
- Компонент `FarcasterReady` викликає `sdk.actions.ready()` у `useEffect`.
- Рендерити **FarcasterReady у page**, першим у контенті (наприклад перший дочірній елемент у провайдері):

```tsx
// app/page.tsx
export default function Home() {
  return (
    <GameProvider>
      <FarcasterReady />
      <GameScreen />
    </GameProvider>
  )
}
```

```tsx
// components/FarcasterReady.tsx
'use client'
import { useEffect } from 'react'

export function FarcasterReady() {
  useEffect(() => {
    import('@farcaster/miniapp-sdk')
      .then(({ sdk }) => sdk.actions.ready().catch(() => {}))
      .catch(() => {})
  }, [])
  return null
}
```

- Не покладатися лише на виклик з layout — у робочому варіанті (nibbles) ready викликається зі сторінки.

---

## 4. fc:miniapp і fc:frame (Embed Valid)

У `metadata.other` обидва meta мають містити **однаковий** JSON:

- `version`: `"1"` (рядок, не `"vNext"`).
- `imageUrl`: абсолютний HTTPS URL до hero-image.
- `button.action.type`: `"launch_frame"` (не `"link"`, не `"launch_miniapp"`).
- `button.action`: містить `name`, `url`, `splashImageUrl`, `splashBackgroundColor`.

Приклад:
```ts
const FC_EMBED = {
  version: '1',
  imageUrl: `${APP_URL}/hero-image.png`,
  button: {
    title: 'Play Othello',
    action: {
      type: 'launch_frame',
      name: 'Назва гри',
      url: APP_URL,
      splashImageUrl: `${APP_URL}/hero-image.png`,
      splashBackgroundColor: '#0a0e1a',
    },
  },
}
// other: { 'fc:miniapp': JSON.stringify(FC_EMBED), 'fc:frame': JSON.stringify(FC_EMBED) }
```

---

## 5. Швидка перевірка

Після деплою:

1. **Embed Tool:**  
   `https://farcaster.xyz/~/developers/mini-apps/embed?url=https://ВАШ-ДОМЕН/`  
   Очікується: HTTP 200, Embed Present ✓, **Embed Valid ✓**, у Preview — зображення, у Image Details — HTTP 200, Load time.

2. **Preview Tool:**  
   `https://farcaster.xyz/~/developers/mini-apps/preview?url=...`  
   Не має бути повідомлення "Ready not called".

3. **Cast:** вставити URL у compose — має з’явитись прев’ю з картинкою та кнопкою.

---

## Референс

Робочий приклад з такою ж конфігурацією: [larkakio/nibbles](https://github.com/larkakio/nibbles) (layout, page, FarcasterReady, hero-image.png 1200×630).
