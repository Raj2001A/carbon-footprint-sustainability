# Project Structure

## Directory Organization

```
carbon-footprint-tracker/
├── src/
│   ├── app/
│   │   ├── core/                    # Core services and utilities
│   │   │   ├── emissions-state.service.ts
│   │   │   ├── emissions-state.service.spec.ts
│   │   │   ├── toast.service.ts
│   │   │   └── toast-container/     # Toast notification component
│   │   │
│   │   ├── features/                # Feature modules (lazy-loaded)
│   │   │   ├── dashboard/           # Dashboard page
│   │   │   ├── add-emission/        # Add emission form
│   │   │   ├── emissions-table/     # Emissions table with CRUD
│   │   │   ├── emissions-chart/     # Chart visualization
│   │   │   └── shared-header.scss   # Shared header styles
│   │   │
│   │   ├── app.component.ts         # Root component
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.routes.ts            # Route configuration
│   │   ├── app.config.ts            # App configuration
│   │   └── app.config.server.ts     # SSR configuration
│   │
│   ├── index.html                   # HTML entry point
│   ├── main.ts                      # Bootstrap file
│   ├── main.server.ts               # SSR bootstrap
│   └── styles.scss                  # Global styles
│
├── public/                          # Static assets
│   ├── favicon.ico
│   ├── favicon.png
│   └── logo.png
│
├── dist/                            # Build output (generated)
├── node_modules/                    # Dependencies (generated)
│
├── angular.json                     # Angular CLI configuration
├── tsconfig.json                    # TypeScript configuration
├── tsconfig.app.json                # App TypeScript config
├── tsconfig.spec.json               # Test TypeScript config
├── package.json                     # Dependencies and scripts
├── package-lock.json                # Locked dependency versions
├── .editorconfig                    # Code style configuration
├── .gitignore                       # Git ignore rules
├── server.ts                        # SSR server configuration
│
├── README.md                        # Project documentation
├── DEPLOYMENT.md                    # Deployment guide
├── PROJECT_STRUCTURE.md             # This file
└── CONTRIBUTING.md                  # Contribution guidelines
```

## Module Organization

### Core Module (`src/app/core/`)
- **Purpose**: Shared services and utilities
- **Contents**:
  - `emissions-state.service.ts` - State management with localStorage
  - `toast.service.ts` - Toast notifications
  - `toast-container/` - Toast UI component

### Features Module (`src/app/features/`)
- **Purpose**: Feature-specific components (lazy-loaded)
- **Components**:
  - `dashboard/` - KPI dashboard
  - `add-emission/` - Emission form
  - `emissions-table/` - Data table with CRUD
  - `emissions-chart/` - Chart visualization

## Naming Conventions

- **Components**: `*.component.ts`, `*.component.html`, `*.component.scss`
- **Services**: `*.service.ts`
- **Tests**: `*.spec.ts`
- **Styles**: `*.scss` (SCSS preferred over CSS)
- **Folders**: kebab-case (e.g., `add-emission`)
- **Classes**: PascalCase (e.g., `EmissionsStateService`)
- **Variables**: camelCase (e.g., `totalEmissions`)

## Build Artifacts

- **Browser bundle**: `dist/carbon-footprint-tracker/browser/`
- **Server bundle**: `dist/carbon-footprint-tracker/server/`
- **Prerendered routes**: 4 static HTML files

## Key Features

✅ Standalone components (Angular 18)
✅ Lazy loading for features
✅ Server-side rendering (SSR)
✅ Responsive design
✅ State management with RxJS
✅ localStorage persistence
✅ Chart.js integration
✅ Form validation
✅ Toast notifications

