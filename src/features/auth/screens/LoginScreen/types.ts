export interface LoginScreenPresentationalProps {
  text: string;
  onLoginPress: () => void;
  username: string;
  password: string;
  onUsernameChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  loading: boolean;
  error: string | null;
  showPassword: boolean;
  onTogglePasswordVisibility: () => void;
} 