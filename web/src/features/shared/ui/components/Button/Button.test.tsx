import {render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';

import Button from './Button';

describe('Button', () => {
  it('renders label', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);

    expect(screen.getByLabelText('Click me')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <Button onClick={jest.fn()} label="My new button">
        Click me
      </Button>,
    );

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);

    const button = screen.getByRole('button');

    expect(handleClick).not.toHaveBeenCalled();

    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });

  it('disables the button when disabled prop is passed', async () => {
    const handleClick = jest.fn();
    render(
      <Button label="My new button" onClick={handleClick} disabled={true}>
        Click me
      </Button>,
    );

    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(screen.getByRole('button')).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not disable the button by default when the disabled prop is not present', async () => {
    const handleClick = jest.fn();
    render(
      <Button label="My new button" onClick={handleClick}>
        Click me
      </Button>,
    );

    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(screen.getByRole('button')).not.toBeDisabled();
    expect(handleClick).toHaveBeenCalled();
  });

  it('can be pressed', async () => {
    const handleClick = jest.fn();
    render(
      <Button pressed label="My new button" onClick={handleClick}>
        Click me
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });
});
