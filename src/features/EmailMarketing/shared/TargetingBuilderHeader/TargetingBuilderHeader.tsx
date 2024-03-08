import Button from '../../../shared/ui/Button/Button';
import './TargetingBuilderHeader.scss';

const openGenerateWithAIPanel = () => {};

const TargetingBuilderHeader = () => {
  return (
    <div
      data-testid="TargetingBuilderHeader"
      className="targeting-builder-header mt-4 mb-2">
      <p>
        Recipients: <strong>102</strong>
      </p>
      <Button onClick={openGenerateWithAIPanel} label="Generate with AI">
        Generate with AI
      </Button>
    </div>
  );
};

export default TargetingBuilderHeader;
