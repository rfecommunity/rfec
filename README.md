# RFEC

![Next.js Version](https://img.shields.io/badge/next.js-15.3.3-blue)
![React Version](https://img.shields.io/badge/react-19.1.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-2.3.0-blue)

A modern application built with Next.js 15 and React 19, featuring Turbopack for ultra-fast development and Tailwind CSS for styling.

## ✨ Features

- 🖥 shadcn/ui Component Library - Accessible, customizable components built with Radix UI primitives
- ⚡ Next.js 15 with Turbopack for blazing fast development
- 🎨 Tailwind CSS with animations and merge utilities
- 🔍 Strict ESLint + Prettier code quality setup
- 🐶 Husky Git hooks with commit message validation
- 🛠 TypeScript-first development

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+
- npm 9.x+

### Installation

1. Clone the repository:

```bash
git clone git@github.com:rfecommunity/rfec.git
cd rfec
```

2. Install dependencies:

```bash
npm install
```

3. Set up Git hooks (automatically configured after install):

```bash
npm run prepare
```

## 📋 Available Scripts

In the project directory, you can run:

- `npm run dev`: Start development server with Turbopack
- `npm run build`: Create production build
- `npm run start`: Start production server
- `npm run lint`: Check for ESLint errors
- `npm run prepare`: Set up Git hooks (auto-runs after install)

## 🔧 Code Quality

This project uses:

- ESLint with Next.js core rules + Prettier integration
- Pre-commit hooks with `lint-staged`
- Conventional commit message validation via `commitlint`
- TypeScript strict type checking

Git hooks will automatically:

- Format code with Prettier
- Run ESLint checks
- Validate commit messages

## 🖌 UI Components Architecture

This project uses [shadcn/ui](https://ui.shadcn.com/) components with the following stack:

- **Radix UI Primitives** - Unstyled, accessible component primitives
- **Tailwind CSS** - Utility-first styling with `tailwind-merge` for class combination
- **CLSX** - Conditional class handling
- **CVA (Class Variance Authority)** - Type-safe component variants
- **Slot** - Radix Slot utility for component composition

## 🧩 Working with Components

### Component Structure

Components follow shadcn/ui conventions:

```bash
src/
  components/
    ui/
      button.tsx  # Component logic
    your-components.tsx
```

### Creating New Components

1. Use the shadcn CLI (if configured):

```bash
npx shadcn-ui@latest add button
```

2. Manual creation example:

```typescript
// components/ui/custom-card.tsx
import { cva } from 'class-variance-authority'

const cardVariants = cva('rounded-lg border bg-card text-card-foreground', {
  variants: {
    variant: {
      default: 'shadow-sm',
      elevated: 'shadow-lg'
    }
  }
})
```

## 🤝 Contributing

1. Create your feature branch:

```bash
git checkout -b feature/your-feature
```

2. Commit your changes (follow conventional commit format):

```bash
git commit -m "feat: add new component"
```

3. Push to the branch:

```bash
git push origin feature/your-feature
```

4. Open a Pull Request

---
