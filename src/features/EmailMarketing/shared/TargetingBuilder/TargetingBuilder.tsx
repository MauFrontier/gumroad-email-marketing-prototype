import Button from '../../../shared/ui/Button/Button';
import './TargetingBuilder.scss';
import PlusCircleIcon from '@/assets/images/icons/icon_plus-circle-clear.svg?react';
import TargetingFilterGroup from './components/TargetingFilterGroup/TargetingFilterGroup';

const addFilterGroup = () => {};

const TargetingBuilder = () => {
  return (
    <div data-testid="TargetingBuilder" className="targeting-builder mt-4 mb-2">
      <TargetingFilterGroup />
      <Button
        onClick={addFilterGroup}
        label="Add Filter Group"
        className="w-full p-3">
        <PlusCircleIcon className="plus-circle-icon" />
        Add Filter Group
      </Button>
    </div>
  );
};

export default TargetingBuilder;
