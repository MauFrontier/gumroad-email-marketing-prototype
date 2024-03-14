import {render, screen} from '@testing-library/react';
import AddFilterButton from './AddFilterButton';

describe('AddFilterButton', () => {
  it('renders component', () => {
    const handleAddFilter = jest.fn();

    render(<AddFilterButton onPress={handleAddFilter} />);
    expect(screen.getByLabelText('Add filter button')).toBeInTheDocument();
  });

  it('calls onPress callback', () => {
    const handleAddFilter = jest.fn();

    render(<AddFilterButton onPress={handleAddFilter} />);
    screen.getByLabelText('Add filter button').click();

    expect(handleAddFilter).toHaveBeenCalled();
  });
});
