import {render, screen} from '@testing-library/react';
import DeveloperTools from './DeveloperTools';

describe('DeveloperTools', () => {
  it('Renders the component', async () => {
    render(<DeveloperTools />);

    expect(screen.getByLabelText('Developer tools container')).toBeVisible();
  });
});
