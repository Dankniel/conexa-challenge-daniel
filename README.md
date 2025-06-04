# Conexa Challenge - React Native App

Una aplicación móvil desarrollada con React Native y Expo que consume la API de JSONPlaceholder para mostrar noticias, usuarios y funcionalidades de favoritos.

## 🚀 Instrucciones de Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Expo CLI instalado globalmente: `npm install -g expo-cli`
- Para desarrollo móvil: Expo Go app en tu dispositivo móvil

### Pasos para instalar el proyecto

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd conexa-challenge-daniel
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Ejecutar el proyecto:**
   ```bash
   npm start
   # o
   yarn start
   ```

4. **Acceder a la aplicación:**
   - Escanea el código QR con la app Expo Go (Android) o la cámara (iOS)

### Credenciales de acceso
- **Usuario:** `user`
- **Contraseña:** `password`

## 📚 Tecnologías y Decisiones de Desarrollo

### Gestión del Estado
**Redux Toolkit** se eligió para el manejo centralizado del estado de la aplicación, proporcionando una solución robusta y predecible para:
- Noticias y usuarios
- Favoritos del usuario
- Configuración de idioma
- Estado de autenticación

### Conexión con API
**RTK Query** se implementó para la conexión con la API de JSONPlaceholder, ofreciendo:
- Cache automático de datos
- Invalidación inteligente de cache
- Manejo de estados de carga y error
- Sincronización de datos en tiempo real

### Patrones de Diseño Implementados

#### Componente Contenedor y Presentación
Se separó la lógica de negocio de la presentación visual en todas las pantallas y componentes principales, facilitando:
- Testing más eficiente
- Reutilización de componentes
- Mantenimiento simplificado

#### Compound Components
Los componentes globales a nivel de features están diseñados para ser utilizados por componentes más complejos específicos de cada funcionalidad.

### Interfaz de Usuario
**Tamagui** fue la librería elegida para la UI. Aunque no es una tecnología que domino completamente, quise explorar sus capacidades. Esto presentó algunos desafíos durante la configuración de tests que requirieron configuraciones adicionales.

### Internacionalización (i18n)
Se implementó un sistema completo de i18n que incluye:
- Soporte para español e inglés
- Configuración persistente en AsyncStorage
- Cambio de idioma en tiempo real
- Detección automática del idioma del dispositivo

### Navegación
**React Navigation** se utilizó para el sistema de navegación. Aunque Expo Router era una alternativa, React Navigation es la librería con la que tengo más experiencia y conocimiento profundo.

### Arquitectura de la Aplicación
- **Separación de flujos:** El flujo de autenticación está completamente separado del flujo principal de la aplicación
- **Estado global:** La mayor parte de la lógica se maneja desde la store de Redux Toolkit
- **Persistencia eficiente:** Las noticias favoritas se guardan como array de IDs en AsyncStorage, filtrando el array total al momento de mostrarlas (más eficiente en memoria)

## 🏗️ Estructura del Proyecto

Este proyecto sigue una estructura organizada para mejorar la modularidad, mantenibilidad y escalabilidad de la aplicación.

```
├── assets/
│   ├── fonts/                  # Fuentes personalizadas
│   └── images/                 # Imágenes y otros recursos visuales
├── src/
│   ├── components/             # Componentes UI globales y reutilizables (presentacionales)
│   │   ├── Card/
│   │   │   ├── card.tsx
│   │   │   └── types.ts
│   │   └── index.ts
│   ├── config/                 # Archivos de configuración global
│   │   └── index.ts
│   ├── constants/              # Constantes de la aplicación (colores, strings, etc.)
│   │   ├── colors.ts
│   │   └── strings.ts
│   ├── features/               # Módulos principales o funcionalidades (agrupadas por feature)
│   │   ├── auth/               # Ejemplo: Módulo de autenticación
│   │   │   ├── components/     # Componentes UI específicos del feature
│   │   │   ├── screens/        # Pantallas del feature (contenedores)
│   │   │   ├── hooks.ts        # Hooks personalizados específicos del feature
│   │   │   └── types.ts        # Tipos específicos del feature
│   ├── hooks/                  # Hooks personalizados globales y reutilizables
│   │   └── useFormValidation.ts
│   ├── i18n/                   # Archivos de internacionalización
│   ├── navigation/             # Lógica y configuración de navegación (React Navigation)
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── MainTabNavigator.tsx
│   │   └── types.ts
│   ├── store/                  # Configuración del store de Redux Toolkit
│   │   ├── api/                # Configuración y definición de API (RTK Query)
│   │   │   ├── authApi.ts
│   │   │   ├── newsApi.ts
│   │   │   └── index.ts
│   │   ├── slices/             # Definiciones de slices de Redux
│   │   │   ├── authSlice.ts
│   │   │   ├── newsSlice.ts
│   │   │   └── favoritesSlice.ts
│   │   └── store.ts            # Archivo principal de configuración del store
│   ├── styles/                 # Estilos globales, temas o utilidades de estilo
│   │   ├── globalStyles.ts
│   │   └── theme.ts
│   ├── types/                  # Tipos globales de la aplicación (interfaces, etc.)
│   │   ├── index.d.ts
│   │   └── common.types.ts
│   └── utils/                  # Funciones utilitarias generales y reutilizables
│       ├── helpers.ts
│       └── validators.ts
├── .env.example                # Archivo de ejemplo de variables de entorno
├── .env                        # Variables de entorno (ignorado por Git)
├── .gitignore                  # Archivo para especificar archivos y carpetas ignoradas por Git
├── App.tsx                     # Punto de entrada principal de la aplicación
├── app.json                    # Configuración de la aplicación Expo
├── babel.config.js             # Configuración de Babel
├── tsconfig.json               # Configuración de TypeScript
└── package.json                # Archivo de dependencias y scripts del proyecto
```

Esta estructura tiene como objetivo separar las responsabilidades y facilitar el crecimiento organizado del proyecto.

## 📝 Convenciones de Nomenclatura

Para mantener la consistencia y legibilidad del código, seguimos las siguientes convenciones de nomenclatura:

- **Componentes React:** Los archivos y nombres de componentes React (como pantallas, componentes globales, etc.) deben usar **PascalCase** (ej: `HomeScreenContainer.tsx`, `Button.tsx`). Esto sigue la convención estándar de React para diferenciar componentes de elementos nativos.
- **Archivos de soporte:** Los archivos que no definen directamente un componente principal (como archivos de tipos, estilos, utilidades, hooks globales) deben usar **minúsculas** (ej: `types.ts`, `styles.ts`, `helpers.ts`).
- **Carpetas:** Los nombres de carpetas deben ser descriptivos y generalmente en **minúsculas** (ej: `components`, `screens`, `utils`). Las carpetas que agrupan componentes específicos de features pueden usar **PascalCase** para la carpeta contenedora principal (ej: `HomeScreen/`).

Esta convención ayuda a identificar rápidamente el propósito del contenido de un archivo o carpeta.

## 🧪 Testing

Este proyecto utiliza **Jest** y **React Native Testing Library** para pruebas unitarias e integración. La estructura de tests debe ser similar a la estructura del proyecto para identificar más fácilmente los tests de cada componente.


## 🎯 Principios de Desarrollo

### SOLID
Se respetan los principios SOLID en todo el desarrollo para mantener un código:
- **S**ingle Responsibility: Cada módulo tiene una responsabilidad específica
- **O**pen/Closed: Abierto para extensión, cerrado para modificación
- **L**iskov Substitution: Los objetos deben ser reemplazables por instancias de sus subtipos
- **I**nterface Segregation: Interfaces específicas son mejores que una interfaz general
- **D**ependency Inversion: Depender de abstracciones, no de concreciones

### Código Limpio
- Nombres descriptivos y significativos
- Evitar código repetitivo (DRY)
- Mantener buena legibilidad
- Modularidad y separación de responsabilidades
- Funciones pequeñas y enfocadas

## 📱 Funcionalidades Principales

- **Autenticación:** Sistema de login con credenciales
- **Noticias:** Visualización de noticias desde JSONPlaceholder
- **Favoritos:** Guardar y gestionar noticias favoritas
- **Usuarios:** Lista de usuarios del sistema
- **Búsqueda:** Funcionalidad de búsqueda en noticias
- **Internacionalización:** Soporte para múltiples idiomas
- **Navegación por Tabs:** Interfaz intuitiva de navegación

---

Desarrollado como parte del desafío técnico de Conexa. 