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
  emailMarketingStateForTests as initialState,
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

  it('handles SetFilterOperand action', () => {
    const filterToBeUpdated = initialState.targeting.filterGroups[0].filters[1];
    const newOperand = Operand.Or;

    expect(filterToBeUpdated.operand).not.toEqual(newOperand);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetFilterOperand,
      payload: {
        filterId: filterToBeUpdated.id,
        operand: newOperand,
      },
    };

    const state = emailMarketingReducer(initialState, action);

    const updatedFilter = state.targeting.filterGroups[0].filters.find(
      filter => filter.id === filterToBeUpdated.id,
    );
    expect(updatedFilter?.operand).toEqual(newOperand);
  });

  it('handles SetFilterSubject action', () => {
    const filterToBeUpdated = initialState.targeting.filterGroups[0].filters[0];
    const newSubject = TargetingFilterSubject.Location;

    expect(filterToBeUpdated.subject).not.toEqual(newSubject);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetFilterSubject,
      payload: {
        filterId: filterToBeUpdated.id,
        subject: newSubject,
      },
    };

    const state = emailMarketingReducer(initialState, action);
    const updatedFilter = state.targeting.filterGroups[0].filters.find(
      filter => filter.id === filterToBeUpdated.id,
    );
    expect(updatedFilter?.subject).toEqual(newSubject);
  });

  it('keeps the operand when updating the subject', () => {
    const filterToBeUpdated = initialState.targeting.filterGroups[0].filters[0];
    const newSubject = TargetingFilterSubject.Location;

    expect(filterToBeUpdated.subject).not.toEqual(newSubject);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetFilterSubject,
      payload: {
        filterId: filterToBeUpdated.id,
        subject: newSubject,
      },
    };

    const state = emailMarketingReducer(initialState, action);
    const updatedFilter = state.targeting.filterGroups[0].filters.find(
      filter => filter.id === filterToBeUpdated.id,
    );
    expect(updatedFilter?.operand).toEqual(filterToBeUpdated.operand);
  });

  it('handles SetFilterSubjectQualifier action', () => {
    const filterToBeUpdated = initialState.targeting.filterGroups[0].filters[0];
    const newSubjectQualifier = TargetingFilterSubjectQualifier.Purchased;

    expect(filterToBeUpdated.subject).toEqual(TargetingFilterSubject.Date);

    if (filterToBeUpdated.subject === TargetingFilterSubject.Date) {
      expect(filterToBeUpdated.subjectQualifier).not.toEqual(
        newSubjectQualifier,
      );
    }

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetFilterSubjectQualifier,
      payload: {
        filterId: filterToBeUpdated.id,
        subjectQualifier: newSubjectQualifier,
      },
    };

    const state = emailMarketingReducer(initialState, action);
    const updatedFilter = state.targeting.filterGroups[0].filters.find(
      filter => filter.id === filterToBeUpdated.id,
    );
    if (updatedFilter?.subject === TargetingFilterSubject.Date) {
      expect(updatedFilter?.subjectQualifier).toEqual(newSubjectQualifier);
    }
  });

  it('handles SetFilterVerb action', () => {
    const filterToBeUpdated = initialState.targeting.filterGroups[0].filters[0];
    const newVerb = TargetingFilterVerb.IsInTheLast;

    expect(filterToBeUpdated.verb).not.toEqual(newVerb);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetFilterVerb,
      payload: {
        filterId: filterToBeUpdated.id,
        verb: newVerb,
      },
    };

    const state = emailMarketingReducer(initialState, action);
    const updatedFilter = state.targeting.filterGroups[0].filters.find(
      filter => filter.id === filterToBeUpdated.id,
    );
    expect(updatedFilter?.verb).toEqual(newVerb);
  });

  it('handles SetFilterVerbQualifier action', () => {
    const filterToBeUpdated = initialState.targeting.filterGroups[0].filters[1];
    const newVerbQualifier = TargetingFilterVerbQualifier.Any;

    expect(filterToBeUpdated.subject).toEqual(TargetingFilterSubject.Product);

    if (filterToBeUpdated.subject === TargetingFilterSubject.Product) {
      expect(filterToBeUpdated.verbQualifier).not.toEqual(newVerbQualifier);
    }
    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetFilterVerbQualifier,
      payload: {
        filterId: filterToBeUpdated.id,
        verbQualifier: newVerbQualifier,
      },
    };

    const state = emailMarketingReducer(initialState, action);

    const updatedFilter = state.targeting.filterGroups[0].filters.find(
      filter => filter.id === filterToBeUpdated.id,
    );

    if (updatedFilter?.subject === TargetingFilterSubject.Product) {
      expect(updatedFilter?.verbQualifier).toEqual(newVerbQualifier);
    }
  });

  it('handles SetFilterValue action', () => {
    const filterToBeUpdated = initialState.targeting.filterGroups[0].filters[0];
    const newValue = '2020-01-01';

    expect(filterToBeUpdated.value).not.toEqual(newValue);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetFilterValue,
      payload: {
        filterId: filterToBeUpdated.id,
        value: newValue,
      },
    };

    const state = emailMarketingReducer(initialState, action);
    const updatedFilter = state.targeting.filterGroups[0].filters.find(
      filter => filter.id === filterToBeUpdated.id,
    );
    expect(updatedFilter?.value).toEqual(newValue);
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

  it('handles ToggleGenerateWithAIPanel action', () => {
    const initialShowGenerateWithAIPanel = initialState.showGenerateWithAIPanel;

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.ToggleShowGenerateWithAIPanel,
    };

    const state = emailMarketingReducer(initialState, action);
    expect(state.showGenerateWithAIPanel).toBe(!initialShowGenerateWithAIPanel);
  });

  it('handles SetIsAILoading action', () => {
    const initialIsAILoading = initialState.isAILoading;
    expect(initialIsAILoading).toBe(false);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetIsAILoading,
      payload: true,
    };

    const state = emailMarketingReducer(initialState, action);
    expect(state.isAILoading).toBe(true);
  });

  it('handles SetShowAIAccuracyWarning action', () => {
    const initialShowAIAccuracyWarning = initialState.showAIAccuracyWarning;
    expect(initialShowAIAccuracyWarning).toBe(false);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetShowAIAccuracyWarning,
      payload: true,
    };

    const state = emailMarketingReducer(initialState, action);
    expect(state.showAIAccuracyWarning).toBe(true);
  });

  it('handles SetVotedAIAccuracyUp action', () => {
    const initialVotedAIAccuracyUp = initialState.votedAIAccuracyUp;
    expect(initialVotedAIAccuracyUp).toBe(false);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetVotedAIAccuracyUp,
      payload: true,
    };

    const state = emailMarketingReducer(initialState, action);
    expect(state.votedAIAccuracyUp).toBe(true);
  });

  it('handles SetVotedAIAccuracyDown action', () => {
    const initialVotedAIAccuracyDown = initialState.votedAIAccuracyDown;
    expect(initialVotedAIAccuracyDown).toBe(false);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetVotedAIAccuracyDown,
      payload: true,
    };

    const state = emailMarketingReducer(initialState, action);
    expect(state.votedAIAccuracyDown).toBe(true);
  });

  it('handles SetAIErrors action', () => {
    const initialAIErrors = initialState.aiErrors;
    expect(initialAIErrors).toEqual([]);

    const errors = [
      {id: '1', isVisible: true, error: 'error1'},
      {id: '2', isVisible: true, error: 'error2'},
    ];

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetAIErrors,
      payload: errors,
    };

    const state = emailMarketingReducer(initialState, action);
    expect(state.aiErrors).toEqual(errors);
  });

  it('handles SetAIErrorVisibility action', () => {
    const errors = [
      {id: '1', isVisible: true, error: 'error1'},
      {id: '2', isVisible: true, error: 'error2'},
    ];

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetErrorVisibility,
      payload: {
        id: '1',
        isVisible: false,
      },
    };

    const stateWithChangedErrorVisibility = emailMarketingReducer(
      {...initialState, aiErrors: errors},
      action,
    );

    expect(stateWithChangedErrorVisibility.aiErrors[0].isVisible).toBe(false);
    expect(stateWithChangedErrorVisibility.aiErrors[1].isVisible).toBe(true);
  });

  it('handles SetLatestAIPrompt action', () => {
    const initialLatestAIPrompt = initialState.latestAIPrompt;
    expect(initialLatestAIPrompt).toBe('');

    const prompt = 'Hello AI, what is your name?';

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetLatestAIPrompt,
      payload: prompt,
    };

    const state = emailMarketingReducer(initialState, action);
    expect(state.latestAIPrompt).toBe(prompt);
  });

  it('handles SetLatestAIResponse action', () => {
    const initialLatestAIResponse = initialState.latestAIResponse;
    expect(initialLatestAIResponse).toBe('');

    const response = 'As an AI model, I am responding';

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetLatestAIResponse,
      payload: response,
    };

    const state = emailMarketingReducer(initialState, action);
    expect(state.latestAIResponse).toBe(response);
  });

  it('handles SetShowDevTools action', () => {
    const initialShowDevTools = initialState.showDevTools;
    expect(initialShowDevTools).toBe(false);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetShowDevTools,
      payload: true,
    };

    const state = emailMarketingReducer(initialState, action);
    expect(state.showDevTools).toBe(true);
  });
});
