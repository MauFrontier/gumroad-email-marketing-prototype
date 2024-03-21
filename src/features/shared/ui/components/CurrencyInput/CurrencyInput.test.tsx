import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyInput from './CurrencyInput';

describe('CurrencyInput', () => {
  it('renders with initial value', async () => {
    const handleChange = jest.fn();
    render(
      <CurrencyInput
        value={123.45}
        onChange={handleChange}
        label="Currency amount element"
      />,
    );

    const input = screen.getByLabelText(
      'Currency amount input',
    ) as HTMLInputElement;
    expect(input.value).toBe('123.45');
  });

  it('calls onChange with the new value on valid input', async () => {
    const handleChange = jest.fn();
    render(
      <CurrencyInput
        value={0}
        onChange={handleChange}
        label="Currency amount"
      />,
    );

    const input = screen.getByLabelText('Currency amount input');
    await userEvent.clear(input);
    await userEvent.type(input, '250.5');

    expect(handleChange).toHaveBeenCalledWith(250.5);
  });

  it('does not call onChange on invalid input', async () => {
    const handleChange = jest.fn();
    render(
      <CurrencyInput
        value={0}
        onChange={handleChange}
        label="Currency amount"
      />,
    );

    const input = screen.getByLabelText('Currency amount input');
    expect(handleChange).not.toHaveBeenCalled();

    await userEvent.clear(input);
    expect(handleChange).toHaveBeenCalledTimes(1);

    await userEvent.type(input, 'invalid');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('sets aria-invalid to true on invalid input', async () => {
    render(
      <CurrencyInput value={0} onChange={jest.fn()} label="Currency amount" />,
    );

    const input = screen.getByLabelText('Currency amount input');
    await userEvent.clear(input);
    await userEvent.type(input, 'invalid');

    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('keeps aria-invalid false on valid input', async () => {
    render(
      <CurrencyInput
        value={100}
        onChange={jest.fn()}
        label="Currency amount"
      />,
    );

    const input = screen.getByLabelText('Currency amount input');
    await userEvent.clear(input);
    await userEvent.type(input, '200');

    expect(input).not.toHaveAttribute('aria-invalid', 'true');
  });

  it('disables the input when disabled prop is passed', () => {
    render(
      <CurrencyInput
        value={100}
        onChange={jest.fn()}
        label="Currency amount"
        disabled={true}
      />,
    );

    const input = screen.getByLabelText('Currency amount input');
    expect(input).toBeDisabled();
  });

  it('does not disable the input when disabled prop is not passed', () => {
    render(
      <CurrencyInput
        value={100}
        onChange={jest.fn()}
        label="Currency amount"
      />,
    );

    const input = screen.getByLabelText('Currency amount input');
    expect(input).not.toBeDisabled();
  });
});
