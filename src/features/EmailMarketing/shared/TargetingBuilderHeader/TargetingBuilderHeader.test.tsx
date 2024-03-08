import {render, screen} from '@testing-library/react';
import TargetingBuilderHeader from './TargetingBuilderHeader';

describe('TargetingBuilderHeader', () => {
  it('renders component', () => {
    render(<TargetingBuilderHeader />);
    expect(screen.getByTestId('TargetingBuilderHeader')).toBeInTheDocument();
  });

  it('renders recipients count', () => {
    render(<TargetingBuilderHeader />);
    expect(screen.getByText(/Recipients/)).toBeInTheDocument();
  });

  it('renders Generate with AI button', () => {
    render(<TargetingBuilderHeader />);
    expect(screen.getByText(/Generate with AI/)).toBeInTheDocument();
  });
});
