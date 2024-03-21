import Button from '../../../../../../../shared/ui/components/Button/Button';
import Icon from '../../../../../../../shared/ui/components/Icon/Icon';
import {IconType} from '../../../../../../../shared/ui/components/Icon/iconLibrary';
import './DeleteFilterGroupButton.scss';

interface Props {
  onPress: () => void;
  disabled?: boolean;
}

const DeleteFilterGroupButton = ({onPress, disabled}: Props) => {
  return (
    <Button
      disabled={disabled}
      label="Delete filter group button"
      onClick={onPress}>
      <Icon type={IconType.Trash} />
    </Button>
  );
};

export default DeleteFilterGroupButton;
