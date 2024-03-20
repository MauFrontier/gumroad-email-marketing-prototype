import {useEffect, useRef, useState} from 'react';
import {SubmitAIPrompt} from '../../../../../shared/ai/ChatGPTService'; // Adjust the path as necessary
import {useEmailMarketingState} from '../../../../store/useEmailMarketingState';

import PlusCircleIcon from '@/assets/images/icons/icon_ai.svg?react';

import './GenerateWithAIForm.scss';
import Button from '../../../../../shared/ui/Button/Button';
import Icon from '../../../../../shared/ui/Icon/Icon';
import {EmailMarketingActionType} from '../../../../store/emailMarketingStoreTypes';

interface Props {
  isFloatingDialog?: boolean;
  hideDialog?: () => void;
  visible?: boolean;
}

const GenerateWithAIForm = ({
  isFloatingDialog,
  hideDialog,
  visible = false,
}: Props) => {
  const {state, dispatch} = useEmailMarketingState();

  const [shouldHighlightPromptError, setShouldHighlightPromptError] =
    useState(false);

  const prompt = state.prompt;
  const isAILoading = state.isAILoading;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const focusTextArea = () => {
    if (textareaRef.current !== null) {
      textareaRef.current.focus();
    }
  };

  useEffect(() => {
    if (visible) {
      focusTextArea();
    }
  }, [visible]);

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setShouldHighlightPromptError(false);
    dispatch({
      type: EmailMarketingActionType.SetPrompt,
      payload: event.target.value,
    });
  };

  const clearPrompt = () => {
    dispatch({type: EmailMarketingActionType.SetPrompt, payload: ''});
  };

  const handleSendPrompt = async () => {
    if (isAILoading) {
      return;
    }

    if (prompt === '') {
      setShouldHighlightPromptError(true);
      return;
    }

    try {
      dispatch({type: EmailMarketingActionType.SetIsAILoading, payload: true});

      const apiResponse = await SubmitAIPrompt(prompt);

      if (apiResponse !== null) {
        const parsedResponse = JSON.parse(apiResponse);

        const result = parsedResponse.result;
        const payload = parsedResponse.payload;
        const errors = parsedResponse.errors;

        if (result === 'success' || result === 'success with errors') {
          dispatch({
            type: EmailMarketingActionType.SetTargeting,
            payload: payload,
          });
        } else {
          console.error('AI request failed - errors:', errors);
        }

        if (errors) {
          dispatch({
            type: EmailMarketingActionType.SetAIErrors,
            payload: errors,
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch from ChatGPT:', error);
    } finally {
      dispatch({type: EmailMarketingActionType.SetIsAILoading, payload: false});
      clearPrompt();
      hideDialog && hideDialog();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Escape') {
      hideDialog && hideDialog();
    } else if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
      event.preventDefault();
      handleSendPrompt();
    }
  };

  return (
    <section
      className={isFloatingDialog ? 'floating-dialog' : ''}
      aria-label="Generate with AI dialog"
      aria-expanded={visible}>
      <div role="dialog">
        <fieldset>
          <legend className="visually-hidden">
            Describe your targeting to generate with AI
          </legend>
          <textarea
            id="targeting-prompt"
            value={prompt}
            ref={textareaRef}
            aria-label="Prompt to generate with AI"
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            className={shouldHighlightPromptError ? 'error' : ''}
            disabled={isAILoading}
            placeholder="Describe the targeting in your own words..."></textarea>
          <Button
            onClick={handleSendPrompt}
            label="Generate with AI button"
            disabled={isAILoading}>
            {isAILoading ? (
              <Icon
                uri="./src/assets/images/icons/icon_spinner.png"
                label="Loading..."
                className="spinner"
              />
            ) : (
              <>
                <PlusCircleIcon
                  className="generate-with-ai-icon"
                  aria-hidden="true"
                />
                Generate with AI
              </>
            )}
          </Button>
        </fieldset>
      </div>
    </section>
  );
};

export default GenerateWithAIForm;
