import {useEffect, useRef, useState} from 'react';
import {SubmitAIPrompt} from '../../../../../shared/ai/ChatGPTService'; // Adjust the path as necessary
import {useEmailMarketingState} from '../../../../store/useEmailMarketingState';

import './GenerateWithAIForm.scss';
import Button from '../../../../../shared/ui/Button/Button';
import Icon from '../../../../../shared/ui/Icon/Icon';
import {EmailMarketingActionType} from '../../../../store/emailMarketingStoreTypes';
import {IconType} from '../../../../../shared/ui/Icon/iconLibrary';
import {v4 as uuid} from 'uuid';
import {AIResponse} from '../../../emailMarketingTypes';

interface Props {
  isFloatingDialog?: boolean;
  visible?: boolean;
}

const GenerateWithAIForm = ({isFloatingDialog, visible = false}: Props) => {
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

  const hideGenAIDialog = () => {
    dispatch({type: EmailMarketingActionType.ToggleShowGenerateWithAIPanel});
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setShouldHighlightPromptError(false);
    dispatch({
      type: EmailMarketingActionType.SetPrompt,
      payload: event.target.value,
    });
  };

  const resetAIState = () => {
    dispatch({type: EmailMarketingActionType.SetIsAILoading, payload: true});
    dispatch({type: EmailMarketingActionType.SetAIErrors, payload: []});
    dispatch({
      type: EmailMarketingActionType.SetShowAIAccuracyWarning,
      payload: false,
    });
    dispatch({
      type: EmailMarketingActionType.SetVotedAIAccuracyUp,
      payload: false,
    });
    dispatch({
      type: EmailMarketingActionType.SetVotedAIAccuracyDown,
      payload: false,
    });
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
      resetAIState();

      dispatch({
        type: EmailMarketingActionType.SetLatestAIPrompt,
        payload: prompt,
      });

      const apiResponse = await SubmitAIPrompt(prompt);

      if (apiResponse !== null) {
        const parsedResponse: AIResponse = JSON.parse(apiResponse);

        dispatch({
          type: EmailMarketingActionType.SetLatestAIResponse,
          payload: parsedResponse,
        });

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
          const errorWarnings = errors.map((error: string) => ({
            id: uuid(),
            isVisible: true,
            error: error,
          }));

          dispatch({
            type: EmailMarketingActionType.SetAIErrors,
            payload: errorWarnings,
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch from ChatGPT: ', error);

      dispatch({
        type: EmailMarketingActionType.SetLatestAIResponse,
        payload: 'Failed to fetch from ChatGPT: ' + error,
      });
    } finally {
      dispatch({
        type: EmailMarketingActionType.SetShowAIAccuracyWarning,
        payload: true,
      });
      dispatch({type: EmailMarketingActionType.SetIsAILoading, payload: false});
      hideGenAIDialog();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Escape') {
      hideGenAIDialog();
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
            className="dark"
            disabled={isAILoading}>
            {isAILoading ? (
              <img
                src="./src/assets/images/icons/icon_spinner.png"
                alt="Loading..."
                className="spinner"
              />
            ) : (
              <>
                <Icon type={IconType.PlusCircleClear} />
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
