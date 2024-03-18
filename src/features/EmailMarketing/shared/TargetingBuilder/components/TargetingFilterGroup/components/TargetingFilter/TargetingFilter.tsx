import {
  Operand as OperandEnum,
  TargetingFilter as TargetingFilterType,
} from '../../../../../emailMarketingTypes';

import Operand from '../Operand/Operand';
import './TargetingFilter.scss';
import {useEmailMarketingState} from '../../../../../../store/useEmailMarketingState';
import {EmailMarketingActionType} from '../../../../../../store/emailMarketingStoreTypes';
import DeleteFilterButton from './components/DeleteFilterButton/DeleteFilterButton';

type TargetingFilterProps = {
  targetingFilter: TargetingFilterType;
};

const TargetingFilter = ({targetingFilter}: TargetingFilterProps) => {
  const {dispatch} = useEmailMarketingState();

  const handleOperandChange = (newOperand: OperandEnum) => {
    dispatch({
      type: EmailMarketingActionType.SetFilterOperand,
      payload: {
        filterId: targetingFilter.id,
        operand: newOperand,
      },
    });
  };

  const handleDeleteFilter = () => {
    dispatch({
      type: EmailMarketingActionType.DeleteFilter,
      payload: targetingFilter.id,
    });
  };

  return (
    <div aria-label="Filter">
      <div className="filter-row">
        <Operand
          value={targetingFilter.operand || OperandEnum.Initial}
          onChange={handleOperandChange}
        />
        <DeleteFilterButton onPress={() => handleDeleteFilter()} />
      </div>
    </div>
  );
};

export default TargetingFilter;
