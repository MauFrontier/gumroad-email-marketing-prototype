import Button from '../../../shared/ui/Button/Button';
import Icon from '../../../shared/ui/Icon/Icon';
import './TargetingBuilderHeader.scss';

const openGenerateWithAIPanel = () => {};

const TargetingBuilderHeader = () => {
  return (
    <div
      data-testid="TargetingBuilderHeader"
      className="targeting-builder-header mt-4 mb-2">
      <p className="m-0">
        Recipients: <strong>102</strong>
      </p>
      <Button
        onClick={openGenerateWithAIPanel}
        label="Generate with AI"
        className="p-3">
        <Icon uri="./src/assets/images/icons/icon_ai.svg" />
        Generate with AI
      </Button>
    </div>
  );
};

export default TargetingBuilderHeader;
