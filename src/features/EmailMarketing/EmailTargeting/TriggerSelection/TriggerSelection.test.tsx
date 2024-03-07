import {render, screen} from '@testing-library/react';
import TriggerSelection from './TriggerSelection';

describe('TriggerSelection additional tests', () => {
  it('renders component', () => {
    render(<TriggerSelection />);
    expect(screen.getByTestId('TriggerSelection')).toBeInTheDocument();
  });
});
