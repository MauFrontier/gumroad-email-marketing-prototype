import {render, screen} from '@testing-library/react';
import Select from './Select';
import userEvent from '@testing-library/user-event';

describe('Select', () => {
  it('renders with label', () => {
    render(
      <Select
        label="Test Select"
        value="123"
        options={[]}
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Test Select')).toBeInTheDocument();
  });

  it('displays options', () => {
    const options = [
      {key: '123', value: 'Test Option 1'},
      {key: '456', value: 'Test Option 2'},
    ];

    render(
      <Select
        label="Test Select"
        value="123"
        options={options}
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByText('Test Option 1')).toBeInTheDocument();
    expect(screen.getByText('Test Option 2')).toBeInTheDocument();
  });

  it('selects the option with the passed value', () => {
    const options = [
      {key: '123', value: 'Test Option 1'},
      {key: '456', value: 'Test Option 2'},
    ];

    render(
      <Select
        label="Test Select"
        value="456"
        options={options}
        onChange={jest.fn()}
      />,
    );

    const selectElement = screen.getByLabelText(
      'Test Select',
    ) as HTMLSelectElement;

    expect(selectElement.value).toBe('456');

    const selectedOption = screen.getByRole('option', {
      name: 'Test Option 2',
    }) as HTMLOptionElement;
    const nonSelectedOption = screen.getByRole('option', {
      name: 'Test Option 1',
    }) as HTMLOptionElement;
    expect(selectedOption.selected).toBe(true);
    expect(nonSelectedOption.selected).toBe(false);
  });

  it('fires onChange when option is selected', async () => {
    const onChange = jest.fn();
    const options = [
      {key: '123', value: 'Test Option 1'},
      {key: '456', value: 'Test Option 2'},
    ];

    render(
      <Select
        label="Test Select"
        value="123"
        options={options}
        onChange={onChange}
      />,
    );

    const selectElement = screen.getByLabelText('Test Select');
    await userEvent.selectOptions(selectElement, ['456']);

    expect(onChange).toHaveBeenCalledWith('456');
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
