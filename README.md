# Project Folder Structure

This project follows an organized folder structure to improve the application's modularity, maintainability, and scalability.

Below is the main structure description:

```
├── assets/
│   ├── fonts/    # Custom fonts
│   └── images/   # Images and other visual assets
├── src/
│   ├── components/             # Global and reusable UI components (presentational)
│   │   ├── Card/
│   │   │   ├── card.tsx
│   │   │   └── types.ts
│   │   └── index.ts
│   ├── config/               # Global configuration files
│   │   └── index.ts
│   ├── constants/            # Application constants (colors, strings, etc.)
│   │   ├── colors.ts
│   │   └── strings.ts
│   ├── features/             # Main modules or functionalities (grouped by feature)
│   │   ├── auth/           # Example: Authentication module
│   │   │   ├── components/ # Feature-specific UI components
│   │   │   ├── screens/    # Feature screens (containers)
│   │   │   ├── hooks.ts      # Feature-specific custom hooks
│   │   │   └── types.ts      # Feature-specific types  
│   ├── hooks/                # Global and reusable custom hooks
│   │   └── useFormValidation.ts
│   ├── i18n/               # Internationalization files
│   ├── navigation/           # Navigation logic and configuration (React Navigation)
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── MainTabNavigator.tsx
│   │   └── types.ts
│   ├── store/                # Redux Toolkit store configuration
│   │   ├── api/            # API configuration and definition (RTK Query)
│   │   │   ├── authApi.ts
│   │   │   ├── productsApi.ts
│   │   │   └── index.ts
│   │   ├── slices/         # Redux slice definitions
│   │   │   ├── authSlice.ts
│   │   │   ├── uiSlice.ts
│   │   │   └── cartSlice.ts
│   │   └── store.ts        # Main store configuration file
│   ├── styles/               # Global styles, themes, or style utilities
│   │   ├── globalStyles.ts
│   │   └── theme.ts
│   ├── types/                # Global application types (interfaces, etc.)
│   │   ├── index.d.ts
│   │   └── common.types.ts
│   └── utils/                # General and reusable utility functions
│       ├── helpers.ts
│       └── validators.ts
├── .env.example              # Example environment variables file
├── .env                      # Environment variables (ignored by Git)
├── .gitignore                # File to specify files and folders ignored by Git
├── App.tsx                   # Main application entry point
├── app.json                  # Expo application configuration
├── babel.config.js           # Babel configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies and scripts file
```

This structure aims to separate concerns and facilitate the organized growth of the project. 