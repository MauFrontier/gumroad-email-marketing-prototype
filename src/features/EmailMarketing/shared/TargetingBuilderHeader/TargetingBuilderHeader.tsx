import Button from '../../../shared/ui/Button/Button';
import Icon from '../../../shared/ui/Icon/Icon';
import './TargetingBuilderHeader.scss';

const TargetingBuilderHeader = () => {
  const openGenerateWithAIPanel = () => {};

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
            aria-controls="generateWithAIForm">
            <Icon uri="./src/assets/images/icons/icon_ai.svg" />
            Generate with AI
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TargetingBuilderHeader;
