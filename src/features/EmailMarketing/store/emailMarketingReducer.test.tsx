import {
  Operand,
  TargetingFilterSubject,
  TargetingFilterSubjectQualifier,
  TargetingFilterVerb,
  TargetingFilterVerbQualifier,
} from '../shared/emailMarketingTypes';
import {emailMarketingReducer} from './emailMarketingReducer';
import {
  initialEmailMarketingState as initialState,
  newDateFilter,
  newFilterGroup1,
  newTargeting,
} from './emailMarketingStatePresets';
import {
  EmailMarketingAction,
  EmailMarketingActionType,
} from './emailMarketingStoreTypes';

describe('emailMarketingReducer', () => {
  it('handles SetTargeting action', () => {
    expect(initialState.targeting).not.toEqual(newTargeting);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetTargeting,
      payload: newTargeting,
    };

    const state = emailMarketingReducer(initialState, action);
    expect(state.targeting).toEqual(action.payload);
  });

  it('handles AddFilterGroup action', () => {
    expect(initialState.targeting.filterGroups).not.toContainEqual(
      newFilterGroup1,
    );

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.AddFilterGroup,
      payload: newFilterGroup1,
    };

    const state = emailMarketingReducer(initialState, action);
    expect(state.targeting.filterGroups).toContainEqual(newFilterGroup1);
  });
});
