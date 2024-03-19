import {render, screen} from '@testing-library/react';
import DeleteFilterButton from './DeleteFilterButton';
import userEvent from '@testing-library/user-event';

describe('DeleteFilterButton', () => {
  it('renders component', () => {
    const handleDelete = jest.fn();

    render(<DeleteFilterButton onPress={handleDelete} />);
    expect(screen.getByLabelText('Delete filter button')).toBeInTheDocument();
  });

  it('calls onPress when clicked', async () => {
    const handlePress = jest.fn();

    render(<DeleteFilterButton onPress={handlePress} />);

    await userEvent.click(screen.getByLabelText('Delete filter button'));

    expect(handlePress).toHaveBeenCalled();
  });

  it('disables button when disabled prop is true', async () => {
    const handlePress = jest.fn();

    render(<DeleteFilterButton onPress={handlePress} disabled={true} />);
    const button = screen.getByLabelText('Delete filter button');

    expect(button).toBeDisabled();
  });

  it('is not disabled by default', async () => {
    const handlePress = jest.fn();

    render(<DeleteFilterButton onPress={handlePress} />);
    const button = screen.getByLabelText('Delete filter button');

    expect(button).not.toBeDisabled();
  });
});
