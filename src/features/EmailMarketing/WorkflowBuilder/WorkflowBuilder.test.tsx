import {render, screen} from '@testing-library/react';
import WorkflowBuilder from './WorkflowBuilder';

describe('WorkflowBuilder', () => {
  it('renders component', () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Workflow builder')).toBeInTheDocument();
  });

  it("renders WorkflowBuilder's components", () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('renders targeting builder', () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Targeting builder')).toBeInTheDocument();
  });
});
