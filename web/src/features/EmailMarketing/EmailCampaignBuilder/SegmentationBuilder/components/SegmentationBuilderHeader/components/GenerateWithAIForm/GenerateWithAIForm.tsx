import {useEffect, useRef, useState} from 'react';
import {useEmailMarketingState} from '../../../../../../store/useEmailMarketingState';

import './GenerateWithAIForm.scss';
import Button from '../../../../../../../shared/ui/components/Button/Button';
import Icon from '../../../../../../../shared/ui/components/Icon/Icon';
import {EmailMarketingActionType} from '../../../../../../store/emailMarketingActionTypes';
import {IconType} from '../../../../../../../shared/ui/components/Icon/iconLibrary';
import {v4 as uuid} from 'uuid';
import {generateSegmentationAPIRequest} from '../../../../../../api/ai/ChatGPT';

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

      const apiResponse = await generateSegmentationAPIRequest(
        prompt,
        JSON.stringify(state.products),
      );

      if (apiResponse !== null) {
        dispatch({
          type: EmailMarketingActionType.SetLatestAIResponse,
          payload: apiResponse,
        });

        const result = apiResponse.result;
        const payload = apiResponse.payload;
        const errors = apiResponse.errors;

        if (result === 'success' || result === 'success with errors') {
          dispatch({
            type: EmailMarketingActionType.SetSegmentation,
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

      //Alerts suck, but I've worked enough on this demo, and I want a clear visual error
      //This is merely an escape hatch. ChatGPT goes down at times..
      alert('Failed to fetch from ChatGPT. ' + error);

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
            Describe your segmentation to generate with AI
          </legend>
          <textarea
            value={prompt}
            ref={textareaRef}
            aria-label="Prompt to generate with AI"
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            className={shouldHighlightPromptError ? 'error' : ''}
            disabled={isAILoading}
            placeholder="Describe the segmentation in your own words..."></textarea>
          <Button
            onClick={handleSendPrompt}
            label="Generate with AI button"
            className="dark"
            disabled={isAILoading}>
            {isAILoading ? (
              <img
                src="/assets/images/icons/icon_spinner.png"
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
