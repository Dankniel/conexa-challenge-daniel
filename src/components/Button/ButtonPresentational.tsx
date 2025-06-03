import { Button as TamaguiButton, Spinner } from 'tamagui';
import { ButtonPresentationalProps } from './types';

const ButtonPresentational = ({ 
  children, 
  onPress, 
  disabled,
  ...tamaguiProps 
}: ButtonPresentationalProps) => {
  return (
    <TamaguiButton
      onPress={onPress}
      disabled={disabled}
      {...tamaguiProps}
    >
      {children}
    </TamaguiButton>
  );
};

export { ButtonPresentational }; 