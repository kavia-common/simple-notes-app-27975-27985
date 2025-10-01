import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Ocean Notes brand', () => {
  render(<App />);
  const brandElement = screen.getByText(/Ocean Notes/i);
  expect(brandElement).toBeInTheDocument();
});
