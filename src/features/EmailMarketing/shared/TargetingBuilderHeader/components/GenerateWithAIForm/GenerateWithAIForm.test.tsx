import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import GenerateWithAIForm from './GenerateWithAIForm';
import {mockDispatch} from '../../../../../../utils/mocks/mocks';
import {EmailMarketingActionType} from '../../../../store/emailMarketingStoreTypes';
import {renderComponentWithState} from '../../../../store/emailMarketingStoreUtils';
import {emailMarketingInitialState} from '../../../../store/emailMarketingInitialState';
import userEvent from '@testing-library/user-event';

describe('GenerateWithAIForm', () => {
  it('renders component', () => {
    render(<GenerateWithAIForm />);
    expect(
      screen.getByLabelText('Generate with AI dialog'),
    ).toBeInTheDocument();
  });

  it('should focus textArea when opened', () => {
    render(<GenerateWithAIForm visible={true} />);

    const textArea = screen.getByLabelText('Prompt to generate with AI');
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveFocus();
  });

  it('should hide the Generate With AI dialog when pressing ESC', async () => {
    render(<GenerateWithAIForm visible={true} />);

    const textArea = screen.getByLabelText('Prompt to generate with AI');
    textArea.focus();

    expect(textArea).toHaveFocus();

    fireEvent.keyDown(screen.getByLabelText('Prompt to generate with AI'), {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });

    await waitFor(() => {
      //
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

  it('should dispatch SetPrompt textarea value changes', () => {
    render(<GenerateWithAIForm visible={true} />);

    const textArea = screen.getByLabelText('Prompt to generate with AI');
    textArea.focus();

    fireEvent.change(textArea, {target: {value: 'test prompt'}});

    expect(mockDispatch).toHaveBeenCalledWith({
      type: EmailMarketingActionType.SetPrompt,
      payload: 'test prompt',
    });
  });

  it('should send prompt when Enter key is pressed without shift or ctrl', async () => {
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

  it('should send prompt when button is clicked', () => {
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

  it('should not send prompt to ChatGPT when textarea is empty', () => {
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
  });

  it('should set loading to false when received a response from the OpenAI API', async () => {
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

  it('should set errors state when api returned errors', async () => {
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

  it('should set targeting state when api returns success or success with errors', async () => {
    renderComponentWithState(<GenerateWithAIForm visible={true} />, {
      ...emailMarketingInitialState,
      prompt: 'test prompt',
    });

    const button = screen.getByLabelText('Generate with AI button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: EmailMarketingActionType.SetTargeting,
        payload: expect.any(Object),
      });
    });
  });

  //

    const button = screen.getByLabelText('Generate with AI button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(hideDialog).toHaveBeenCalled();
    });
  });

  it('should clear the prompt after a result from the API is received', async () => {
    renderComponentWithState(<GenerateWithAIForm visible={true} />, {
      ...emailMarketingInitialState,
      prompt: 'test prompt',
    });

    const button = screen.getByLabelText('Generate with AI button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SetPrompt',
        payload: '',
      });
    });
  });
});
