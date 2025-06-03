# Módulo de Internacionalización (i18n)

Este módulo proporciona una solución completa de internacionalización para la aplicación React Native, utilizando `react-i18next` y siguiendo los principios SOLID y patrones de diseño establecidos.

## Características

- ✅ Soporte para múltiples idiomas (Español e Inglés por defecto)
- ✅ Detección automática del idioma del dispositivo
- ✅ Hooks personalizados para facilitar el uso
- ✅ Tipos TypeScript para autocompletado y verificación
- ✅ Estructura modular y escalable
- ✅ Compatible con Expo managed workflow

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
import { useLanguageSwitch } from '../i18n';

const LanguageSettings = () => {
  const { switchToSpanish, switchToEnglish, toggleLanguage } = useLanguageSwitch();
  
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
src/features/settings/components/LanguageSwitcher.tsx
```

Esto sigue el patrón de co-localización donde los componentes UI están cerca de donde se usan.

## Claves de Traducción Disponibles

### Común
- `common.loading`, `common.error`, `common.success`
- `common.confirm`, `common.cancel`, `common.save`
- `common.delete`, `common.edit`, `common.create`
- Y más...

### Navegación
- `navigation.home`, `navigation.profile`
- `navigation.settings`, `navigation.about`

### Autenticación
- `auth.login`, `auth.logout`, `auth.register`
- `auth.email`, `auth.password`, `auth.username`
- Y más...

### Validaciones
- `validation.required`, `validation.invalidEmail`
- `validation.passwordTooShort`, `validation.passwordsDoNotMatch`

### Mensajes
- `messages.welcomeMessage`, `messages.thankYou`
- `messages.pleaseWait`, `messages.noDataFound`

### Configuración
- `settings.title`, `settings.userProfile`, `settings.notifications`
- `settings.language`, `settings.i18nDemo`
- Y más...

## Agregar Nuevas Traducciones

1. Agrega las claves en `src/i18n/locales/es.json`
2. Agrega las mismas claves en `src/i18n/locales/en.json`
3. Actualiza los tipos en `src/i18n/types.ts` si es necesario

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

## Uso Avanzado

### Interpolación de variables

```tsx
// En el archivo de traducciones
{
  "welcome": "Bienvenido, {{name}}!"
}

// En el componente
const { t } = useI18n();
return <Text>{t('welcome', { name: 'Juan' })}</Text>;
```

### Traducciones fuera de componentes React

```tsx
import { translate } from '../i18n';

const validateForm = (email: string) => {
  if (!email) {
    return translate('validation.required');
  }
  // ...
};
```

## Idiomas Soportados

- **Español (es)**: Idioma por defecto y fallback
- **Inglés (en)**: Idioma secundario

Para agregar más idiomas:
1. Crea un nuevo archivo JSON en `locales/`
2. Agrega el idioma al tipo `SupportedLanguages` en `types.ts`
3. Agrega las traducciones en `index.ts`

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

Los componentes UI específicos se ubican en las features que los necesitan, siguiendo el principio de co-localización.

## Ejemplos Completos

Revisa `src/i18n/components/ExampleUsage.tsx` para ver ejemplos básicos de uso.

## Demo en Vivo

Puedes ver el sistema i18n funcionando en la pantalla de **Configuración** de la aplicación, donde se incluye un componente de demo interactivo que permite:
- Cambiar idiomas en tiempo real
- Ver ejemplos de traducciones de diferentes categorías
- Probar la funcionalidad completa del sistema 