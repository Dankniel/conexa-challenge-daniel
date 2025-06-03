export type SupportedLanguages = 'es' | 'en';

export interface LanguageResource {
  common: {
    loading: string;
    error: string;
    success: string;
    confirm: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    create: string;
    update: string;
    search: string;
    back: string;
    next: string;
    previous: string;
    submit: string;
    close: string;
    open: string;
    yes: string;
    no: string;
  };
  navigation: {
    home: string;
    profile: string;
    settings: string;
    about: string;
  };
  auth: {
    login: string;
    logout: string;
    register: string;
    forgotPassword: string;
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
    firstName: string;
    lastName: string;
  };
  validation: {
    required: string;
    invalidEmail: string;
    passwordTooShort: string;
    passwordsDoNotMatch: string;
    invalidFormat: string;
  };
  messages: {
    welcomeMessage: string;
    goodBye: string;
    thankYou: string;
    pleaseWait: string;
    tryAgain: string;
    noDataFound: string;
    connectionError: string;
  };
  settings: {
    title: string;
    userProfile: string;
    userProfileDescription: string;
    notifications: string;
    notificationsDescription: string;
    generalSettings: string;
    generalSettingsDescription: string;
    language: string;
    languageDescription: string;
    loggingOut: string;
    i18nDemo: string;
    i18nDemoDescription: string;
  };
}

export type TranslationKeys = keyof LanguageResource;

export interface I18nConfig {
  defaultLanguage: SupportedLanguages;
  fallbackLanguage: SupportedLanguages;
  supportedLanguages: SupportedLanguages[];
} 