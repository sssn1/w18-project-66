#### Week 15

##### =>　 package.json

```
{
  "name": "prostore-xx",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "prisma generate --no-engine && next build",
    "start": "next start",
    "lint": "next lint",
    "postinstall": "prisma generate --no-engine"
  },
  "dependencies": {
    "@auth/prisma-adapter": "^2.9.1",
    "@hookform/resolvers": "^5.0.1",
    "@prisma/client": "^6.7.0",
    "@prisma/extension-accelerate": "^1.3.0",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.12",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-slot": "^1.2.3",
    "bcrypt-ts-edge": "^3.0.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.503.0",
    "next": "15.3.1",
    "next-auth": "^5.0.0-beta.28",
    "next-themes": "^0.4.6",
    "query-string": "^9.2.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.56.4",
    "react-hot-toast": "^2.5.2",
    "slugify": "^1.6.6",
    "sonner": "^2.0.3",
    "tailwind-merge": "^3.2.0",
    "zod": "^3.25.30"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20.17.43",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "prisma": "^6.7.0",
    "tailwindcss": "^4",
    "tsx": "^4.19.4",
    "tw-animate-css": "^1.2.8",
    "typescript": "^5.8.3"
  }
}
```

##### => install packages

```
$ npm install

```

##### => install shadcn ui components

```bash
$ npx shadcn@latest add alert-dialog badge form input label select sheet sonner table

```

##### => copy files

```
app/(auth)/*
app/api/*
app/unauthorized/*
lib/utils.ts
lib/validator.ts
lib/constants/index.ts
auth.ts
middleware.ts
```
