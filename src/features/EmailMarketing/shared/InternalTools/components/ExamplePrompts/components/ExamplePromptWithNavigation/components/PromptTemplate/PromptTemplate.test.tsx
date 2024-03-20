import {render, screen} from '@testing-library/react';
import PromptTemplate from './PromptTemplate';
import userEvent from '@testing-library/user-event';

describe('PromptTemplate', () => {
  it('renders the component', async () => {
    render(
      <PromptTemplate
        prompt="Example Prompt 1"
        onUsePromptTemplate={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Prompt template')).toBeVisible();
  });

  it('renders the component with a prompt', async () => {
    render(
      <PromptTemplate
        prompt="Example Prompt 1"
        onUsePromptTemplate={jest.fn()}
      />,
    );

    expect(screen.getByText('Example Prompt 1')).toBeVisible();
  });

  it('fires the use prompt template callback when the apply button is clicked', async () => {
    const onUsePromptTemplate = jest.fn();

    render(
      <PromptTemplate
        prompt="Example Prompt 1"
        onUsePromptTemplate={onUsePromptTemplate}
      />,
    );

    const applyButton = screen.getByRole('button', {name: 'Use this prompt'});
    await userEvent.click(applyButton);

    expect(onUsePromptTemplate).toHaveBeenCalledWith('Example Prompt 1');
  });
});
