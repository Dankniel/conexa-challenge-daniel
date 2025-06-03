export interface SettingsScreenPresentationalProps {
  onLogoutPress: () => void;
  loading: boolean;
  paddingTop: number;
  texts: {
    title: string;
    logoutButton: string;
  };
} 