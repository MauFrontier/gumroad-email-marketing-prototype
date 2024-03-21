import Button from '../../../../../../../shared/ui/components/Button/Button';
import Icon from '../../../../../../../shared/ui/components/Icon/Icon';
import {IconType} from '../../../../../../../shared/ui/components/Icon/iconLibrary';
import './AddFilterButton.scss';

interface Props {
  onPress: () => void;
  disabled?: boolean;
}

const AddFilterButton = ({onPress, disabled}: Props) => {
  return (
    <Button disabled={disabled} label="Add filter button" onClick={onPress}>
      <Icon type={IconType.PlusCircleClear} /> Add filter
    </Button>
  );
};

export default AddFilterButton;
