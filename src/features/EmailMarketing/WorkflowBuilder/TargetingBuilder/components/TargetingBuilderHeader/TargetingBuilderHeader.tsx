import {EmailMarketingActionType} from '../../../../store/emailMarketingActionTypes';
import {useEmailMarketingState} from '../../../../store/useEmailMarketingState';
import Button from '../../../../../shared/ui/components/Button/Button';
import Icon from '../../../../../shared/ui/components/Icon/Icon';
import GenerateWithAIForm from './components/GenerateWithAIForm/GenerateWithAIForm';
import './TargetingBuilderHeader.scss';
import {IconType} from '../../../../../shared/ui/components/Icon/iconLibrary';
import {useEffect, useState} from 'react';
import {Targeting} from '../../../emailMarketingTypes';

const TargetingBuilderHeader = () => {
  const {state, dispatch} = useEmailMarketingState();
  const {showGenerateWithAIPanel} = state;

  const generateFakeRecipientCount = (
    targeting: Targeting,
    totalSubscribers: number,
  ) => {
    let currentCount = totalSubscribers;

    targeting.filterGroups.forEach(filterGroup => {
      for (let i = 0; i < filterGroup.filters.length; i++) {
        currentCount = currentCount - Math.floor(currentCount / 4);
      }
    });

    if (currentCount === totalSubscribers) {
      return currentCount;
    }

    return Math.min(
      (currentCount += Math.floor(Math.random() * 100 - 50)),
      totalSubscribers,
    );
  };

  const subscribers = 5000;

  const [recipientCount, setRecipientCount] = useState(() =>
    generateFakeRecipientCount(state.targeting, subscribers),
  );

  useEffect(() => {
    const newCount = generateFakeRecipientCount(state.targeting, subscribers);
    setRecipientCount(newCount);
  }, [state.targeting, subscribers]);

  const openGenerateWithAIPanel = () => {
    dispatch({type: EmailMarketingActionType.ToggleShowGenerateWithAIPanel});
  };

  return (
    <header aria-label="Targeting builder header">
      <div role="toolbar" aria-label="Recipient and AI generation tools">
        <h4>
          Recipients:{' '}
          <span aria-label="Number of recipients">{recipientCount}</span>
        </h4>

        <div className="button-and-floating-dialog-container">
          <Button
            onClick={openGenerateWithAIPanel}
            label="Generate with AI"
            disabled={state.isAILoading}
            pressed={showGenerateWithAIPanel}
            aria-controls="generateWithAIForm">
            <Icon type={IconType.Ai} size={5} />
            Generate with AI
          </Button>

          {showGenerateWithAIPanel && (
            <GenerateWithAIForm
              isFloatingDialog={true}
              visible={showGenerateWithAIPanel}
            />
          )}
        </div>
      </div>

      {showGenerateWithAIPanel && (
        <GenerateWithAIForm visible={showGenerateWithAIPanel} />
      )}
    </header>
  );
};

export default TargetingBuilderHeader;
