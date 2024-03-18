import {
  Operand as OperandEnum,
  TargetingFilter as TargetingFilterType,
  TargetingFilterSubject as TargetingFilterSubjectEnum,
} from '../../../../../emailMarketingTypes';

import Operand from '../Operand/Operand';
import TargetingFilterSubject from './components/TargetingFilterSubject/TargetingFilterSubject';
import './TargetingFilter.scss';
import DeleteFilterButton from './components/DeleteFilterButton/DeleteFilterButton';
import {useEmailMarketingState} from '../../../../../../store/useEmailMarketingState';
import {EmailMarketingActionType} from '../../../../../../store/emailMarketingStoreTypes';

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

  const handleSubjectChange = (newValue: TargetingFilterSubjectEnum) => {
    dispatch({
      type: EmailMarketingActionType.SetFilterSubject,
      payload: {
        filterId: targetingFilter.id,
        subject: newValue,
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
        <div className="filter-row-content">
          <TargetingFilterSubject
            value={targetingFilter.subject}
            onChange={handleSubjectChange}
          />
        </div>
        <DeleteFilterButton onPress={() => handleDeleteFilter()} />
      </div>
    </div>
  );
};

export default TargetingFilter;
