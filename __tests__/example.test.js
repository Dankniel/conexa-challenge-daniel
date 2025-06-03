import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

describe('Example Test', () => {
  it('should render text', () => {
    const { getByText } = render(<Text>Hello Jest!</Text>);
    const element = getByText('Hello Jest!');
    expect(element).toBeDefined();
  });
}); 