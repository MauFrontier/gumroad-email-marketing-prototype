import {render, screen} from '@testing-library/react';
import WorkflowBuilder from './WorkflowBuilder';

describe('WorkflowBuilder', () => {
  it('renders component', () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Workflow builder')).toBeInTheDocument();
  });

  it('renders name input', () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('renders trigger selection', () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Trigger selection')).toBeInTheDocument();
  });

  it("renders WorkflowBuilder's components", () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('renders targeting builder', () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Targeting builder')).toBeInTheDocument();
  });

  it('renders developer tools', () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Developer tools')).toBeInTheDocument();
  });
});
