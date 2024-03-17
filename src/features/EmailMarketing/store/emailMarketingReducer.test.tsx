import {
  Operand,
  TargetingFilterSubject,
  TargetingFilterSubjectQualifier,
  TargetingFilterVerb,
  TargetingFilterVerbQualifier,
  TriggerType,
} from '../shared/emailMarketingTypes';
import {emailMarketingReducer} from './emailMarketingReducer';
import {
  modifiedEmailMarketingStateForTests as initialState,
  newDateFilterForTests,
  newFilterGroupForTests1,
  newTargetingForTests,
} from './emailMarketingMockStateForTests';
import {
  EmailMarketingAction,
  EmailMarketingActionType,
} from './emailMarketingStoreTypes';

describe('emailMarketingReducer', () => {
  it('handles SetTargeting action', () => {
    expect(initialState.targeting).not.toEqual(newTargetingForTests);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetTargeting,
      payload: newTargetingForTests,
    };

    const state = emailMarketingReducer(initialState, action);
    expect(state.targeting).toEqual(action.payload);
  });

  it('handles AddFilterGroup action', () => {
    expect(initialState.targeting.filterGroups).not.toContainEqual(
      newFilterGroupForTests1,
    );

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.AddFilterGroup,
      payload: newFilterGroupForTests1,
    };

    const state = emailMarketingReducer(initialState, action);
    expect(state.targeting.filterGroups).toContainEqual(
      newFilterGroupForTests1,
    );
  });

  it('handles SelectTrigger action', () => {
    const originalTrigger = initialState.selectedTrigger;
    const newTrigger = TriggerType.NewAffiliate;
    expect(originalTrigger).not.toEqual(newTrigger);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SelectTrigger,
      payload: newTrigger,
    };

    const state = emailMarketingReducer(initialState, action);
    expect(state.selectedTrigger).toEqual(newTrigger);
  });
});
