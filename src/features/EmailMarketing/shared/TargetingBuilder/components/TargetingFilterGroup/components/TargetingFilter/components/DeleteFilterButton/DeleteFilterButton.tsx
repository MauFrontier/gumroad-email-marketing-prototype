import Button from '../../../../../../../../../shared/ui/Button/Button';
import Icon from '../../../../../../../../../shared/ui/Icon/Icon';
import {IconType} from '../../../../../../../../../shared/ui/Icon/iconLibrary';
import './DeleteFilterButton.scss';

interface Props {
  onPress: () => void;
  disabled?: boolean;
}

const DeleteFilterButton = ({onPress, disabled = false}: Props) => {
  return (
    <Button label="Delete filter button" disabled={disabled} onClick={onPress}>
      <Icon type={IconType.Trash} />
    </Button>
  );
};

export default DeleteFilterButton;
