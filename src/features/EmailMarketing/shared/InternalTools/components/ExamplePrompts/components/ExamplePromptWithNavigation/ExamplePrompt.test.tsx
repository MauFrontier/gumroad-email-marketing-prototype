import {render, screen} from '@testing-library/react';
import ExamplePrompt from './ExamplePrompt';
import {mockDispatch} from '../../../../../../../../utils/mocks/mocks';
import {EmailMarketingActionType} from '../../../../../../store/emailMarketingStoreTypes';
import {renderComponentWithState} from '../../../../../../store/emailMarketingStoreUtils';
import {emailMarketingInitialState} from '../../../../../../store/emailMarketingInitialState';
import userEvent from '@testing-library/user-event';

describe('ExamplePrompt', () => {
  it('renders the component', async () => {
    render(
      <ExamplePrompt
        goToNextPrompt={jest.fn()}
        goToPreviousPrompt={jest.fn()}
        description="Example description"
        prompt="Example prompt"
      />,
    );

    expect(screen.getByLabelText('Example prompt')).toBeVisible();
  });

  it('renders the component with a description', async () => {
    render(
      <ExamplePrompt
        goToNextPrompt={jest.fn()}
        goToPreviousPrompt={jest.fn()}
        description="Example description"
        prompt="Example prompt"
      />,
    );

    expect(screen.getByText('Example description')).toBeVisible();
  });

  it('renders the component with a prompt', async () => {
    render(
      <ExamplePrompt
        goToNextPrompt={jest.fn()}
        goToPreviousPrompt={jest.fn()}
        description="Example description"
        prompt="Example prompt"
      />,
    );

    expect(screen.getByText('Example prompt')).toBeVisible();
  });

  it('fires the goToNextPrompt callback when the next button is clicked', async () => {
    const goToNextPrompt = jest.fn();

    render(
      <ExamplePrompt
        goToNextPrompt={goToNextPrompt}
        goToPreviousPrompt={jest.fn()}
        description="Example description"
        prompt="Example prompt"
      />,
    );

    const nextButton = screen.getByLabelText('Next prompt');
    await userEvent.click(nextButton);

    expect(goToNextPrompt).toHaveBeenCalled();
  });

  it('fires the goToPreviousPrompt callback when the previous button is clicked', async () => {
    const goToPreviousPrompt = jest.fn();

    render(
      <ExamplePrompt
        goToNextPrompt={jest.fn()}
        goToPreviousPrompt={goToPreviousPrompt}
        description="Example description"
        prompt="Example prompt"
      />,
    );

    const previousButton = screen.getByLabelText('Previous prompt');
    await userEvent.click(previousButton);

    expect(goToPreviousPrompt).toHaveBeenCalled();
  });

  it('Sets prompt state when the Use Prompt button is clicked', async () => {
    render(
      <ExamplePrompt
        goToNextPrompt={jest.fn()}
        goToPreviousPrompt={jest.fn()}
        description="Example description"
        prompt="My example prompt"
      />,
    );

    const usePromptButton = screen.getByLabelText('Use this prompt');
    await userEvent.click(usePromptButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: EmailMarketingActionType.SetPrompt,
        payload: 'My example prompt',
      }),
    );
  });

  it('displays the GenerateWithAI panel if its not visible when the Use Prompt button is clicked', async () => {
    renderComponentWithState(
      <ExamplePrompt
        goToNextPrompt={jest.fn()}
        goToPreviousPrompt={jest.fn()}
        description="Example description"
        prompt="My example prompt"
      />,
      {...emailMarketingInitialState, showGenerateWithAIPanel: false},
    );

    const usePromptButton = screen.getByLabelText('Use this prompt');
    await userEvent.click(usePromptButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: EmailMarketingActionType.ToggleShowGenerateWithAIPanel,
      }),
    );
  });

  it("won't try to toggle the GenerateWithAI panel if its visible when the Use Prompt button is clicked", async () => {
    renderComponentWithState(
      <ExamplePrompt
        goToNextPrompt={jest.fn()}
        goToPreviousPrompt={jest.fn()}
        description="Example description"
        prompt="My example prompt"
      />,
      {...emailMarketingInitialState, showGenerateWithAIPanel: true},
    );

    const usePromptButton = screen.getByLabelText('Use this prompt');
    await userEvent.click(usePromptButton);

    expect(mockDispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({
        type: EmailMarketingActionType.ToggleShowGenerateWithAIPanel,
      }),
    );
  });

  it('scrolls to the top of the page when the Use Prompt button is clicked', async () => {
    window.scrollTo = jest.fn();

    render(
      <ExamplePrompt
        goToNextPrompt={jest.fn()}
        goToPreviousPrompt={jest.fn()}
        description="Example description"
        prompt="My example prompt"
      />,
    );

    const usePromptButton = screen.getByLabelText('Use this prompt');
    await userEvent.click(usePromptButton);

    expect(window.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({top: 0}),
    );
  });
});
