import {render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';

import TextInput from './TextInput';

describe('TextInput', () => {
  it('renders placeholder text', () => {
    render(<TextInput placeholder="Enter text" />);

    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('adds accessibility attributes from props', () => {
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
    expect(firstInput).toBeInvalid();
    expect(firstInput).toBeRequired();
    expect(firstInput).toBeDisabled();

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
    expect(secondInput).not.toBeInvalid();
    expect(secondInput).not.toBeRequired();
    expect(secondInput).not.toBeDisabled();
  });

  it('makes the field non-required non-disabled and valid by default', () => {
    render(<TextInput />);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input).not.toBeRequired();
    expect(input).not.toBeDisabled();
    expect(input).toBeValid();
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

  it('disables the input when disabled prop is passed', () => {
    render(<TextInput disabled={true} />);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
  });

  it('does not disable the input by default when disabled prop is not passed', () => {
    render(<TextInput />);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input).not.toBeDisabled();
  });
});
