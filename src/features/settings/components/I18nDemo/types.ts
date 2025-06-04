export interface I18nDemoPresentationalProps {
  title: string;
  description: string;
  savedLanguageLabel: string;
  selectedLanguageDisplay: string;
  demoTitle: string;
  demoTexts: Array<{
    label: string;
    value: string;
  }>;
}

export interface DemoTextItem {
  label: string;
  value: string;
} 