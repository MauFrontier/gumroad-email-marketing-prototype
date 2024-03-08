import {render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';

import Button from './Button';

describe('Button', () => {
  it('renders label', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);

    expect(screen.getByLabelText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);

    const button = screen.getByRole('button');

    expect(handleClick).not.toHaveBeenCalled();

    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });
});