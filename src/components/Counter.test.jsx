// src/components/Counter.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

// Use 'describe' to group related tests
describe('Counter Component', () => {
  test('renders the initial count as 0', () => {
    render(<Counter />);
    
    // Use screen to query the rendered DOM elements
    const countElement = screen.getByTestId('count-display');
    
    // Assertions using jest-dom matchers
    expect(countElement).toHaveTextContent('0');
  });

  test('increments the count when the button is clicked', () => {
    render(<Counter />);

    // Find the button and the count display
    const button = screen.getByRole('button', { name: /increment/i });
    const countElement = screen.getByTestId('count-display');

    // Simulate a user click event
    fireEvent.click(button);

    // Assert the new state
    expect(countElement).toHaveTextContent('1');
  });
});
