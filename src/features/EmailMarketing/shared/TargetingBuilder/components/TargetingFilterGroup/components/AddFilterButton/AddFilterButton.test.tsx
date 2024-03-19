import {render, screen} from '@testing-library/react';
import AddFilterButton from './AddFilterButton';
import userEvent from '@testing-library/user-event';

describe('AddFilterButton', () => {
  it('renders component', () => {
    const handleAddFilter = jest.fn();

    render(<AddFilterButton onPress={handleAddFilter} />);
    expect(screen.getByLabelText('Add filter button')).toBeInTheDocument();
  });

  it('calls onPress callback', async () => {
    const handleAddFilter = jest.fn();

    render(<AddFilterButton onPress={handleAddFilter} />);
    await userEvent.click(screen.getByLabelText('Add filter button'));

    expect(handleAddFilter).toHaveBeenCalled();
  });

  it('disables button when disabled prop is true', async () => {
    const handleAddFilter = jest.fn();

    render(<AddFilterButton onPress={handleAddFilter} disabled={true} />);
    const button = screen.getByLabelText('Add filter button');

    expect(button).toBeDisabled();
  });

  it('is not disabled by default', async () => {
    const handleAddFilter = jest.fn();

    render(<AddFilterButton onPress={handleAddFilter} />);
    const button = screen.getByLabelText('Add filter button');

    expect(button).not.toBeDisabled();
  });
});
