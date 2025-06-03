import { View, Text, StyleSheet } from 'react-native';
import { useI18n } from '../index';

const ExampleUsage = () => {
  const { t } = useI18n();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('messages.welcomeMessage')}</Text>
      
      <View style={styles.section}>
        <Text style={styles.subtitle}>{t('demo.basicTexts')}:</Text>
        <Text>{t('common.loading')}</Text>
        <Text>{t('common.success')}</Text>
        <Text>{t('common.error')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>{t('demo.navigation')}:</Text>
        <Text>{t('navigation.home')}</Text>
        <Text>{t('navigation.profile')}</Text>
        <Text>{t('navigation.settings')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>{t('demo.authentication')}:</Text>
        <Text>{t('auth.login')}</Text>
        <Text>{t('auth.register')}</Text>
        <Text>{t('auth.email')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>{t('demo.validation')}:</Text>
        <Text>{t('validation.required')}</Text>
        <Text>{t('validation.invalidEmail')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>{t('demo.message')}:</Text>
        <Text>{t('messages.thankYou')}</Text>
        <Text>{t('messages.pleaseWait')}</Text>
        <Text>{t('messages.noDataFound')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
});

export { ExampleUsage }; 