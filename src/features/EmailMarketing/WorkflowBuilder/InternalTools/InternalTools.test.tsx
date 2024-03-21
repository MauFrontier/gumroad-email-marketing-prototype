import {render, screen} from '@testing-library/react';
import InternalTools from './InternalTools';

describe('InternalTools', () => {
  it('renders the component', async () => {
    render(<InternalTools />);

    expect(screen.getByLabelText('Internal tools container')).toBeVisible();
  });

  it('renders example prompts, product editor, and current state', async () => {
    render(<InternalTools />);

    expect(screen.getByLabelText('Example prompts')).toBeVisible();
    expect(screen.getByLabelText('Edit products')).toBeVisible();
    expect(screen.getByLabelText('Current state')).toBeVisible();
  });
});
