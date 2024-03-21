import {render, screen} from '@testing-library/react';
import ExamplePrompts from './ExamplePrompts';
import userEvent from '@testing-library/user-event';

describe('ExamplePrompts', () => {
  it('renders the component', async () => {
    render(<ExamplePrompts examplePrompts={[]} />);

    expect(screen.getByLabelText('Example prompts')).toBeVisible();
  });

  it('renders the component with example prompts, showing only one at a time', async () => {
    render(
      <ExamplePrompts
        examplePrompts={[
          {
            prompt: 'Example prompt 1',
            description: 'Example description 1',
          },
          {
            prompt: 'Example prompt 2',
            description: 'Example description 2',
          },
        ]}
      />,
    );

    expect(screen.getByText('Example description 1')).toBeVisible();
    expect(screen.getByText('Example prompt 1')).toBeVisible();
    expect(screen.queryByText('Example description 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Example prompt 2')).not.toBeInTheDocument();
  });

  it('navigates to the next example prompt when the next button is clicked', async () => {
    render(
      <ExamplePrompts
        examplePrompts={[
          {
            prompt: 'Example prompt 1',
            description: 'Example description 1',
          },
          {
            prompt: 'Example prompt 2',
            description: 'Example description 2',
          },
        ]}
      />,
    );

    expect(screen.getByText('Example description 1')).toBeVisible();
    expect(screen.getByText('Example prompt 1')).toBeVisible();
    expect(screen.queryByText('Example description 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Example prompt 2')).not.toBeInTheDocument();

    const nextButton = screen.getByLabelText('Next prompt');
    await userEvent.click(nextButton);

    expect(screen.queryByText('Example description 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Example prompt 1')).not.toBeInTheDocument();
    expect(screen.getByText('Example description 2')).toBeVisible();
    expect(screen.getByText('Example prompt 2')).toBeVisible();
  });

  it('navigates to the previous example prompt when the previous button is clicked', async () => {
    render(
      <ExamplePrompts
        examplePrompts={[
          {
            prompt: 'Example prompt 1',
            description: 'Example description 1',
          },
          {
            prompt: 'Example prompt 2',
            description: 'Example description 2',
          },
        ]}
      />,
    );

    expect(screen.getByText('Example description 1')).toBeVisible();
    expect(screen.getByText('Example prompt 1')).toBeVisible();
    expect(screen.queryByText('Example description 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Example prompt 2')).not.toBeInTheDocument();

    const previousButton = screen.getByLabelText('Previous prompt');
    await userEvent.click(previousButton);

    expect(screen.queryByText('Example description 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Example prompt 1')).not.toBeInTheDocument();
    expect(screen.getByText('Example description 2')).toBeVisible();
    expect(screen.getByText('Example prompt 2')).toBeVisible();
  });
});
