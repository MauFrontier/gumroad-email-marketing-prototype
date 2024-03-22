import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import GenerateWithAIForm from './GenerateWithAIForm';
import {mockDispatch} from '../../../../../../../../utils/mocks/mocks';
import {EmailMarketingActionType} from '../../../../../../store/emailMarketingActionTypes';
import {renderComponentWithState} from '../../../../../../store/emailMarketingStoreUtils';
import {emailMarketingInitialState} from '../../../../../../store/emailMarketingInitialState';
import userEvent from '@testing-library/user-event';

describe('GenerateWithAIForm', () => {
  it('renders component', () => {
    render(<GenerateWithAIForm />);
    expect(
      screen.getByLabelText('Generate with AI dialog'),
    ).toBeInTheDocument();
  });

  it('should reflect that this is a floating dialog if the isFloatingDialog prop is true', async () => {
    renderComponentWithState(
      <GenerateWithAIForm visible={true} isFloatingDialog={true} />,
      {
        ...emailMarketingInitialState,
        prompt: 'test prompt',
      },
    );

    const dialog = screen.getByLabelText('Generate with AI dialog');

    expect(dialog).toHaveClass('floating-dialog');
  });

  it('should focus textArea when opened', () => {
    render(<GenerateWithAIForm visible={true} />);

    const textArea = screen.getByLabelText('Prompt to generate with AI');
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveFocus();
  });

  it('should hide the Generate With AI dialog when pressing the Escape (Esc) key', async () => {
    render(<GenerateWithAIForm visible={true} />);

    const textArea = screen.getByLabelText('Prompt to generate with AI');
    textArea.focus();

    expect(textArea).toHaveFocus();

    await fireEvent.keyDown(textArea, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.ToggleShowGenerateWithAIPanel,
    });
  });

  it('should hide dialog after a result from the API is received', async () => {
    renderComponentWithState(<GenerateWithAIForm visible={true} />, {
      ...emailMarketingInitialState,
      prompt: 'test prompt',
    });

    const button = screen.getByLabelText('Generate with AI button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: EmailMarketingActionType.ToggleShowGenerateWithAIPanel,
      });
    });
  });

  it('should set the prompt in state when the textarea value changes', async () => {
    const existingPrompt = 'test prompt';

    renderComponentWithState(<GenerateWithAIForm visible={true} />, {
      ...emailMarketingInitialState,
      prompt: existingPrompt,
    });

    const textArea = screen.getByLabelText('Prompt to generate with AI');
    textArea.focus();

    await userEvent.type(textArea, 'X');

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: EmailMarketingActionType.SetPrompt,
        payload: existingPrompt + 'X',
      });
    });
  });

  it('should submit the prompt when the Enter key is pressed', async () => {
    renderComponentWithState(<GenerateWithAIForm visible={true} />, {
      ...emailMarketingInitialState,
      prompt: 'test prompt',
    });

    const textArea = screen.getByLabelText('Prompt to generate with AI');
    await textArea.focus();

    await fireEvent.keyDown(textArea, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetIsAILoading,
      payload: true,
    });
  });

  it('should submit the prompt when the Generate with AI button is clicked', () => {
    renderComponentWithState(<GenerateWithAIForm visible={true} />, {
      ...emailMarketingInitialState,
      prompt: 'test prompt',
    });

    const button = screen.getByLabelText('Generate with AI button');

    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetIsAILoading,
      payload: true,
    });
  });

  it('should not submit the prompt if the textarea is empty, and it should highlight the error', () => {
    renderComponentWithState(<GenerateWithAIForm visible={true} />, {
      ...emailMarketingInitialState,
      prompt: '',
    });

    const button = screen.getByLabelText('Generate with AI button');

    fireEvent.click(button);

    expect(mockDispatch).not.toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetIsAILoading,
      payload: true,
    });

    const textArea = screen.getByLabelText('Prompt to generate with AI');
    expect(textArea).toHaveClass('error');
  });

  it('should remove error highlight from textarea when we type into it', async () => {
    renderComponentWithState(<GenerateWithAIForm visible={true} />, {
      ...emailMarketingInitialState,
      prompt: '',
    });

    const button = screen.getByLabelText('Generate with AI button');
    const textArea = screen.getByLabelText('Prompt to generate with AI');

    fireEvent.click(button);

    expect(textArea).toHaveClass('error');

    textArea.focus();

    await userEvent.type(textArea, 'X');

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: EmailMarketingActionType.SetPrompt,
        payload: 'X',
      });
    });

    expect(textArea).not.toHaveClass('error');
  });

  it('should set loading to false when we receive a response from the OpenAI API', async () => {
    renderComponentWithState(<GenerateWithAIForm visible={true} />, {
      ...emailMarketingInitialState,
      prompt: 'test prompt',
    });

    const button = screen.getByLabelText('Generate with AI button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: EmailMarketingActionType.SetIsAILoading,
        payload: false,
      });
    });
  });

  it('should set loading to true when we submit the prompt', async () => {
    renderComponentWithState(<GenerateWithAIForm visible={true} />, {
      ...emailMarketingInitialState,
      prompt: 'test prompt',
    });

    const button = screen.getByLabelText('Generate with AI button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: EmailMarketingActionType.SetIsAILoading,
        payload: true,
      });
    });
  });

  it('should set targeting state when api returns success or success with errors', async () => {
    renderComponentWithState(<GenerateWithAIForm visible={true} />, {
      ...emailMarketingInitialState,
      prompt: 'test prompt',
    });

    const button = screen.getByLabelText('Generate with AI button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: EmailMarketingActionType.SetSegmentation,
        payload: expect.any(Object),
      });
    });
  });

  it('should show the AI accuracy warning after a result from the API is received', async () => {
    renderComponentWithState(<GenerateWithAIForm visible={true} />, {
      ...emailMarketingInitialState,
      prompt: 'test prompt',
    });

    const button = screen.getByLabelText('Generate with AI button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(
        expect(mockDispatch).toHaveBeenCalledWith({
          type: EmailMarketingActionType.SetShowAIAccuracyWarning,
          payload: true,
        }),
      );
    });
  });

  it('should hide the AI accuracy warning after clicking on the Generate with AI button', async () => {
    renderComponentWithState(<GenerateWithAIForm visible={true} />, {
      ...emailMarketingInitialState,
      prompt: 'test prompt',
    });

    const button = screen.getByLabelText('Generate with AI button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: EmailMarketingActionType.SetShowAIAccuracyWarning,
        payload: false,
      });
    });
  });

  it('should reset AI accuracy votes to false when clicking on the Generate with AI button', async () => {
    renderComponentWithState(<GenerateWithAIForm visible={true} />, {
      ...emailMarketingInitialState,
      prompt: 'test prompt',
      showAIAccuracyWarning: true,
    });

    const button = screen.getByLabelText('Generate with AI button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: EmailMarketingActionType.SetVotedAIAccuracyDown,
        payload: false,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: EmailMarketingActionType.SetVotedAIAccuracyUp,
        payload: false,
      });
    });
  });

  it('should reset errors in state when we submit the prompt', async () => {
    renderComponentWithState(<GenerateWithAIForm visible={true} />, {
      ...emailMarketingInitialState,
      prompt: 'test prompt',
    });

    const button = screen.getByLabelText('Generate with AI button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: EmailMarketingActionType.SetAIErrors,
        payload: expect.any(Object),
      });
    });
  });

  it('should set errors in state when api returns any errors, and they should default to visible', async () => {
    renderComponentWithState(<GenerateWithAIForm visible={true} />, {
      ...emailMarketingInitialState,
      prompt: 'test prompt yielding errors',
    });

    const button = screen.getByLabelText('Generate with AI button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: EmailMarketingActionType.SetAIErrors,
        payload: [
          {
            id: expect.any(String),
            isVisible: true,
            error: expect.any(String),
          },
        ],
      });
    });
  });

  it('should set latest AI prompt when we submit the prompt', async () => {
    renderComponentWithState(<GenerateWithAIForm visible={true} />, {
      ...emailMarketingInitialState,
      prompt: 'test prompt',
    });

    const button = screen.getByLabelText('Generate with AI button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: EmailMarketingActionType.SetLatestAIPrompt,
        payload: 'test prompt',
      });
    });
  });

  it('should set latest AI response after we receive a response from the API', async () => {
    renderComponentWithState(<GenerateWithAIForm visible={true} />, {
      ...emailMarketingInitialState,
      prompt: 'test prompt',
    });

    const button = screen.getByLabelText('Generate with AI button');

    await fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: EmailMarketingActionType.SetLatestAIResponse,
        payload: expect.any(Object), //mock data returns a successful object result
      });
    });
  });
});
