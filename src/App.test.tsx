import {render, screen} from '@testing-library/react';
import App from './App';

it('renders App component', () => {
  render(<App />);
  const appComponent = screen.getByTestId('App');
  expect(appComponent).toBeInTheDocument();
});

it('renders WorkflowBuilder component', () => {
  render(<App />);
  const workflowBuilderComponent = screen.getByLabelText('Workflow builder');
  expect(workflowBuilderComponent).toBeInTheDocument();
});
