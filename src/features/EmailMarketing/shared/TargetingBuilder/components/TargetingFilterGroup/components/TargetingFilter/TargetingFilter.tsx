import {
  Operand as OperandEnum,
  TargetingFilter as TargetingFilterType,
  TargetingFilterSubject as TargetingFilterSubjectEnum,
  TargetingFilterSubjectQualifier as TargetingFilterSubjectQualifierEnum,
  TargetingFilterVerbQualifier as TargetingFilterVerbQualifierEnum,
  TargetingFilterVerb as TargetingFilterVerbEnum,
  TargetingFilterValueType,
} from '../../../../../emailMarketingTypes';

import Operand from '../Operand/Operand';
import TargetingFilterSubject from './components/TargetingFilterSubject/TargetingFilterSubject';
import TargetingFilterSubjectQualifier from './components/TargetingFilterSubjectQualifier/TargetingFilterSubjectQualifier';
import './TargetingFilter.scss';
import TargetingFilterVerb from './components/TargetingFilterVerb/TargetingFilterVerb';
import TargetingFilterVerbQualifier from './components/TargetingFilterVerbQualifier/TargetingFilterVerbQualifier';
import DeleteFilterButton from './components/DeleteFilterButton/DeleteFilterButton';
import TargetingFilterValue from './components/TargetingFilterValue/TargetingFilterValue';
import {useEmailMarketingState} from '../../../../../../store/useEmailMarketingState';
import {EmailMarketingActionType} from '../../../../../../store/emailMarketingStoreTypes';
import {getDefaultValueForVerb} from '../../../../../emailMarketingDefaults';
import {shouldResetValue} from '../../../../../targetingUtils';

type TargetingFilterProps = {
  targetingFilter: TargetingFilterType;
  disabled?: boolean;
};

const TargetingFilter = ({
  targetingFilter,
  disabled = false,
}: TargetingFilterProps) => {
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

  const handleVerbChange = (newVerb: TargetingFilterVerbEnum) => {
    const oldVerb = targetingFilter.verb;

    dispatch({
      type: EmailMarketingActionType.SetFilterVerb,
      payload: {
        filterId: targetingFilter.id,
        verb: newVerb,
      },
    });

    if (shouldResetValue(oldVerb, newVerb)) {
      const newValue = getDefaultValueForVerb(newVerb);
      dispatch({
        type: EmailMarketingActionType.SetFilterValue,
        payload: {
          filterId: targetingFilter.id,
          value: newValue,
        },
      });
    }
  };

  const handleVerbQualifierChange = (
    newValue: TargetingFilterVerbQualifierEnum,
  ) => {
    dispatch({
      type: EmailMarketingActionType.SetFilterVerbQualifier,
      payload: {
        filterId: targetingFilter.id,
        verbQualifier: newValue,
      },
    });
  };

  const handleValueChange = (newValue: TargetingFilterValueType) => {
    dispatch({
      type: EmailMarketingActionType.SetFilterValue,
      payload: {
        filterId: targetingFilter.id,
        value: newValue,
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
          label="Filter operand"
          disabled={disabled}
        />
        <div className="filter-row-content">
          <TargetingFilterSubject
            value={targetingFilter.subject}
            onChange={handleSubjectChange}
            disabled={disabled}
          />
          {'subjectQualifier' in targetingFilter && (
            <TargetingFilterSubjectQualifier
              subject={targetingFilter.subject}
              onChange={handleSubjectQualifierChange}
              value={targetingFilter.subjectQualifier}
              disabled={disabled}
            />
          )}
          <TargetingFilterVerb
            subject={targetingFilter.subject}
            value={targetingFilter.verb}
            onChange={handleVerbChange}
            disabled={disabled}
          />
          {'verbQualifier' in targetingFilter && (
            <TargetingFilterVerbQualifier
              subject={targetingFilter.subject}
              onChange={handleVerbQualifierChange}
              value={targetingFilter.verbQualifier}
              disabled={disabled}
            />
          )}
          <TargetingFilterValue
            subject={targetingFilter.subject}
            verb={targetingFilter.verb}
            value={targetingFilter.value}
            onChange={handleValueChange}
            disabled={disabled}
          />
        </div>
        <DeleteFilterButton
          onPress={() => handleDeleteFilter()}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default TargetingFilter;
