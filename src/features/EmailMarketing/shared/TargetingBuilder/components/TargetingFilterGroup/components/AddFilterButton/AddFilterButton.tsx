import Button from '../../../../../../../shared/ui/Button/Button';
import Icon from '../../../../../../../shared/ui/Icon/Icon';
import {IconType} from '../../../../../../../shared/ui/Icon/iconLibrary';
import './AddFilterButton.scss';

interface Props {
  onPress: () => void;
}

const AddFilterButton = ({onPress}: Props) => {
  return (
    <Button label="Add filter button" onClick={onPress}>
      <Icon type={IconType.PlusCircleClear} /> Add filter
    </Button>
  );
};

export default AddFilterButton;
