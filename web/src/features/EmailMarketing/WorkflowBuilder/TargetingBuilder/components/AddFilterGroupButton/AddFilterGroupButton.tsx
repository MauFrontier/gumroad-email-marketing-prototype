import Button from '../../../../../shared/ui/components/Button/Button';
import './AddFilterGroupButton.scss';
import Icon from '../../../../../shared/ui/components/Icon/Icon';
import {IconType} from '../../../../../shared/ui/components/Icon/iconLibrary';

interface Props {
  onPress: () => void;
  disabled?: boolean;
}

const AddFilterGroupButton = ({onPress, disabled = false}: Props) => {
  return (
    <Button
      disabled={disabled || false}
      onClick={onPress}
      label="Add filter group button">
      <Icon type={IconType.PlusCircleClear} size={7} />
      Add Filter Group
    </Button>
  );
};

export default AddFilterGroupButton;
