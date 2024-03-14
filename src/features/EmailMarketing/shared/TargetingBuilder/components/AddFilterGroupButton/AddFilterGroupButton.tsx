import Button from '../../../../../shared/ui/Button/Button';
import PlusCircleIcon from '@/assets/images/icons/icon_plus-circle-clear.svg?react';
import './AddFilterGroupButton.scss';

interface Props {
  onPress: () => void;
}

const AddFilterGroupButton = ({onPress}: Props) => {
  return (
    <Button onClick={onPress} label="Add filter group button">
      <PlusCircleIcon className="plus-circle-icon" aria-hidden="true" />
      Add Filter Group
    </Button>
  );
};

export default AddFilterGroupButton;
