import Button from '../../../../../../../../../shared/ui/Button/Button';
import Icon from '../../../../../../../../../shared/ui/Icon/Icon';
import {IconType} from '../../../../../../../../../shared/ui/Icon/iconLibrary';
import './DeleteFilterButton.scss';

interface Props {
  onPress: () => void;
}

const DeleteFilterButton = ({onPress}: Props) => {
  return (
    <Button label="Delete filter button" onClick={onPress}>
      <Icon type={IconType.Trash} />
    </Button>
  );
};

export default DeleteFilterButton;
