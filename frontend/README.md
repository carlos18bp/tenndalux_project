# TenndaluX Frontend

**Next.js 14+ with TypeScript, Tailwind CSS, and Zustand**

This is the frontend application for the TenndaluX project, built with modern React patterns and Next.js App Router.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 📁 Project Structure

```
frontend/
├── app/                        # Next.js App Router
│   ├── page.tsx               # Coming Soon page (/)
│   ├── layout.tsx             # Root layout
│   ├── globals.css            # Global styles + Tailwind
│   │
│   ├── auth/                  # Authentication routes
│   │   ├── login/page.tsx    # Login page
│   │   └── register/page.tsx # Registration page
│   │
│   └── dashboard/             # Protected routes
│       └── page.tsx           # User dashboard
│
├── lib/                       # Shared utilities
│   ├── services/
│   │   └── http.ts           # Axios HTTP client with JWT
│   └── stores/
│       └── authStore.ts      # Zustand authentication store
│
├── types/                     # TypeScript type definitions
│   └── user.ts               # User and Auth types
│
├── components/                # Reusable React components
│   ├── common/               # Common components
│   └── forms/                # Form components
│
├── public/                    # Static assets
├── .env.local                 # Environment variables
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

---

## 🎯 Features

- ✅ **Next.js 14+** with App Router and Turbopack
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for styling
- ✅ **Zustand** for state management
- ✅ **Axios** for HTTP requests with JWT auto-refresh
- ✅ **Coming Soon page** with beautiful animations
- ✅ **Authentication flow** (register, login, dashboard)
- ✅ **Protected routes** with auth guards
- ✅ **Cookie-based JWT** storage (SSR-friendly)

---

## 🔧 Available Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Production
npm run build            # Build for production
npm start                # Run production build

# Code Quality
npm run lint             # Run ESLint
npx tsc --noEmit        # Type check without building

# Dependencies
npm install              # Install dependencies
npm update               # Update dependencies
```

---

## 🌐 Routes

| Route | Component | Description | Protected |
|-------|-----------|-------------|-----------|
| `/` | `app/page.tsx` | Coming Soon page | No |
| `/auth/login` | `app/auth/login/page.tsx` | Login page | Guest only |
| `/auth/register` | `app/auth/register/page.tsx` | Registration | Guest only |
| `/dashboard` | `app/dashboard/page.tsx` | User dashboard | Yes |

---

## 🔐 Authentication

### How It Works

1. **User registers/logs in** → Backend returns JWT tokens
2. **Tokens stored in cookies** → Using `js-cookie` library
3. **Axios interceptor adds token** → To all API requests
4. **Auto-refresh on 401** → Seamless token renewal
5. **Zustand stores user state** → With persistence

### Auth Store (Zustand)

```typescript
// lib/stores/authStore.ts
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      
      get isAuthenticated() {
        return !!get().user && isAuthenticated()
      },
      
      login: async (payload) => { /* ... */ },
      register: async (payload) => { /* ... */ },
      logout: () => { /* ... */ },
    }),
    { name: 'auth-storage' }
  )
)
```

### Protected Routes

```typescript
'use client'

export default function ProtectedPage() {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated])
  
  // ... component content
}
```

---

## 🌍 Environment Variables

Create `.env.local` file (already configured):

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🎨 Styling

### Tailwind CSS

This project uses Tailwind CSS with custom configurations:

```typescript
// tailwind.config.ts
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
}
```

### Global Styles

```css
/* app/globals.css */
@import "tailwindcss";

/* Custom animations */
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}
```

---

## 📦 Dependencies

### Core

- **next** - React framework with SSR/SSG
- **react** - UI library
- **typescript** - Type safety

### State & HTTP

- **zustand** - State management
- **axios** - HTTP client
- **js-cookie** - Cookie management

### Styling

- **tailwindcss** - Utility-first CSS
- **@tailwindcss/postcss** - PostCSS plugin

---

## 🏗️ Architecture Patterns

### Component Pattern

```typescript
'use client'  // Client component (has interactivity)

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MyPage() {
  const [state, setState] = useState('')
  const router = useRouter()
  
  const handleAction = async () => {
    // Action logic
    router.push('/success')
  }
  
  return (
    <div className="container">
      {/* JSX content */}
    </div>
  )
}
```

### HTTP Service Pattern

```typescript
// lib/services/http.ts
import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// Add token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auto-refresh on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Refresh token logic
  }
)
```

### Store Pattern (Zustand)

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useMyStore = create<MyState>()(
  persist(
    (set, get) => ({
      // State
      items: [],
      
      // Computed
      get total() {
        return get().items.length
      },
      
      // Actions
      addItem: (item) => set((state) => ({
        items: [...state.items, item]
      })),
    }),
    { name: 'my-storage' }
  )
)
```

---

## 🔄 Comparison with Vue

Coming from Vue? See the quick reference below.

Quick reference:

| Vue Concept | Next.js Equivalent |
|-------------|-------------------|
| `<template>` | JSX in return |
| `ref()` | `useState()` |
| `computed()` | Getters or `useMemo()` |
| `watch()` | `useEffect()` |
| `v-model` | Controlled components |
| Vue Router | App Router (file-based) |
| Pinia | Zustand |

---

## 🧪 Testing (To be added)

Testing setup will include:

- Jest for unit tests
- React Testing Library
- Playwright for E2E tests

---

## 📚 Resources

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev/
- **Zustand Docs:** https://docs.pmnd.rs/zustand/
- **Tailwind Docs:** https://tailwindcss.com/docs
- **TypeScript Docs:** https://www.typescriptlang.org/docs/

---

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Type Errors

```bash
# Run type checking
npx tsc --noEmit

# If needed, delete tsconfig.tsbuildinfo
rm tsconfig.tsbuildinfo
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or let Next.js auto-assign next available port (3001)
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub/GitLab
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

**Version:** 1.0  
**Last Updated:** February 2026
