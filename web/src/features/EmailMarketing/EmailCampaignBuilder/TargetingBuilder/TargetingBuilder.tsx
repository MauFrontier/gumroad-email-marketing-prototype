import './TargetingBuilder.scss';
import TargetingFilterGroup from './components/TargetingFilterGroup/TargetingFilterGroup';
import {useEmailMarketingState} from '../../store/useEmailMarketingState';
import {defaultFilterGroup} from '../emailMarketingDefaults';
import {v4 as uuid} from 'uuid';
import {EmailMarketingActionType} from '../../store/emailMarketingActionTypes';
import SegmentationBuilderHeader from './components/SegmentationBuilderHeader/SegmentationBuilderHeader';
import AddFilterGroupButton from './components/AddFilterGroupButton/AddFilterGroupButton';
import AIAccuracyWarning from './components/SegmentationBuilderHeader/components/AIAccuracyWarning/AIAccuracyWarning';
import AIErrorWarnings from './components/SegmentationBuilderHeader/components/AIErrorWarnings/AIErrorWarnings';

const TargetingBuilder = () => {
  const {state, dispatch} = useEmailMarketingState();
  const {segmentation: targeting} = state;

  const handleAddFilterGroup = () => {
    const newFilterGroup = {...defaultFilterGroup};

    newFilterGroup.id = uuid();

    dispatch({
      type: EmailMarketingActionType.AddFilterGroup,
      payload: newFilterGroup,
    });
  };

  const aiErrors = state.aiErrors;
  const showAIAccuracyWarning = state.showAIAccuracyWarning;

  return (
    <>
      <section role="region" aria-label="Targeting builder">
        <SegmentationBuilderHeader />
        {aiErrors && aiErrors.some(error => error.isVisible) && (
          <AIErrorWarnings />
        )}
        {targeting.filterGroups.map((filterGroup, index) => (
          <div
            key={filterGroup.id}
            role="group"
            className={state.isAILoading ? 'loading' : ''}
            aria-label={`Filter group ${index + 1}`}>
            <TargetingFilterGroup
              targetingFilterGroup={filterGroup}
              disabled={state.isAILoading}
            />
          </div>
        ))}
        <AddFilterGroupButton
          disabled={state.isAILoading}
          onPress={handleAddFilterGroup}
        />
        {showAIAccuracyWarning && <AIAccuracyWarning />}
      </section>
    </>
  );
};

export default TargetingBuilder;
