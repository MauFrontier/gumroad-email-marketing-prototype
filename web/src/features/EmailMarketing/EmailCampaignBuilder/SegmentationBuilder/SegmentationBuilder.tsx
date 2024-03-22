import './SegmentationBuilder.scss';
import SegmentationFilterGroup from './components/SegmentationFilterGroup/SegmentationFilterGroup';
import {useEmailMarketingState} from '../../store/useEmailMarketingState';
import {defaultFilterGroup} from '../emailMarketingDefaults';
import {v4 as uuid} from 'uuid';
import {EmailMarketingActionType} from '../../store/emailMarketingActionTypes';
import SegmentationBuilderHeader from './components/SegmentationBuilderHeader/SegmentationBuilderHeader';
import AddFilterGroupButton from './components/AddFilterGroupButton/AddFilterGroupButton';
import AIAccuracyWarning from './components/SegmentationBuilderHeader/components/AIAccuracyWarning/AIAccuracyWarning';
import AIErrorWarnings from './components/SegmentationBuilderHeader/components/AIErrorWarnings/AIErrorWarnings';

const SegmentationBuilder = () => {
  const {state, dispatch} = useEmailMarketingState();
  const {segmentation} = state;

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
      <section role="region" aria-label="Segmentation builder">
        <SegmentationBuilderHeader />
        {aiErrors && aiErrors.some(error => error.isVisible) && (
          <AIErrorWarnings />
        )}
        {segmentation.filterGroups.map((filterGroup, index) => (
          <div
            key={filterGroup.id}
            role="group"
            className={state.isAILoading ? 'loading' : ''}
            aria-label={`Filter group ${index + 1}`}>
            <SegmentationFilterGroup
              segmentationFilterGroup={filterGroup}
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

export default SegmentationBuilder;
