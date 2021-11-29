import { render, screen } from '@testing-library/react';
import App from './App';

test('renders authentication page', () => {
  render(<App />);
  const linkElement = screen.getByText('Authenticate');
  expect(linkElement).toBeInTheDocument();
});
