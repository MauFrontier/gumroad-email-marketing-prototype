import Button from '../../../../../../../shared/ui/Button/Button';
import Icon from '../../../../../../../shared/ui/Icon/Icon';
import {IconType} from '../../../../../../../shared/ui/Icon/iconLibrary';
import './DeleteFilterGroupButton.scss';

interface Props {
  onPress: () => void;
}

const DeleteFilterGroupButton = ({onPress}: Props) => {
  return (
    <Button label="Delete filter group button" onClick={onPress}>
      <Icon type={IconType.Trash} />
    </Button>
  );
};

export default DeleteFilterGroupButton;
