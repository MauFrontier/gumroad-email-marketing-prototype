import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComboBox from './ComboBox';

const mockSuggestions = [
  {key: '1', value: 'Option 1'},
  {key: '2', value: 'Option 2'},
  {key: '3', value: 'Option 3'},
];

describe('ComboBox', () => {
  it('renders with initial selected values', () => {
    render(
      <ComboBox
        selectedValues={['Option 1']}
        onValuesChange={jest.fn()}
        suggestions={mockSuggestions}
        label="Test ComboBox"
      />,
    );

    const comboBox = screen.getByLabelText('Test ComboBox');
    expect(comboBox).toBeInTheDocument();
  });

  it('displays suggestions when input is focused', async () => {
    render(
      <ComboBox
        selectedValues={[]}
        onValuesChange={jest.fn()}
        suggestions={mockSuggestions}
        label="Test ComboBox"
      />,
    );

    const input = screen.getByLabelText('Tags input');
    await userEvent.click(input);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('updates selected values when a suggestion is selected', async () => {
    const handleChange = jest.fn();
    render(
      <ComboBox
        selectedValues={[]}
        onValuesChange={handleChange}
        suggestions={mockSuggestions}
        label="Test ComboBox"
      />,
    );

    const input = screen.getByLabelText('Tags input');
    await userEvent.click(input);
    await userEvent.click(screen.getByText('Option 2'));

    expect(handleChange).toHaveBeenCalledWith(['Option 2']);
  });

  it('filters suggestions based on input value', async () => {
    render(
      <ComboBox
        selectedValues={[]}
        onValuesChange={jest.fn()}
        suggestions={mockSuggestions}
        label="Test ComboBox"
      />,
    );

    const input = screen.getByLabelText('Tags input');
    await userEvent.type(input, 'Option 3');

    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('closes suggestions list when pressinc Escape key', async () => {
    const handleChange = jest.fn();
    render(
      <ComboBox
        selectedValues={[]}
        onValuesChange={handleChange}
        suggestions={mockSuggestions}
        label="Test ComboBox"
      />,
    );

    const input = screen.getByLabelText('Tags input');
    await userEvent.click(input);
    expect(screen.queryByText('Option 1')).toBeInTheDocument();

    fireEvent.keyDown(input, {key: 'Escape'});

    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('handles keyboard navigation and selection', async () => {
    const handleChange = jest.fn();
    render(
      <ComboBox
        selectedValues={[]}
        onValuesChange={handleChange}
        suggestions={mockSuggestions}
        label="Test ComboBox"
      />,
    );

    const input = screen.getByLabelText('Tags input');
    input.focus();

    fireEvent.keyDown(input, {key: 'ArrowDown'});
    fireEvent.keyDown(input, {key: 'Enter'});

    expect(handleChange).toHaveBeenCalledWith(['Option 1']);
  });
});
