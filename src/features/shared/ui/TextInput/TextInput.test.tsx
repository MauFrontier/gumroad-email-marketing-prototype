import {render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';

import TextInput from './TextInput';

describe('TextInput', () => {
  it('renders placeholder text', () => {
    render(<TextInput placeholder="Enter text" />);

    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('adds accessibility attributes', () => {
    render(
      <TextInput
        label="Input 1"
        invalid={true}
        required={true}
        disabled={true}
      />,
    );

    const firstInput = screen.getByLabelText('Input 1');

    expect(firstInput).toBeInTheDocument();
    expect(firstInput).toHaveAttribute('aria-invalid', 'true');
    expect(firstInput).toHaveAttribute('required', '');
    expect(firstInput).toHaveAttribute('disabled', '');

    render(
      <TextInput
        label="Input 2"
        invalid={false}
        required={false}
        disabled={false}
      />,
    );

    const secondInput = screen.getByLabelText('Input 2');

    expect(secondInput).toBeInTheDocument();
    expect(secondInput).toHaveAttribute('aria-invalid', 'false');
    expect(secondInput).not.toHaveAttribute('required', '');
    expect(secondInput).not.toHaveAttribute('disabled', '');
  });

  it('calls onChange when input changes', async () => {
    const onChange = jest.fn();
    render(<TextInput onChange={onChange} />);

    const input = screen.getByRole('textbox');

    expect(onChange).not.toHaveBeenCalled();

    await userEvent.type(input, 'new value');

    expect(onChange).toHaveBeenCalled();
  });

  it('renders passed value', () => {
    render(<TextInput value="test value" />);

    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
  });
});
