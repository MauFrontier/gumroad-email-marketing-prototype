import Button from '../../../../../../../shared/ui/Button/Button';
import Icon from '../../../../../../../shared/ui/Icon/Icon';
import './AddFilterButton.scss';

interface Props {
  onPress: () => void;
}

const AddFilterButton = ({onPress}: Props) => {
  return (
    <Button label="Add filter button" onClick={onPress}>
      <Icon
        uri="./src/assets/images/icons/icon_plus-circle-clear.svg"
        label="Add icon"
      />{' '}
      Add filter
    </Button>
  );
};

export default AddFilterButton;
