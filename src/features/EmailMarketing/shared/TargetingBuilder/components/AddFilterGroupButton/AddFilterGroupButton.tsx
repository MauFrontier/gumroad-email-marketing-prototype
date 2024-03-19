import Button from '../../../../../shared/ui/Button/Button';
import './AddFilterGroupButton.scss';
import Icon from '../../../../../shared/ui/Icon/Icon';
import {IconType} from '../../../../../shared/ui/Icon/iconLibrary';

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
      <Icon type={IconType.PlusCircleClear} />
      Add Filter Group
    </Button>
  );
};

export default AddFilterGroupButton;
