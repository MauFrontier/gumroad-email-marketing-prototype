import {render, screen} from '@testing-library/react';
import Icon from './Icon';

const mockURI = 'https://via.placeholder.com/32';
const mockLabel = 'Click me';

describe('Icon', () => {
  it('renders with label', () => {
    render(<Icon uri={mockURI} label={mockLabel} />);

    expect(screen.getByAltText(mockLabel)).toBeInTheDocument();
  });
});
