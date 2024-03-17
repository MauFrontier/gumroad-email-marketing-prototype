import Button from '../../../../../../../../../shared/ui/Button/Button';
import Icon from '../../../../../../../../../shared/ui/Icon/Icon';
import './DeleteFilterButton.scss';

interface Props {
  onPress: () => void;
}

const DeleteFilterButton = ({onPress}: Props) => {
  return (
    <Button label="Delete filter button" onClick={onPress}>
      <Icon
        uri="./src/assets/images/icons/icon_trash.svg"
        label="Delete icon"
      />
    </Button>
  );
};

export default DeleteFilterButton;
