import {render, screen} from '@testing-library/react';
import InternalTools from './InternalTools';

describe('InternalTools', () => {
  it('Renders the component', async () => {
    render(<InternalTools />);

    expect(screen.getByLabelText('Internal tools container')).toBeVisible();
  });
});
