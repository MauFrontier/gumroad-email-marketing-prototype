import {render, screen} from '@testing-library/react';
import TargetingFilterGroup from './TargetingFilterGroup';

describe('TargetingFilterGroup', () => {
  it('renders component', () => {
    render(<TargetingFilterGroup />);
    expect(screen.getByTestId('TargetingFilterGroup')).toBeInTheDocument();
  });
});
