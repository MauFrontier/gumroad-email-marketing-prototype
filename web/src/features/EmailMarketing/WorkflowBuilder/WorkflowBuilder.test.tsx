import {render, screen} from '@testing-library/react';
import WorkflowBuilder from './WorkflowBuilder';

describe('WorkflowBuilder', () => {
  it('renders component', () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Workflow builder')).toBeInTheDocument();
  });

  it('renders title input', () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
  });

  it('renders audience selection', () => {
    render(<WorkflowBuilder />);
    expect(screen.getByLabelText('Audience selection')).toBeInTheDocument();
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
