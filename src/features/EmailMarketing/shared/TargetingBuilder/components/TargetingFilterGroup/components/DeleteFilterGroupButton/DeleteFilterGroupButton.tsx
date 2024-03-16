import Button from '../../../../../../../shared/ui/Button/Button';
import Icon from '../../../../../../../shared/ui/Icon/Icon';
import './DeleteFilterGroupButton.scss';

interface Props {
  onPress: () => void;
}

const DeleteFilterGroupButton = ({onPress}: Props) => {
  return (
    <Button label="Delete filter group button" onClick={onPress}>
      <Icon uri="./src/assets/images/icons/icon_trash.svg" label="Trash icon" />
    </Button>
  );
};

export default DeleteFilterGroupButton;
