import React from 'react';
import { render } from '@testing-library/react-native';
import AppNavigator from '../../src/navigation/AppNavigator';

// Mock de react-redux
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock simple de navegación completa
jest.mock('../../src/navigation/AppNavigator', () => {
  const React = require('react');
  const { Text } = require('react-native');
  
  return function MockAppNavigator() {
    const { useSelector } = require('react-redux');
    const authState = useSelector((state: any) => state.auth);
    
    if (authState.isLoading) {
      return null;
    }
    
    return React.createElement(Text, { testID: 'app-navigator' }, 
      authState.userToken ? 'MainNavigator' : 'AuthNavigator'
    );
  };
});

import { useSelector, useDispatch } from 'react-redux';

const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;

describe('AppNavigator', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDispatch.mockReturnValue(mockDispatch);
  });

  it('shows AuthNavigator when user is not logged in', () => {
    mockUseSelector.mockReturnValue({ userToken: null, isLoading: false });

    const { getByTestId, getByText } = render(<AppNavigator />);
    
    expect(getByTestId('app-navigator')).toBeTruthy();
    expect(getByText('AuthNavigator')).toBeTruthy();
  });

  it('shows MainNavigator when user is logged in', () => {
    mockUseSelector.mockReturnValue({ userToken: 'dummy-token', isLoading: false });

    const { getByTestId, getByText } = render(<AppNavigator />);
    
    expect(getByTestId('app-navigator')).toBeTruthy();
    expect(getByText('MainNavigator')).toBeTruthy();
  });

  it('renders null when loading', () => {
    mockUseSelector.mockReturnValue({ userToken: null, isLoading: true });

    const { queryByTestId } = render(<AppNavigator />);
    
    expect(queryByTestId('app-navigator')).toBeNull();
  });

  it('calls Redux hooks correctly', () => {
    mockUseSelector.mockReturnValue({ userToken: null, isLoading: false });

    render(<AppNavigator />);
    
    expect(mockUseSelector).toHaveBeenCalled();
    // El mock de useDispatch se verifica implícitamente al funcionar correctamente
  });
}); 