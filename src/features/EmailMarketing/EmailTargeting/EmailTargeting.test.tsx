import {render, screen} from '@testing-library/react';
import EmailTargeting from './EmailTargeting';

describe('EmailTargeting additional tests', () => {
  it('renders component', () => {
    render(<EmailTargeting />);
    expect(screen.getByTestId('EmailTargeting')).toBeInTheDocument();
  });
});
