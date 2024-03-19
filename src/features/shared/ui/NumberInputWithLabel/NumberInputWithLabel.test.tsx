import {render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';

import NumberInputWithLabel from './NumberInputWithLabel';

describe('NumberInputWithLabel', () => {
  it('renders with label', () => {
    render(
      <NumberInputWithLabel
        label="Number input"
        value={10}
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Number input')).toBeInTheDocument();
  });

  it('takes value from props', () => {
    render(
      <NumberInputWithLabel
        label="Number input"
        value={10}
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  });

  it('calls onChange when input changes', async () => {
    const onChange = jest.fn();
    render(
      <NumberInputWithLabel
        label="Number input"
        value={10}
        onChange={onChange}
      />,
    );

    await userEvent.type(screen.getByLabelText('Number input'), '2');

    expect(onChange).toHaveBeenCalledWith(102);
  });

  it('disables the input when disabled prop is passed', () => {
    render(
      <NumberInputWithLabel
        label="Number input"
        value={10}
        onChange={jest.fn()}
        disabled={true}
      />,
    );

    expect(screen.getByLabelText('Number input')).toBeDisabled();
  });

  it('does not disable the input by default when disabled prop is not passed', () => {
    render(
      <NumberInputWithLabel
        label="Number input"
        value={10}
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Number input')).not.toBeDisabled();
  });
});
