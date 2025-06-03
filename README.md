# Project Folder Structure

This project follows an organized folder structure to improve the application's modularity, maintainability, and scalability.

Below is the main structure description:

```
├── __tests__/                 # Unit and integration tests
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

## Naming Conventions

To maintain code consistency and readability, we follow the following naming conventions:

- **React Components:** React component files and names (like screens, global components, etc.) should use **PascalCase** (e.g., `HomeScreenContainer.tsx`, `Button.tsx`). This follows the standard React convention to differentiate components from native elements.
- **Support Files:** Files that do not directly define a main component (like type files, style files, utilities, global hooks) should use **lowercase** (e.g., `types.ts`, `styles.ts`, `helpers.ts`). While snake_case or kebab-case are also common, we use lowercase for these files in this project.
- **Folders:** Folder names should be descriptive and generally in **lowercase** (e.g., `components`, `screens`, `utils`). Folders that group feature-specific components might use **PascalCase** for the main container folder (e.g., `HomeScreen/`).

This convention helps to quickly identify the purpose of a file or folder's content.

## Testing

This project utilizes Jest for unit and integration testing. Tests are located in the `__tests__/` directory at the root of the project.


### Tests folder structure
```
├── __tests__/                 # Unit and integration tests
│   ├── components/             # Tests for global components
│   │   ├── Button.test.tsx
│   │   └── Card.test.tsx
│   ├── features/               # Tests grouped by feature
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   └── LoginForm.test.tsx
│   │   │   ├── screens/
│   │   │   │   └── LoginScreen.test.tsx
│   │   │   └── slices/
│   │   │       └── authSlice.test.ts
│   ├── hooks/                  # Tests for global hooks
│   │   └── useFormValidation.test.ts
│   ├── navigation/             # Tests for navigation logic
│   │   └── AppNavigator.test.tsx
│   ├── screens/                # Tests for global screens
│   │   └── HomeScreen.test.tsx
│   ├── store/                  # Tests for store logic
│   │   ├── api/                # Tests for API call logic (mocked)
│   │   │   └── productsApi.test.ts
│   │   └── slices/             # Tests for global reducers and selectors
│   │       └── uiSlice.test.ts
│   ├── utils/                  # Tests for utility functions
│   │   └── helpers.test.ts
```

### Implementation

- **Unit Tests:** Focus on testing individual functions, components, or modules in isolation. Mocking dependencies is crucial for ensuring true unit tests.
- **Integration Tests:** Verify the interaction between multiple components or modules. These tests ensure that different parts of the application work together correctly.
- **Test Naming:** Test files should follow a consistent naming convention, typically `[filename].test.js` or `[filename].test.ts`.
- **Test Coverage:** Aim for high test coverage to ensure that most of the codebase is tested. Use coverage reports to identify areas that need more testing.

### Maintenance

- **Run Tests Regularly:** Integrate test execution into the development workflow (e.g., pre-commit hooks, CI/CD pipelines) to catch regressions early.
- **Write Clear and Concise Tests:** Tests should be easy to read and understand. Use descriptive names for test suites and individual tests.
- **Keep Tests Up-to-Date:** Update tests whenever the corresponding code is changed to avoid flaky or outdated tests.
- **Refactor Tests:** Just like application code, tests should be refactored to improve their readability and maintainability.
- **Avoid Testing Implementation Details:** Focus on testing the observable behavior of the code rather than its internal implementation details. This makes tests more resilient to code changes.

By following these guidelines, we can ensure that our test suite remains robust, reliable, and maintainable, contributing to the overall quality and stability of the application. 