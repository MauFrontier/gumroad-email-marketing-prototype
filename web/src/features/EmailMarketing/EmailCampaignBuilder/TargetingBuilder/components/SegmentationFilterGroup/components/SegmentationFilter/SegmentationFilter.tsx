import {
  Operand as OperandEnum,
  SegmentationFilter as SegmentationFilterType,
  SegmentationFilterSubject as SegmentationFilterSubjectEnum,
  SegmentationFilterSubjectQualifier as SegmentationFilterSubjectQualifierEnum,
  SegmentationFilterVerbQualifier as SegmentationFilterVerbQualifierEnum,
  SegmentationFilterVerb as SegmentationFilterVerbEnum,
  SegmentationFilterValueType,
} from '../../../../../emailMarketingTypes';

import Operand from '../Operand/Operand';
import SegmentationFilterSubject from './components/SegmentationFilterSubject/SegmentationFilterSubject';
import SegmentationFilterSubjectQualifier from './components/SegmentationFilterSubjectQualifier/SegmentationFilterSubjectQualifier';
import './SegmentationFilter.scss';
import SegmentationFilterVerb from './components/SegmentationFilterVerb/SegmentationFilterVerb';
import SegmentationFilterVerbQualifier from './components/SegmentationFilterVerbQualifier/SegmentationFilterVerbQualifier';
import DeleteFilterButton from './components/DeleteFilterButton/DeleteFilterButton';
import SegmentationFilterValue from './components/SegmentationFilterValue/SegmentationFilterValue';
import {useEmailMarketingState} from '../../../../../../store/useEmailMarketingState';
import {EmailMarketingActionType} from '../../../../../../store/emailMarketingActionTypes';
import {getDefaultValueForVerb} from '../../../../../emailMarketingDefaults';
import {shouldResetValue} from '../../../../../segmentationUtils';

type SegmentationFilterProps = {
  segmentationFilter: SegmentationFilterType;
  disabled?: boolean;
};

const SegmentationFilter = ({
  segmentationFilter,
  disabled = false,
}: SegmentationFilterProps) => {
  const {dispatch} = useEmailMarketingState();

  const handleOperandChange = (newOperand: OperandEnum) => {
    dispatch({
      type: EmailMarketingActionType.SetFilterOperand,
      payload: {
        filterId: segmentationFilter.id,
        operand: newOperand,
      },
    });
  };

  const handleSubjectChange = (newValue: SegmentationFilterSubjectEnum) => {
    dispatch({
      type: EmailMarketingActionType.SetFilterSubject,
      payload: {
        filterId: segmentationFilter.id,
        subject: newValue,
      },
    });
  };

  const handleSubjectQualifierChange = (
    newValue: SegmentationFilterSubjectQualifierEnum,
  ) => {
    dispatch({
      type: EmailMarketingActionType.SetFilterSubjectQualifier,
      payload: {
        filterId: segmentationFilter.id,
        subjectQualifier: newValue,
      },
    });
  };

  const handleVerbChange = (newVerb: SegmentationFilterVerbEnum) => {
    const oldVerb = segmentationFilter.verb;

    dispatch({
      type: EmailMarketingActionType.SetFilterVerb,
      payload: {
        filterId: segmentationFilter.id,
        verb: newVerb,
      },
    });

    if (shouldResetValue(oldVerb, newVerb)) {
      const newValue = getDefaultValueForVerb(newVerb);
      dispatch({
        type: EmailMarketingActionType.SetFilterValue,
        payload: {
          filterId: segmentationFilter.id,
          value: newValue,
        },
      });
    }
  };

  const handleVerbQualifierChange = (
    newValue: SegmentationFilterVerbQualifierEnum,
  ) => {
    dispatch({
      type: EmailMarketingActionType.SetFilterVerbQualifier,
      payload: {
        filterId: segmentationFilter.id,
        verbQualifier: newValue,
      },
    });
  };

  const handleValueChange = (newValue: SegmentationFilterValueType) => {
    dispatch({
      type: EmailMarketingActionType.SetFilterValue,
      payload: {
        filterId: segmentationFilter.id,
        value: newValue,
      },
    });
  };

  const handleDeleteFilter = () => {
    dispatch({
      type: EmailMarketingActionType.DeleteFilter,
      payload: segmentationFilter.id,
    });
  };

  return (
    <div aria-label="Filter">
      <div className="filter-row">
        <Operand
          value={segmentationFilter.operand || OperandEnum.Initial}
          onChange={handleOperandChange}
          label="Filter operand"
          disabled={disabled}
        />
        <div className="filter-row-content">
          <SegmentationFilterSubject
            value={segmentationFilter.subject}
            onChange={handleSubjectChange}
            disabled={disabled}
          />
          {'subjectQualifier' in segmentationFilter && (
            <SegmentationFilterSubjectQualifier
              subject={segmentationFilter.subject}
              onChange={handleSubjectQualifierChange}
              value={segmentationFilter.subjectQualifier}
              disabled={disabled}
            />
          )}
          <SegmentationFilterVerb
            subject={segmentationFilter.subject}
            value={segmentationFilter.verb}
            onChange={handleVerbChange}
            disabled={disabled}
          />
          {'verbQualifier' in segmentationFilter && (
            <SegmentationFilterVerbQualifier
              subject={segmentationFilter.subject}
              onChange={handleVerbQualifierChange}
              value={segmentationFilter.verbQualifier}
              disabled={disabled}
            />
          )}
          <SegmentationFilterValue
            subject={segmentationFilter.subject}
            verb={segmentationFilter.verb}
            value={segmentationFilter.value}
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

export default SegmentationFilter;
