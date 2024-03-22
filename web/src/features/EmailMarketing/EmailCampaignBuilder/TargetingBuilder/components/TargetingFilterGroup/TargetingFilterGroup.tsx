import {
  SegmentationFilterGroup as TargetingFilterGroupType,
  Operand as OperandEnum,
} from '../../../emailMarketingTypes';
import AddFilterButton from './components/AddFilterButton/AddFilterButton';
import SegmentationFilter from './components/SegmentationFilter/SegmentationFilter';
import Operand from './components/Operand/Operand';
import './TargetingFilterGroup.scss';
import {useEmailMarketingState} from '../../../../store/useEmailMarketingState';
import {v4 as uuid} from 'uuid';
import DeleteFilterGroupButton from './components/DeleteFilterGroupButton/DeleteFilterGroupButton';
import {EmailMarketingActionType} from '../../../../store/emailMarketingActionTypes';
import {defaultFilter} from '../../../emailMarketingDefaults';

type Props = {
  targetingFilterGroup: TargetingFilterGroupType;
  disabled?: boolean;
};

const TargetingFilterGroup = ({
  targetingFilterGroup,
  disabled = false,
}: Props) => {
  const {dispatch} = useEmailMarketingState();

  const operand = targetingFilterGroup.operand;

  const handleAddFilter = (filterGroupId: string) => {
    const newFilter = {...defaultFilter, id: uuid()};

    if (targetingFilterGroup.filters.length === 0) {
      delete newFilter.operand;
    }

    dispatch({
      type: EmailMarketingActionType.AddFilter,
      payload: {
        filterGroupId,
        filter: newFilter,
      },
    });
  };

  const handleOperandChange = (newOperand: OperandEnum) => {
    dispatch({
      type: EmailMarketingActionType.SetFilterGroupOperand,
      payload: {
        filterGroupId: targetingFilterGroup.id,
        operand: newOperand,
      },
    });
  };

  const handleDeleteFilterGroup = () => {
    dispatch({
      type: EmailMarketingActionType.DeleteFilterGroup,
      payload: targetingFilterGroup.id,
    });
  };

  return (
    <div aria-label="Filter group">
      {operand && operand !== OperandEnum.Initial && (
        <div role="toolbar">
          <Operand
            disabled={disabled}
            value={operand}
            label="Filter group operand"
            onChange={handleOperandChange}
          />
          <DeleteFilterGroupButton
            disabled={disabled}
            onPress={handleDeleteFilterGroup}
          />
        </div>
      )}
      <div aria-label="Filter group filters">
        {targetingFilterGroup.filters.map((filter, index) => (
          <div key={index}>
            <SegmentationFilter
              disabled={disabled}
              segmentationFilter={filter}
            />
          </div>
        ))}
        <AddFilterButton
          disabled={disabled}
          onPress={() => handleAddFilter(targetingFilterGroup.id)}
        />
      </div>
    </div>
  );
};

export default TargetingFilterGroup;
