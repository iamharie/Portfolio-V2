# Micro Frontend (MFE) Implementation Guide

## Overview

This guide explains how to convert the TEST module into a proper Micro Frontend using Module Federation.

## Current Architecture: Monolithic

```
┌─────────────────────────────────────┐
│     Main Portfolio Application      │
│  ┌───────────┐  ┌─────────────┐   │
│  │   Home    │  │  Experience │   │
│  ├───────────┤  ├─────────────┤   │
│  │ Projects  │  │    TEST     │   │
│  └───────────┘  └─────────────┘   │
└─────────────────────────────────────┘
```

## Target Architecture: Micro Frontend

```
┌─────────────────┐         ┌─────────────────┐
│  Host App       │         │  TEST Module    │
│  (Shell)        │◄────────┤  (Remote MFE)   │
│                 │  fetch  │                 │
│  - Routing      │         │  - Independent  │
│  - Navigation   │         │  - Deployable   │
│  - Theme        │         │  - Versioned    │
└─────────────────┘         └─────────────────┘
```

## Implementation Steps

### Phase 1: Preparation (Current State) ✅

- [x] Create standalone TEST module ([TestPage.tsx](src/pages/TestPage.tsx))
- [x] Set up routing to `/test`
- [x] Ensure module is self-contained with minimal dependencies

### Phase 2: Module Federation Setup

#### Step 1: Install Dependencies

```bash
npm install @originjs/vite-plugin-federation --save-dev
```

#### Step 2: Create Two Separate Projects

**Project Structure:**

```
portfolio-workspace/
├── host-app/              # Main portfolio (Shell)
│   ├── src/
│   ├── vite.config.ts
│   └── package.json
└── test-module/           # Remote TEST module
    ├── src/
    │   └── TestPage.tsx
    ├── vite.config.ts
    └── package.json
```

#### Step 3: Configure TEST Module as Remote

**test-module/vite.config.ts:**

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "test_module",
      filename: "remoteEntry.js",
      exposes: {
        "./TestPage": "./src/pages/TestPage.tsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.3.1" },
        "react-dom": { singleton: true, requiredVersion: "^18.3.1" },
        "framer-motion": { singleton: true },
      },
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5001,
  },
  preview: {
    port: 5001,
  },
});
```

**test-module/package.json:**

```json
{
  "name": "test-module",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite --port 5001",
    "build": "vite build",
    "preview": "vite preview --port 5001"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "^11.14.4"
  },
  "devDependencies": {
    "@originjs/vite-plugin-federation": "^1.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.1"
  }
}
```

#### Step 4: Configure Host App to Consume Remote

**host-app/vite.config.ts:**

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host_app",
      remotes: {
        testModule: "http://localhost:5001/assets/remoteEntry.js",
        // Production: 'https://test-module.yourdomain.com/assets/remoteEntry.js'
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.3.1" },
        "react-dom": { singleton: true, requiredVersion: "^18.3.1" },
        "framer-motion": { singleton: true },
      },
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5000,
  },
});
```

#### Step 5: Dynamic Import in Host App

**host-app/src/App.tsx:**

```typescript
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Lazy load the remote module
const TestPage = lazy(() => import('testModule/TestPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: 'experience', element: <Experience /> },
      {
        path: 'test',
        element: (
          <Suspense fallback={<div>Loading TEST Module...</div>}>
            <TestPage />
          </Suspense>
        ),
      },
    ],
  },
]);
```

#### Step 6: TypeScript Declarations

**host-app/src/vite-env.d.ts:**

```typescript
/// <reference types="vite/client" />

declare module "testModule/TestPage" {
  const TestPage: React.ComponentType;
  export default TestPage;
}
```

### Phase 3: Deployment Strategy

#### Option A: Independent Deployment

```
Host App → Netlify/Vercel (https://portfolio.com)
TEST Module → Separate instance (https://test-module.portfolio.com)
```

#### Option B: Monorepo with Turborepo

```bash
npm install turbo --save-dev

# turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false
    }
  }
}
```

### Phase 4: Advanced Features

#### A. Version Management

```typescript
// Dynamic remote with version
const remoteUrl = `https://test-module.com/${version}/remoteEntry.js`;
```

#### B. Error Boundaries

```typescript
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary fallback={<div>TEST module failed to load</div>}>
  <TestPage />
</ErrorBoundary>
```

#### C. Shared State Management

```typescript
// Use context providers at host level
<ThemeProvider>
  <TestPage />
</ThemeProvider>
```

## Benefits of This Approach

### 1. **Independent Deployment**

- Update TEST module without redeploying entire portfolio
- Zero downtime deployments
- Rollback individual modules

### 2. **Team Autonomy**

- Different teams can own different modules
- Independent CI/CD pipelines
- Technology flexibility (React, Vue, Angular)

### 3. **Performance**

- Lazy loading reduces initial bundle size
- Parallel loading of modules
- Better caching strategies

### 4. **Scalability**

- Add new modules without affecting existing ones
- Horizontal scaling of individual modules
- A/B testing different versions

## Migration Checklist

- [ ] Extract TEST module to separate project
- [ ] Install Module Federation plugin
- [ ] Configure remote exports
- [ ] Configure host imports
- [ ] Set up TypeScript declarations
- [ ] Test local development (both apps running)
- [ ] Set up separate CI/CD for TEST module
- [ ] Deploy TEST module
- [ ] Update host app remote URL
- [ ] Deploy host app
- [ ] Monitor and validate

## Development Workflow

```bash
# Terminal 1: Run TEST module
cd test-module
npm run dev  # Runs on http://localhost:5001

# Terminal 2: Run host app
cd host-app
npm run dev  # Runs on http://localhost:5000
```

## Production Build

```bash
# Build TEST module first
cd test-module
npm run build
# Deploy dist/ to CDN or server

# Build and deploy host app
cd host-app
npm run build
# Deploy dist/ to Netlify/Vercel
```

## Alternative: Webpack Module Federation

If you prefer Webpack over Vite:

```javascript
// webpack.config.js for TEST module
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "test_module",
      filename: "remoteEntry.js",
      exposes: {
        "./TestPage": "./src/pages/TestPage",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
};
```

## Resources

- [Vite Plugin Federation](https://github.com/originjs/vite-plugin-federation)
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Micro Frontend Architecture](https://micro-frontends.org/)

## Next Steps

1. Extract TEST module to `test-module/` directory
2. Install federation plugin
3. Configure both projects
4. Test locally with both servers running
5. Set up deployment pipelines
6. Go live! 🚀
