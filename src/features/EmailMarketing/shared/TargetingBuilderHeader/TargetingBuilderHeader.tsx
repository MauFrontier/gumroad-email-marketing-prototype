import {EmailMarketingActionType} from '../../store/emailMarketingStoreTypes';
import {useEmailMarketingState} from '../../store/useEmailMarketingState';
import Button from '../../../shared/ui/Button/Button';
import Icon from '../../../shared/ui/Icon/Icon';
import GenerateWithAIForm from './components/GenerateWithAIForm/GenerateWithAIForm';
import './TargetingBuilderHeader.scss';

const TargetingBuilderHeader = () => {
  const {state, dispatch} = useEmailMarketingState();
  const {showGenerateWithAIPanel} = state;

  const openGenerateWithAIPanel = () => {
    dispatch({type: EmailMarketingActionType.ToggleShowGenerateWithAIPanel});
  };

  const handleHideGenAIDialog = () => {
    dispatch({type: EmailMarketingActionType.ToggleShowGenerateWithAIPanel});
  };

  return (
    <header aria-label="Targeting builder header">
      <div role="toolbar" aria-label="Recipient and AI generation tools">
        <h4>
          Recipients: <strong>102</strong>
        </h4>

        <div className="button-and-floating-dialog-container">
          <Button
            onClick={openGenerateWithAIPanel}
            label="Generate with AI"
            pressed={showGenerateWithAIPanel}
            aria-controls="generateWithAIForm">
            <Icon type={IconType.Ai} size={5} />
            Generate with AI
          </Button>

          {showGenerateWithAIPanel && (
            <GenerateWithAIForm
              isFloatingDialog={true}
              visible={showGenerateWithAIPanel}
              hideDialog={handleHideGenAIDialog}
            />
          )}
        </div>
      </div>

      {showGenerateWithAIPanel && (
        <GenerateWithAIForm
          visible={showGenerateWithAIPanel}
          hideDialog={handleHideGenAIDialog}
        />
      )}
    </header>
  );
};

export default TargetingBuilderHeader;
