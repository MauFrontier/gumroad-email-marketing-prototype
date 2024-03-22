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

  it('renders audience selection', () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Audience selection')).toBeInTheDocument();
  });

  it("renders WorkflowBuilder's components", () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('renders targeting builder', () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Targeting builder')).toBeInTheDocument();
  });

  it('renders internal tools container', () => {
    render(<WorkflowBuilder />);
    expect(
      screen.getByLabelText('Internal tools container'),
    ).toBeInTheDocument();
  });
});
