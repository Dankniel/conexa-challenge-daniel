import i18n from '../../src/i18n';
import { translate } from '../../src/i18n';

describe('i18n Module', () => {
  beforeAll(async () => {
    // i18n ya está inicializado al importar el módulo
    if (!i18n.isInitialized) {
      await i18n.init();
    }
  });

  test('should be initialized', () => {
    expect(i18n.isInitialized).toBe(true);
  });

  test('should have Spanish as default language', () => {
    expect(i18n.language).toBe('es');
  });

  test('should translate common keys correctly in Spanish', () => {
    i18n.changeLanguage('es');
    expect(translate('common.loading')).toBe('Cargando...');
    expect(translate('common.success')).toBe('Éxito');
    expect(translate('common.error')).toBe('Error');
  });

  test('should translate common keys correctly in English', () => {
    i18n.changeLanguage('en');
    expect(translate('common.loading')).toBe('Loading...');
    expect(translate('common.success')).toBe('Success');
    expect(translate('common.error')).toBe('Error');
  });

  test('should handle navigation translations', () => {
    i18n.changeLanguage('es');
    expect(translate('navigation.home')).toBe('Inicio');
    expect(translate('navigation.profile')).toBe('Perfil');
    
    i18n.changeLanguage('en');
    expect(translate('navigation.home')).toBe('Home');
    expect(translate('navigation.profile')).toBe('Profile');
  });

  test('should handle auth translations', () => {
    i18n.changeLanguage('es');
    expect(translate('auth.login')).toBe('Iniciar Sesión');
    expect(translate('auth.email')).toBe('Correo Electrónico');
    
    i18n.changeLanguage('en');
    expect(translate('auth.login')).toBe('Login');
    expect(translate('auth.email')).toBe('Email');
  });

  test('should handle validation translations', () => {
    i18n.changeLanguage('es');
    expect(translate('validation.required')).toBe('Este campo es obligatorio');
    
    i18n.changeLanguage('en');
    expect(translate('validation.required')).toBe('This field is required');
  });

  test('should fallback to Spanish for unknown language', () => {
    i18n.changeLanguage('fr'); // Idioma no soportado
    expect(translate('common.loading')).toBe('Cargando...');
  });

  test('should return key if translation not found', () => {
    const unknownKey = 'unknown.key.that.does.not.exist';
    expect(translate(unknownKey)).toBe(unknownKey);
  });
}); 