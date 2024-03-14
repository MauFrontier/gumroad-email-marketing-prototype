import {render, screen} from '@testing-library/react';
import AddFilterGroupButton from './AddFilterGroupButton';

describe('AddFilterGroupButton', () => {
  it('renders component', () => {
    const handleAddFilter = jest.fn();

    render(<AddFilterGroupButton onPress={handleAddFilter} />);
    expect(
      screen.getByLabelText('Add filter group button'),
    ).toBeInTheDocument();
  });
});
