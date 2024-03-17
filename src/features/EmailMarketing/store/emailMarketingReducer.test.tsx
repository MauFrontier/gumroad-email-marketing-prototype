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

  it('handles DeleteFilterGroup action', () => {
    const filterGroupToBeDeleted = initialState.targeting.filterGroups[0];

    expect(initialState.targeting.filterGroups).toContainEqual(
      filterGroupToBeDeleted,
    );

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.DeleteFilterGroup,
      payload: filterGroupToBeDeleted.id,
    };

    const state = emailMarketingReducer(initialState, action);
    const updatedFilterGroups = state.targeting.filterGroups;
    expect(updatedFilterGroups).not.toContainEqual(filterGroupToBeDeleted);
  });

  it('handles SetFilterGroupOperand action', () => {
    const filterGroupToBeUpdated = initialState.targeting.filterGroups[0];
    const newOperand = Operand.Or;

    expect(filterGroupToBeUpdated.operand).not.toEqual(newOperand);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetFilterGroupOperand,
      payload: {
        filterGroupId: filterGroupToBeUpdated.id,
        operand: newOperand,
      },
    };

    const state = emailMarketingReducer(initialState, action);
    const updatedFilterGroup = state.targeting.filterGroups.find(
      filterGroup => filterGroup.id === filterGroupToBeUpdated.id,
    );
    expect(updatedFilterGroup?.operand).toEqual(newOperand);
  });

  it('handles AddFilter action', () => {
    expect(initialState.targeting.filterGroups[0].filters).not.toContainEqual(
      newDateFilterForTests,
    );

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.AddFilter,
      payload: {
        filterGroupId: initialState.targeting.filterGroups[0].id,
        filter: newDateFilterForTests,
      },
    };

    const state = emailMarketingReducer(initialState, action);
    const updatedFilters = state.targeting.filterGroups[0].filters;
    expect(updatedFilters).toContainEqual(newDateFilterForTests);
  });

  it('handles DeleteFilter action', () => {
    const filterToBeDeleted = initialState.targeting.filterGroups[0].filters[0];

    expect(initialState.targeting.filterGroups[0].filters).toContainEqual(
      filterToBeDeleted,
    );

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.DeleteFilter,
      payload: filterToBeDeleted.id,
    };

    const state = emailMarketingReducer(initialState, action);
    const updatedFilters = state.targeting.filterGroups[0].filters;
    expect(updatedFilters).not.toContainEqual(filterToBeDeleted);
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
