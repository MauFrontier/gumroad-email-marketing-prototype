import {render, screen} from '@testing-library/react';
import TargetingBuilder from './TargetingBuilder';

describe('TargetingBuilder', () => {
  it('renders component', () => {
    render(<TargetingBuilder />);
    expect(screen.getByTestId('TargetingBuilder')).toBeInTheDocument();
  });
});
