import Button from '../../../../../../../../../shared/ui/components/Button/Button';
import Icon from '../../../../../../../../../shared/ui/components/Icon/Icon';
import {IconType} from '../../../../../../../../../shared/ui/components/Icon/iconLibrary';
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
