import {render, screen} from '@testing-library/react';
import App from './App';

it('renders App component', () => {
  render(<App />);
  const appComponent = screen.getByTestId('App');
  expect(appComponent).toBeInTheDocument();
});
