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
    users: string;
    favorites: string;
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
  login: {
    welcome: string;
    username: string;
    password: string;
    usernamePlaceholder: string;
    passwordPlaceholder: string;
    loginButton: string;
    errorRequired: string;
    errorInvalidCredentials: string;
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
    momentPlease: string;
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
    savedLanguage: string;
  };
  home: {
    latestNews: string;
    searchResults: string;
    loadingNews: string;
    errorLoadingNews: string;
    checkConnection: string;
    noNewsFound: string;
    tryOtherTerms: string;
    searchPlaceholder: string;
  };
  favorites: {
    title: string;
    loadingFavorites: string;
    noFavorites: string;
    addFromHome: string;
    favoritesCount: string;
    favoritesSingular: string;
    favoritesPlural: string;
  };
  users: {
    title: string;
    loadingUsers: string;
    errorLoadingUsers: string;
    pullToRetry: string;
    noUsersFound: string;
    tryDifferentSearch: string;
    usersFound: string;
  };
  demo: {
    common: string;
    navigation: string;
    authentication: string;
    validation: string;
    message: string;
    basicTexts: string;
  };
}

export type TranslationKeys = keyof LanguageResource;

export interface I18nConfig {
  defaultLanguage: SupportedLanguages;
  fallbackLanguage: SupportedLanguages;
  supportedLanguages: SupportedLanguages[];
} 