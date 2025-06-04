import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsScreenPresentational from '../../../../../src/features/settings/screens/SettingsScreen/SettingsScreenPresentational';
import { SettingsScreenPresentationalProps } from '../../../../../src/features/settings/screens/SettingsScreen/types';

// Mock simple de I18nDemoContainer
jest.mock('../../../../../src/features/settings/components/I18nDemo/I18nDemoContainer', () => ({
  I18nDemoContainer: () => {
    const React = require('react');
    return React.createElement('View', { testID: 'i18n-demo-container-mock' });
  },
}));

// Mock simple de ButtonContainer
jest.mock('../../../../../src/components/Button/ButtonContainer', () => ({
  ButtonContainer: ({ children, onPress, ...props }: any) => {
    const React = require('react');
    return React.createElement('TouchableOpacity', 
      { onPress, testID: 'button-container-mock' }, 
      children
    );
  },
}));

describe('SettingsScreenPresentational', () => {
  const mockOnLogoutPress = jest.fn();

  const defaultProps: SettingsScreenPresentationalProps = {
    onLogoutPress: mockOnLogoutPress,
    loading: false,
    paddingTop: 0,
    texts: {
      title: 'Settings',
      logoutButton: 'Log Out',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with provided props', () => {
    const { getByText, getByTestId } = render(
      <SettingsScreenPresentational {...defaultProps} />,
    );

    expect(getByText(defaultProps.texts.title)).toBeTruthy();
    expect(getByTestId('i18n-demo-container')).toBeTruthy();
    expect(getByText(defaultProps.texts.logoutButton)).toBeTruthy();
  });

  it('calls onLogoutPress when the logout button is pressed', () => {
    const { getByTestId } = render(
      <SettingsScreenPresentational {...defaultProps} />,
    );

    fireEvent.press(getByTestId('button-container-mock'));
    expect(mockOnLogoutPress).toHaveBeenCalledTimes(1);
  });

  it('applies paddingTop to the container style', () => {
    const paddingTopValue = 10;
    const { getByTestId } = render(
      <SettingsScreenPresentational {...defaultProps} paddingTop={paddingTopValue} />,
    );

    const container = getByTestId('settings-screen-container');
    expect(container.props.paddingTop).toBe(paddingTopValue);
  });
}); 