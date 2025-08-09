# 🧠 Brainly - The 2nd Brain App

Brainly is a TypeScript-based backend project designed to help you build your second brain. It uses Express for HTTP APIs and Mongoose for MongoDB integration. This guide covers the end-to-end setup and current project structure.

---

## 🚀 TypeScript Project Setup Guide

This is a step-by-step guide for initializing and setting up a TypeScript project with necessary type definitions.

### 🔧 Commands Used

```bash
# Initialize a Node.js project
npm init -y

# Install TypeScript as a dev dependency
npm install -D typescript

# Generate a tsconfig.json file
npx tsc --init
```

After generating `tsconfig.json`, update it with:

```json
{
  "rootDir": "./src",
  "outDir": "./dist",
  "strict": true,
  "esModuleInterop": true,
  "forceConsistentCasingInFileNames": true
}
```

```bash
# Install type definitions for Express
npm install -D @types/express

# Install type definitions for jsonwebtoken
npm install -D @types/jsonwebtoken
```

---

### 📁 Final Project Structure

```
project-root/
├── src/           # Source TypeScript files
│   ├── index.ts
│   ├── db.ts
│   └── middleware.ts
├── dist/          # Compiled JavaScript output
├── package.json
├── tsconfig.json
├── .env
├── .gitignore
└── node_modules/
```

---

### ⚙️ Add a Build Script (Optional but Recommended)

In your `package.json`, add:

```json
"scripts": {
  "build": "tsc"
}
```

Then you can run:

```bash
npm run build
```

To compile TypeScript files from `src/` to `dist/`.

---

## 📦 Project Details (Current State)

- **Backend Framework:** Express (`src/index.ts`)
- **Database:** Mongoose (MongoDB integration, imported in `src/index.ts`)
- **Authentication:** JWT (imported in `src/index.ts`)
- **API Endpoints:**  
  - `/api/v1/signup` (POST)  
  - `/api/v1/signin` (POST)  
  - `/api/v1/content` (POST, GET, DELETE)  
  - `/api/v1/brain/share` (POST)  
  - `/api/v1/brain/:shareLink` (GET)
- **Environment Variables:** Managed via `.env`
- **TypeScript Configuration:** See [`tsconfig.json`](tsconfig.json)
- **Dependencies:** See [`package.json`](package.json)
- **Source Files:**  
  - [`src/index.ts`](src/index.ts): Main API routes  
  - [`src/db.ts`](src/db.ts): (empty, intended for DB setup)  
  - [`src/middleware.ts`](src/middleware.ts): (empty, intended for middleware)

---

## 📝 Next Steps

- Implement database models in [`src/db.ts`](src/db.ts)
- Add authentication and validation middleware in [`src/middleware.ts`](src/middleware.ts)
- Flesh out API endpoint logic in [`src/index.ts`](src/index.ts)

---

## 📄 License

This project is licensed under the ISC License. See [`package.json`](package.json) for details.
