import {
  EmailMarketingState,
  EmailMarketingAction,
  EmailMarketingActionType,
} from './emailMarketingStoreTypes';
import {Operand} from '../shared/emailMarketingTypes';
import {getDefaultFilterForSubject} from '../shared/emailMarketingDefaults';
import {updateFilterValue, updateFilterVerb} from '../shared/targetingUtils';

export const emailMarketingReducer = (
  state: EmailMarketingState,
  action: EmailMarketingAction,
): EmailMarketingState => {
  switch (action.type) {
    case EmailMarketingActionType.SetTargeting:
      return {...state, targeting: action.payload};
      break;
    case EmailMarketingActionType.AddFilterGroup:
      return {
        ...state,
        targeting: {
          ...state.targeting,
          filterGroups: [...state.targeting.filterGroups, action.payload],
        },
      };
      break;
    case EmailMarketingActionType.DeleteFilterGroup:
      return {
        ...state,
        targeting: {
          ...state.targeting,
          filterGroups: state.targeting.filterGroups.filter(
            group => group.id !== action.payload,
          ),
        },
      };
      break;
    case EmailMarketingActionType.SetFilterGroupOperand:
      return {
        ...state,
        targeting: {
          ...state.targeting,
          filterGroups: state.targeting.filterGroups.map(group =>
            group.id === action.payload.filterGroupId
              ? {...group, operand: action.payload.operand}
              : group,
          ),
        },
      };
      break;
    case EmailMarketingActionType.AddFilter:
      return {
        ...state,
        targeting: {
          ...state.targeting,
          filterGroups: state.targeting.filterGroups.map(group =>
            group.id === action.payload.filterGroupId
              ? {...group, filters: [...group.filters, action.payload.filter]}
              : group,
          ),
        },
      };
      break;
    case EmailMarketingActionType.SelectTrigger:
      return {
        ...state,
        selectedTrigger: action.payload,
      };
    case EmailMarketingActionType.ToggleShowGenerateWithAIPanel:
      return {
        ...state,
        showGenerateWithAIPanel: !state.showGenerateWithAIPanel,
      };
      break;
    default:
      return state;
      break;
  }
};
