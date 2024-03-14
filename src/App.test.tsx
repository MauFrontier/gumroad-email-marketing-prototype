import {render, screen} from '@testing-library/react';
import App from './App';

it('renders App component', () => {
  render(<App />);
  const appComponent = screen.getByTestId('App');
  expect(appComponent).toBeInTheDocument();
});

it('renders EmailCampaignBuilder component', () => {
  render(<App />);
  const emailCampaignBuilderComponent = screen.getByLabelText(
    'Email campaign builder',
  );
  expect(emailCampaignBuilderComponent).toBeInTheDocument();
});
