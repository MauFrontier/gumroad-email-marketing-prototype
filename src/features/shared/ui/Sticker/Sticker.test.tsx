import {render, screen} from '@testing-library/react';
import Sticker from './Sticker';

const mockURI = 'https://via.placeholder.com/150';
const mockLabel = 'Click me';

describe('Sticker', () => {
  it('renders with label', () => {
    render(<Sticker uri={mockURI} label={mockLabel} />);

    expect(screen.getByAltText(mockLabel)).toBeInTheDocument();
  });
});
