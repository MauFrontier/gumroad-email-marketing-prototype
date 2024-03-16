import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddFilterGroupButton from './AddFilterGroupButton';

describe('AddFilterGroupButton', () => {
  it('renders component', () => {
    const handleAddFilterGroup = jest.fn();

    render(<AddFilterGroupButton onPress={handleAddFilterGroup} />);
    expect(
      screen.getByLabelText('Add filter group button'),
    ).toBeInTheDocument();
  });

  it('calls onPress callback', async () => {
    const handleAddFilterGroup = jest.fn();

    render(<AddFilterGroupButton onPress={handleAddFilterGroup} />);
    await userEvent.click(screen.getByLabelText('Add filter group button'));

    expect(handleAddFilterGroup).toHaveBeenCalled();
  });
});
