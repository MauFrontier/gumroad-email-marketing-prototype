import {render, screen} from '@testing-library/react';
import InternalTools from './InternalTools';

describe('InternalTools', () => {
  it('renders the component', async () => {
    render(<InternalTools />);

    expect(screen.getByLabelText('Internal tools container')).toBeVisible();
  });

  it('renders example prompts, and product editor', async () => {
    render(<InternalTools />);

    expect(screen.getByLabelText('Example prompts')).toBeVisible();
    expect(screen.getByLabelText('Edit products')).toBeVisible();
  });
});
