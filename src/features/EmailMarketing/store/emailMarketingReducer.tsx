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
    case EmailMarketingActionType.DeleteFilter:
      return {
        ...state,
        targeting: {
          ...state.targeting,
          filterGroups: state.targeting.filterGroups.map(group => ({
            ...group,
            filters: group.filters.filter((filter, index) => {
              const isTargetFilter = filter.id === action.payload;
              if (isTargetFilter && group.filters.length >= 2 && index === 0) {
                group.filters[index + 1] = {
                  ...group.filters[index + 1],
                  operand: Operand.Initial,
                };
              }

              return !isTargetFilter;
            }),
          })),
        },
      };
      break;
    case EmailMarketingActionType.SetFilterOperand:
      return {
        ...state,
        targeting: {
          ...state.targeting,
          filterGroups: state.targeting.filterGroups.map(filterGroup => ({
            ...filterGroup,
            filters: filterGroup.filters.map(filter =>
              filter.id === action.payload.filterId
                ? {...filter, operand: action.payload.operand}
                : filter,
            ),
          })),
        },
      };
      break;
    case EmailMarketingActionType.SetFilterSubject:
      return {
        ...state,
        targeting: {
          ...state.targeting,
          filterGroups: state.targeting.filterGroups.map(filterGroup => ({
            ...filterGroup,
            filters: filterGroup.filters.map(filter =>
              filter.id === action.payload.filterId
                ? {
                    ...getDefaultFilterForSubject(action.payload.subject),
                    id: filter.id,
                  }
                : filter,
            ),
          })),
        },
      };
      break;

    case EmailMarketingActionType.SetFilterSubjectQualifier:
      return {
        ...state,
        targeting: {
          ...state.targeting,
          filterGroups: state.targeting.filterGroups.map(filterGroup => ({
            ...filterGroup,
            filters: filterGroup.filters.map(filter =>
              filter.id === action.payload.filterId
                ? {
                    ...filter,
                    subjectQualifier: action.payload.subjectQualifier,
                  }
                : filter,
            ),
          })),
        },
      };
      break;
    case EmailMarketingActionType.SetFilterVerb:
      {
        return {
          ...state,
          targeting: {
            ...state.targeting,
            filterGroups: state.targeting.filterGroups.map(filterGroup => ({
              ...filterGroup,
              filters: filterGroup.filters.map(filter =>
                filter.id === action.payload.filterId
                  ? updateFilterVerb(filter, action.payload.verb)
                  : filter,
              ),
            })),
          },
        };
      }
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
