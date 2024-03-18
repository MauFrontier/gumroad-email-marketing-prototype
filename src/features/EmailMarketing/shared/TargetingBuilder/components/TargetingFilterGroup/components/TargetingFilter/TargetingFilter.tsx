import {
  Operand as OperandEnum,
  TargetingFilter as TargetingFilterType,
  TargetingFilterSubject as TargetingFilterSubjectEnum,
  TargetingFilterSubjectQualifier as TargetingFilterSubjectQualifierEnum,
} from '../../../../../emailMarketingTypes';

import Operand from '../Operand/Operand';
import TargetingFilterSubject from './components/TargetingFilterSubject/TargetingFilterSubject';
import TargetingFilterSubjectQualifier from './components/TargetingFilterSubjectQualifier/TargetingFilterSubjectQualifier';
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

  const handleSubjectQualifierChange = (
    newValue: TargetingFilterSubjectQualifierEnum,
  ) => {
    dispatch({
      type: EmailMarketingActionType.SetFilterSubjectQualifier,
      payload: {
        filterId: targetingFilter.id,
        subjectQualifier: newValue,
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
          {'subjectQualifier' in targetingFilter && (
            <TargetingFilterSubjectQualifier
              subject={targetingFilter.subject}
              onChange={handleSubjectQualifierChange}
              value={targetingFilter.subjectQualifier}
            />
          )}
        </div>
        <DeleteFilterButton onPress={() => handleDeleteFilter()} />
      </div>
    </div>
  );
};

export default TargetingFilter;
