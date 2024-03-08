import Button from '../../../shared/ui/Button/Button';
import Icon from '../../../shared/ui/Icon/Icon';
import './TargetingBuilder.scss';

const addFilterGroup = () => {};

const TargetingBuilder = () => {
  return (
    <div
      data-testid="TargetingBuilder"
      className="targeting-builder-header mt-4 mb-2">
      <Button
        onClick={addFilterGroup}
        label="Add Filter Group"
        className="w-full p-3">
        <Icon uri="./src/assets/images/icons/icon_plus-circle-clear.svg" />
        Add Filter Group
      </Button>
    </div>
  );
};

export default TargetingBuilder;
