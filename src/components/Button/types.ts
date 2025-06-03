import type { ButtonProps as TamaguiButtonProps } from 'tamagui';

export interface ButtonContainerProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

export interface ButtonPresentationalProps extends Omit<TamaguiButtonProps, 'onPress' | 'disabled'> {
  onPress?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
} 