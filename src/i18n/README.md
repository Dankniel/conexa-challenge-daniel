# Módulo de Internacionalización (i18n)

Este módulo proporciona una solución completa de internacionalización para la aplicación React Native, utilizando `react-i18next` y siguiendo los principios SOLID y patrones de diseño establecidos.

## Características

- ✅ Soporte para múltiples idiomas (Español e Inglés por defecto)
- ✅ Detección automática del idioma del dispositivo
- ✅ Hooks personalizados para facilitar el uso
- ✅ Tipos TypeScript para autocompletado y verificación
- ✅ Estructura modular y escalable
- ✅ Compatible con Expo managed workflow
- ✅ Integración completa con Redux para persistencia
- ✅ Soporte para pluralización e interpolación
- ✅ Implementación completa en toda la aplicación

## Estructura de Archivos

```
src/i18n/
├── components/
│   └── ExampleUsage.tsx       # Ejemplo de uso básico
├── locales/
│   ├── es.json               # Traducciones en español
│   └── en.json               # Traducciones en inglés
├── hooks.ts                  # Hooks personalizados
├── types.ts                  # Tipos TypeScript
├── index.ts                  # Configuración principal y exports
└── README.md                 # Este archivo
```

## Instalación y Configuración

Las dependencias ya están instaladas en el proyecto:
- `react-i18next`
- `i18next`
- `expo-localization` (compatible con Expo)

El módulo se inicializa automáticamente en `App.tsx`.

## Uso Básico

### 1. Usando el hook `useI18n`

```tsx
import { useI18n } from '../i18n';

const MyComponent = () => {
  const { t } = useI18n();
  
  return (
    <Text>{t('common.loading')}</Text>
  );
};
```

### 2. Cambiando idiomas programáticamente

```tsx
import { useLanguageWithRedux } from '../i18n';

const LanguageSettings = () => {
  const { changeLanguage, switchToSpanish, switchToEnglish, toggleLanguage } = useLanguageWithRedux();
  
  return (
    <View>
      <Button onPress={switchToSpanish} title="Español" />
      <Button onPress={switchToEnglish} title="English" />
      <Button onPress={toggleLanguage} title="Toggle" />
    </View>
  );
};
```

### 3. Componentes UI para cambio de idioma

Los componentes visuales para cambiar idiomas están ubicados en las features específicas que los necesitan. Por ejemplo, el `LanguageSwitcher` usado en la pantalla de configuración se encuentra en:

```
src/features/settings/components/LanguageSwitcher/
```

Esto sigue el patrón de co-localización donde los componentes UI están cerca de donde se usan.

## Claves de Traducción Implementadas

### Común
- `common.loading`, `common.error`, `common.success`
- `common.confirm`, `common.cancel`, `common.save`
- `common.delete`, `common.edit`, `common.create`
- `common.search`, `common.back`, `common.next`
- `common.yes`, `common.no`

### Navegación
- `navigation.home`, `navigation.profile`
- `navigation.settings`, `navigation.about`
- `navigation.users`, `navigation.favorites`

### Autenticación
- `auth.login`, `auth.logout`, `auth.register`
- `auth.email`, `auth.password`, `auth.username`
- `auth.firstName`, `auth.lastName`
- `auth.forgotPassword`, `auth.confirmPassword`

### Login
- `login.welcome` - Mensaje de bienvenida
- `login.username`, `login.password` - Etiquetas de campos  
- `login.usernamePlaceholder`, `login.passwordPlaceholder` - Placeholders
- `login.loginButton` - Texto del botón de login
- `login.errorRequired` - Error cuando faltan campos
- `login.errorInvalidCredentials` - Error de credenciales inválidas

### Validaciones
- `validation.required`, `validation.invalidEmail`
- `validation.passwordTooShort`, `validation.passwordsDoNotMatch`
- `validation.invalidFormat`

### Mensajes
- `messages.welcomeMessage`, `messages.thankYou`
- `messages.pleaseWait`, `messages.noDataFound`
- `messages.connectionError`, `messages.momentPlease`
- `messages.tryAgain`, `messages.goodBye`

### Configuración
- `settings.title`, `settings.userProfile`, `settings.notifications`
- `settings.language`, `settings.languageDescription`
- `settings.i18nDemo`, `settings.i18nDemoDescription`
- `settings.savedLanguage`, `settings.loggingOut`
- `settings.generalSettings`, `settings.generalSettingsDescription`

### Pantalla Principal (Home)
- `home.latestNews`, `home.searchResults`
- `home.loadingNews`, `home.errorLoadingNews`
- `home.checkConnection`, `home.noNewsFound`
- `home.tryOtherTerms`, `home.searchPlaceholder`

### Favoritos
- `favorites.title`, `favorites.loadingFavorites`
- `favorites.noFavorites`, `favorites.addFromHome`
- `favorites.favoritesCount` (con interpolación de contador)
- `favorites.favoritesSingular`, `favorites.favoritesPlural`

### Usuarios
- `users.title`, `users.loadingUsers`
- `users.errorLoadingUsers`, `users.pullToRetry`
- `users.noUsersFound`, `users.tryDifferentSearch`
- `users.usersFound` (con interpolación de contador)

### Demo/Ejemplos
- `demo.common`, `demo.navigation`, `demo.authentication`
- `demo.validation`, `demo.message`, `demo.basicTexts`

## Componentes Actualizados con i18n

### Pantallas principales:
- ✅ `HomeScreen` - Títulos, mensajes de carga, errores y placeholder de búsqueda
- ✅ `FavoritesScreen` - Títulos, mensajes de estado y contadores
- ✅ `UsersScreen` - Títulos, mensajes de carga y errores
- ✅ `SettingsScreen` - Títulos y botones
- ✅ `LoginScreen` - Bienvenida, campos, botones y mensajes de error

### Componentes globales:
- ✅ `MainTabNavigator` - Títulos de las tabs
- ✅ `SearchBar` - Placeholder por defecto
- ✅ `FavoritesCounter` - Textos del contador
- ✅ `I18nDemo` - Componente de demostración completo

### Componentes específicos:
- ✅ `LanguageSwitcher` - Sistema completo de cambio de idioma
- ✅ `ExampleUsage` - Componente de ejemplo actualizado

## Pluralización

El sistema soporta interpolación de variables para contadores dinámicos:

```tsx
// En los archivos de traducción
{
  "favorites": {
    "favoritesCount": "{{count}} noticias"
  }
}

// En el componente
const { t } = useI18n();
return <Text>{t('favorites.favoritesCount', { count: favoriteNews.length })}</Text>;
```

## Interpolación de Variables

```tsx
// En el archivo de traducciones
{
  "home": {
    "searchResults": "Resultados de búsqueda: \"{{query}}\""
  }
}

// En el componente
const { t } = useI18n();
return <Text>{t('home.searchResults', { query: searchQuery })}</Text>;
```

## Integración con Redux

El sistema está completamente integrado con Redux para:
- Persistir el idioma seleccionado en AsyncStorage
- Sincronizar el estado del idioma entre componentes
- Cambios de idioma en tiempo real sin reiniciar la app

## Agregar Nuevas Traducciones

1. Agrega las claves en `src/i18n/locales/es.json`
2. Agrega las mismas claves en `src/i18n/locales/en.json`
3. Actualiza los tipos en `src/i18n/types.ts`
4. Usa la traducción en tu componente con `const { t } = useI18n()`

### Ejemplo:

```json
// es.json
{
  "products": {
    "title": "Productos",
    "addNew": "Agregar Nuevo",
    "delete": "Eliminar Producto"
  }
}

// en.json
{
  "products": {
    "title": "Products",
    "addNew": "Add New",
    "delete": "Delete Product"
  }
}
```

```tsx
// types.ts
export interface LanguageResource {
  // ... existing types ...
  products: {
    title: string;
    addNew: string;
    delete: string;
  };
}
```

```tsx
// Component.tsx
const { t } = useI18n();
return <Text>{t('products.title')}</Text>;
```

## Compatibilidad con Expo

Este módulo está optimizado para funcionar con Expo managed workflow:
- Usa `expo-localization` en lugar de `react-native-localize`
- No requiere configuración nativa adicional
- Compatible con web, iOS y Android
- Funciona en entorno de desarrollo y producción

## Arquitectura y Patrones

### Principios Aplicados

- **SOLID**: Cada módulo tiene una responsabilidad específica
- **Separation of Concerns**: Los hooks manejan la lógica, los componentes la UI
- **Co-location**: Los componentes UI están cerca de donde se usan
- **Hooks personalizados**: Encapsulan la lógica de i18n
- **TypeScript**: Tipos estrictos para mejor DX y menos errores

### Estructura Modular

El módulo i18n se enfoca únicamente en:
- Configuración de idiomas
- Hooks para traducciones
- Tipos TypeScript
- Detección de idioma del dispositivo
- Integración con Redux

Los componentes UI específicos se ubican en las features que los necesitan, siguiendo el principio de co-localización.

## Estado de Implementación

### ✅ Completado:
- [x] Sistema i18n completo configurado
- [x] Traducciones en español y inglés
- [x] Integración con Redux
- [x] Persistencia en AsyncStorage
- [x] Actualización de todos los componentes principales
- [x] Soporte para pluralización
- [x] Interpolación de variables
- [x] Tipos TypeScript completos
- [x] Componente de demostración interactivo
- [x] Documentación completa

### 📱 Componentes con i18n implementado:
- [x] HomeScreen (pantalla principal)
- [x] FavoritesScreen (pantalla de favoritos)  
- [x] UsersScreen (pantalla de usuarios)
- [x] SettingsScreen (pantalla de configuración)
- [x] MainTabNavigator (navegación principal)
- [x] SearchBar (barra de búsqueda)
- [x] FavoritesCounter (contador de favoritos)
- [x] I18nDemo (demostración de i18n)
- [x] LanguageSwitcher (cambio de idioma)

## Demo en Vivo

Puedes ver el sistema i18n funcionando en la pantalla de **Configuración** de la aplicación, donde se incluye un componente de demo interactivo que permite:
- Cambiar idiomas en tiempo real
- Ver ejemplos de traducciones de diferentes categorías
- Probar la funcionalidad completa del sistema
- Observar la persistencia del idioma seleccionado

El cambio de idioma es instantáneo y afecta a toda la aplicación sin necesidad de reiniciar. 