import {fireEvent, render, screen} from '@testing-library/react';
import DateInput from './DateInput';

describe('DateInput', () => {
  it('renders with label', () => {
    render(
      <DateInput
        value={'2021-01-01T00:00:00.000Z'}
        onChange={jest.fn()}
        label="Test DateInput"
      />,
    );

    expect(screen.getByLabelText('Test DateInput')).toBeInTheDocument();
  });

  it('takes value from props', () => {
    render(
      <DateInput
        value={'2021-01-01T00:00:00.000Z'}
        onChange={jest.fn()}
        label="Test DateInput"
      />,
    );

    expect(screen.getByLabelText('Test DateInput')).toHaveValue('2021-01-01');
  });

  it('calls onChange when input changes', async () => {
    const onChange = jest.fn();
    render(
      <DateInput
        value={'2021-01-01T00:00:00.000Z'}
        onChange={onChange}
        label="Test DateInput"
      />,
    );

    const dateInput = screen.getByLabelText('Test DateInput');

    fireEvent.change(dateInput, {target: {value: '2021-01-02'}});

    expect(onChange).toHaveBeenCalledWith('2021-01-02');
  });

  it('disables the input when disabled prop is passed', () => {
    render(
      <DateInput
        value={'2021-01-01T00:00:00.000Z'}
        onChange={jest.fn()}
        label="Test DateInput"
        disabled
      />,
    );

    const dateInput = screen.getByLabelText('Test DateInput');

    expect(dateInput).toBeDisabled();
  });

  it('does not disable the input by default when disabled prop is not passed', () => {
    render(
      <DateInput
        value={'2021-01-01T00:00:00.000Z'}
        onChange={jest.fn()}
        label="Test DateInput"
      />,
    );

    const dateInput = screen.getByLabelText('Test DateInput');

    expect(dateInput).not.toBeDisabled();
  });
});
