import {render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';

import TextInput from './TextInput';

describe('TextInput', () => {
  it('renders placeholder text', () => {
    render(<TextInput placeholder="Enter text" />);

    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
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
