import {render, screen} from '@testing-library/react';
import AddFilterGroupButton from './AddFilterGroupButton';

describe('AddFilterGroupButton', () => {
  it('renders component', () => {
    const handleAddFilterGroup = jest.fn();

    render(<AddFilterGroupButton onPress={handleAddFilterGroup} />);
    expect(
      screen.getByLabelText('Add filter group button'),
    ).toBeInTheDocument();
  });

  it('calls onPress callback', () => {
    const handleAddFilterGroup = jest.fn();

    render(<AddFilterGroupButton onPress={handleAddFilterGroup} />);
    screen.getByLabelText('Add filter group button').click();

    expect(handleAddFilterGroup).toHaveBeenCalled();
  });
});
