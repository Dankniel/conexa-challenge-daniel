import { Spinner } from 'tamagui';
import { ButtonPresentational } from './ButtonPresentational';
import { ButtonContainerProps } from './types';

const ButtonContainer = ({
  children,
  onPress,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  icon,
}: ButtonContainerProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '$purple8',
          borderColor: '$purple9',
          hoverStyle: { backgroundColor: '$purple9', scale: 1.05 },
          pressStyle: { backgroundColor: '$purple7', scale: 0.95 },
        };
      case 'secondary':
        return {
          backgroundColor: '$purple3',
          borderColor: '$purple5',
          hoverStyle: { backgroundColor: '$purple4', scale: 1.05 },
          pressStyle: { backgroundColor: '$purple2', scale: 0.95 },
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderColor: '$purple5',
          hoverStyle: { backgroundColor: '$purple2', scale: 1.05 },
          pressStyle: { backgroundColor: '$purple1', scale: 0.95 },
        };
      case 'danger':
        return {
          backgroundColor: '$red8',
          borderColor: '$red9',
          hoverStyle: { backgroundColor: '$red9', scale: 1.05 },
          pressStyle: { backgroundColor: '$red7', scale: 0.95 },
        };
      default:
        return {
          backgroundColor: '$purple8',
          borderColor: '$purple9',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { size: '$3', fontSize: '$2' };
      case 'medium':
        return { size: '$4', fontSize: '$3' };
      case 'large':
        return { size: '$5', fontSize: '$4' };
      default:
        return { size: '$4', fontSize: '$3' };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const handlePress = () => {
    if (!loading && !disabled && onPress) {
      onPress();
    }
  };

  return (
    <ButtonPresentational
      onPress={handlePress}
      disabled={disabled || loading}
      width={fullWidth ? '100%' : undefined}
      borderWidth={1}
      borderRadius="$3"
      fontWeight="bold"
      disabledStyle={{
        backgroundColor: '$gray5',
        borderColor: '$gray6',
      }}
      icon={loading ? () => <Spinner size="small" /> : icon}
      {...variantStyles}
      {...sizeStyles}
    >
      {children}
    </ButtonPresentational>
  );
};

export { ButtonContainer }; 