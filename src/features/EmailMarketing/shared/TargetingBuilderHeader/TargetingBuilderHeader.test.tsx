import {render, screen} from '@testing-library/react';
import TargetingBuilderHeader from './TargetingBuilderHeader';

describe('TargetingBuilderHeader', () => {
  it('renders component', () => {
    render(<TargetingBuilderHeader />);
    expect(screen.getByTestId('TargetingBuilderHeader')).toBeInTheDocument();
  });
});
