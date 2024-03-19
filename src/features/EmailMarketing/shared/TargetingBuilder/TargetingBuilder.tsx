import './TargetingBuilder.scss';
import TargetingFilterGroup from './components/TargetingFilterGroup/TargetingFilterGroup';
import {useEmailMarketingState} from '../../store/useEmailMarketingState';
import {defaultFilterGroup} from '../emailMarketingDefaults';
import {v4 as uuid} from 'uuid';
import {EmailMarketingActionType} from '../../store/emailMarketingStoreTypes';
import TargetingBuilderHeader from '../TargetingBuilderHeader/TargetingBuilderHeader';
import AddFilterGroupButton from './components/AddFilterGroupButton/AddFilterGroupButton';

const TargetingBuilder = () => {
  const {state, dispatch} = useEmailMarketingState();
  const {targeting} = state;

  const handleAddFilterGroup = () => {
    const newFilterGroup = {...defaultFilterGroup};

    newFilterGroup.id = uuid();

    dispatch({
      type: EmailMarketingActionType.AddFilterGroup,
      payload: newFilterGroup,
    });
  };

  return (
    <>
      <section role="region" aria-label="Targeting builder">
        <TargetingBuilderHeader />
        {targeting.filterGroups.map((filterGroup, index) => (
          <div
            key={filterGroup.id}
            role="group"
            className={state.isAILoading ? 'loading' : ''}
            aria-label={`Filter Group ${index + 1}`}>
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
      </section>
    </>
  );
};

export default TargetingBuilder;
