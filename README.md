# Puffer

```
│── /src
│   ├── /components 
│   ├── /routes
│   │   ├── modules
│   │   ├──── home
│   ├── /utils
│   ├── /services
│   ├── root.tsx
│   ├── routes.tsx
│   ├── app.css
│── /public
│── /vite.config.ts
│── /package.json
│── /pnpm-lock.yaml
│── /tsconfig.json
```

React App setup with `npm 10.9.2` and version `node.js v23.10.0`

Before running frontend app please run backend.

```
 cp .env.example .env
```

After cloning the repo, run ```npm install``` to install all dependencies.
To start application run: ```npm run dev```.

I used multiple popular libraries that have awesome community support for React:

- vite (to serve the app)
- axios (as http client)
- React Query (to manage data fetching)
- tailwindcss (UI library)
- react router dom v7 (navigation)
- typescript

App is done in way that we have a lot of components and modules that are reusable.

Idea was to have some modules in routes that have in his folder components, hooks and types just for that components and to have one global folder for components that are used in multiple places.
 
Also we have 

## Project Architecture

The project follows a modular architecture with clear separation of concerns:

### Core Directories
- `/components`: Reusable UI components used across multiple modules
- `/routes`: Feature-based modules containing route-specific components, hooks, and types
  - `/home`: Home page module
  - `/currentRate`: Current Rate
  - `/graph`: Graph
- `/utils`: Utility functions and helpers
- `/services`: API services and data fetching logic

### Key Features
- **Modular Structure**: Each route has its own module with dedicated components, hooks, and types
- **Global Components**: Shared components in the `/components` directory
- **Type Safety**: Full TypeScript support throughout the application
- **API Integration**: Axios with React Query for efficient data fetching and caching
- **Modern UI**: TailwindCSS and HeadlessUI for responsive, accessible design

## Available Scripts

- `npm install` - Install project dependencies
- `npm run dev` - Start development server
- `npm run build` - Build production bundle

### Environment Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example` (if applicable)
4. Start development server: `npm run dev`

Note: I usually add .env to .gitignore, but for this case, it is not needed.

### Context API Implementation
If you're interested in an alternative approach, check out the `feat-context-implementation` branch. This implementation uses the Context API.

I personally enjoy using Context or Zustand for state management, but in this specific case, it's not strictly necessary since we only need to store three items.

Pros of Using Context API
React can consume and compare the stored values more efficiently.
Type safety improvements.
Potential Drawback
If the backend does not provide updated EUR values, we might end up storing outdated values in either local storage or context.
