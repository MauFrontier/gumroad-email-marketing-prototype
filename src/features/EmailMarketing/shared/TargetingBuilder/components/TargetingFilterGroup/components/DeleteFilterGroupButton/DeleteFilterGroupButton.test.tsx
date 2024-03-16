import {render, screen} from '@testing-library/react';
import DeleteFilterGroupButton from './DeleteFilterGroupButton';
import userEvent from '@testing-library/user-event';

describe('DeleteFilterGroupButton', () => {
  it('renders component', () => {
    const handleDelete = jest.fn();

    render(<DeleteFilterGroupButton onPress={handleDelete} />);
    expect(
      screen.getByLabelText('Delete filter group button'),
    ).toBeInTheDocument();
  });
});
it('calls onPress when clicked', async () => {
  const handleDelete = jest.fn();

  render(<DeleteFilterGroupButton onPress={handleDelete} />);

  await userEvent.click(screen.getByLabelText('Delete filter group button'));

  expect(handleDelete).toHaveBeenCalled();
});
