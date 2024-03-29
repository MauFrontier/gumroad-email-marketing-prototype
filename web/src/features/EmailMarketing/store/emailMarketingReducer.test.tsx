import {
  Operand,
  SegmentationFilterSubject,
  SegmentationFilterSubjectQualifier,
  SegmentationFilterVerb,
  SegmentationFilterVerbQualifier,
  AudienceType,
  Channels,
} from '../EmailCampaignBuilder/emailMarketingTypes';
import {emailMarketingReducer} from './emailMarketingReducer';
import {
  emailMarketingStateForTests as initialState,
  newDateFilterForTests,
  newFilterGroupForTests1,
  newSegmentationForTests,
} from './emailMarketingMockStateForTests';
import {
  EmailMarketingAction,
  EmailMarketingActionType,
} from './emailMarketingActionTypes';
import {KeyValuePair} from '../../shared/sharedTypes';

describe('emailMarketingReducer', () => {
  it('handles SetSegmentation action', () => {
    expect(initialState.segmentation).not.toEqual(newSegmentationForTests);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetSegmentation,
      payload: newSegmentationForTests,
    };

    const state = emailMarketingReducer(initialState, action);
    expect(state.segmentation).toEqual(action.payload);
  });

  it('handles AddFilterGroup action', () => {
    expect(initialState.segmentation.filterGroups).not.toContainEqual(
      newFilterGroupForTests1,
    );

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.AddFilterGroup,
      payload: newFilterGroupForTests1,
    };

    const state = emailMarketingReducer(initialState, action);
    expect(state.segmentation.filterGroups).toContainEqual(
      newFilterGroupForTests1,
    );
  });

  it('handles DeleteFilterGroup action', () => {
    const filterGroupToBeDeleted = initialState.segmentation.filterGroups[0];

    expect(initialState.segmentation.filterGroups).toContainEqual(
      filterGroupToBeDeleted,
    );

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.DeleteFilterGroup,
      payload: filterGroupToBeDeleted.id,
    };

    const state = emailMarketingReducer(initialState, action);
    const updatedFilterGroups = state.segmentation.filterGroups;
    expect(updatedFilterGroups).not.toContainEqual(filterGroupToBeDeleted);
  });

  it('handles SetFilterGroupOperand action', () => {
    const filterGroupToBeUpdated = initialState.segmentation.filterGroups[0];
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
    const updatedFilterGroup = state.segmentation.filterGroups.find(
      filterGroup => filterGroup.id === filterGroupToBeUpdated.id,
    );
    expect(updatedFilterGroup?.operand).toEqual(newOperand);
  });

  it('handles AddFilter action', () => {
    expect(
      initialState.segmentation.filterGroups[0].filters,
    ).not.toContainEqual(newDateFilterForTests);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.AddFilter,
      payload: {
        filterGroupId: initialState.segmentation.filterGroups[0].id,
        filter: newDateFilterForTests,
      },
    };

    const state = emailMarketingReducer(initialState, action);
    const updatedFilters = state.segmentation.filterGroups[0].filters;
    expect(updatedFilters).toContainEqual(newDateFilterForTests);
  });

  it('handles DeleteFilter action', () => {
    const filterToBeDeleted =
      initialState.segmentation.filterGroups[0].filters[0];

    expect(initialState.segmentation.filterGroups[0].filters).toContainEqual(
      filterToBeDeleted,
    );

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.DeleteFilter,
      payload: filterToBeDeleted.id,
    };

    const state = emailMarketingReducer(initialState, action);
    const updatedFilters = state.segmentation.filterGroups[0].filters;
    expect(updatedFilters).not.toContainEqual(filterToBeDeleted);
  });

  it('handles SetFilterOperand action', () => {
    const filterToBeUpdated =
      initialState.segmentation.filterGroups[0].filters[1];
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

    const updatedFilter = state.segmentation.filterGroups[0].filters.find(
      filter => filter.id === filterToBeUpdated.id,
    );
    expect(updatedFilter?.operand).toEqual(newOperand);
  });

  it('handles SetFilterSubject action', () => {
    const filterToBeUpdated =
      initialState.segmentation.filterGroups[0].filters[0];
    const newSubject = SegmentationFilterSubject.Location;

    expect(filterToBeUpdated.subject).not.toEqual(newSubject);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetFilterSubject,
      payload: {
        filterId: filterToBeUpdated.id,
        subject: newSubject,
      },
    };

    const state = emailMarketingReducer(initialState, action);
    const updatedFilter = state.segmentation.filterGroups[0].filters.find(
      filter => filter.id === filterToBeUpdated.id,
    );
    expect(updatedFilter?.subject).toEqual(newSubject);
  });

  it('keeps the operand when updating the subject', () => {
    const filterToBeUpdated =
      initialState.segmentation.filterGroups[0].filters[0];
    const newSubject = SegmentationFilterSubject.Location;

    expect(filterToBeUpdated.subject).not.toEqual(newSubject);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetFilterSubject,
      payload: {
        filterId: filterToBeUpdated.id,
        subject: newSubject,
      },
    };

    const state = emailMarketingReducer(initialState, action);
    const updatedFilter = state.segmentation.filterGroups[0].filters.find(
      filter => filter.id === filterToBeUpdated.id,
    );
    expect(updatedFilter?.operand).toEqual(filterToBeUpdated.operand);
  });

  it('handles SetFilterSubjectQualifier action', () => {
    const filterToBeUpdated =
      initialState.segmentation.filterGroups[0].filters[0];
    const newSubjectQualifier = SegmentationFilterSubjectQualifier.Purchased;

    expect(filterToBeUpdated.subject).toEqual(SegmentationFilterSubject.Date);

    if (filterToBeUpdated.subject === SegmentationFilterSubject.Date) {
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
    const updatedFilter = state.segmentation.filterGroups[0].filters.find(
      filter => filter.id === filterToBeUpdated.id,
    );
    if (updatedFilter?.subject === SegmentationFilterSubject.Date) {
      expect(updatedFilter?.subjectQualifier).toEqual(newSubjectQualifier);
    }
  });

  it('handles SetFilterVerb action', () => {
    const filterToBeUpdated =
      initialState.segmentation.filterGroups[0].filters[0];
    const newVerb = SegmentationFilterVerb.IsInTheLast;

    expect(filterToBeUpdated.verb).not.toEqual(newVerb);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetFilterVerb,
      payload: {
        filterId: filterToBeUpdated.id,
        verb: newVerb,
      },
    };

    const state = emailMarketingReducer(initialState, action);
    const updatedFilter = state.segmentation.filterGroups[0].filters.find(
      filter => filter.id === filterToBeUpdated.id,
    );
    expect(updatedFilter?.verb).toEqual(newVerb);
  });

  it('handles SetFilterVerbQualifier action', () => {
    const filterToBeUpdated =
      initialState.segmentation.filterGroups[0].filters[1];
    const newVerbQualifier = SegmentationFilterVerbQualifier.Any;

    expect(filterToBeUpdated.subject).toEqual(
      SegmentationFilterSubject.Product,
    );

    if (filterToBeUpdated.subject === SegmentationFilterSubject.Product) {
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

    const updatedFilter = state.segmentation.filterGroups[0].filters.find(
      filter => filter.id === filterToBeUpdated.id,
    );

    if (updatedFilter?.subject === SegmentationFilterSubject.Product) {
      expect(updatedFilter?.verbQualifier).toEqual(newVerbQualifier);
    }
  });

  it('handles SetFilterValue action', () => {
    const filterToBeUpdated =
      initialState.segmentation.filterGroups[0].filters[0];
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
    const updatedFilter = state.segmentation.filterGroups[0].filters.find(
      filter => filter.id === filterToBeUpdated.id,
    );
    expect(updatedFilter?.value).toEqual(newValue);
  });

  it('handles SelectAudience action', () => {
    const originalAudience = initialState.selectedAudience;
    const newAudience = AudienceType.Affiliates;
    expect(originalAudience).not.toEqual(newAudience);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SelectAudience,
      payload: newAudience,
    };

    const state = emailMarketingReducer(initialState, action);
    expect(state.selectedAudience).toEqual(newAudience);
  });

  it('handles SetProducts action', () => {
    const initialProducts = initialState.products;
    const newProducts: KeyValuePair[] = [
      {key: 'product1', value: 'Product 1'},
      {key: 'product2', value: 'Product 2'},
    ];

    expect(initialProducts).not.toEqual(newProducts);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetProducts,
      payload: newProducts,
    };

    const state = emailMarketingReducer(initialState, action);
    expect(state.products).toEqual(newProducts);
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

  it('handles SetChannel action', () => {
    const initialChannel = initialState.channel;
    expect(initialChannel).toBe(Channels.EmailAndProfile);

    const newChannel = Channels.Email;
    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetChannel,
      payload: newChannel,
    };
    const state = emailMarketingReducer(initialState, action);

    expect(state.channel).toBe(newChannel);
  });

  it('handles SetAllowComments action', () => {
    const initialAllowComments = initialState.allowComments;
    expect(initialAllowComments).toBe(true);

    const action: EmailMarketingAction = {
      type: EmailMarketingActionType.SetAllowComments,
      payload: false,
    };

    const state = emailMarketingReducer(initialState, action);
    expect(state.allowComments).toBe(false);
  });
});
