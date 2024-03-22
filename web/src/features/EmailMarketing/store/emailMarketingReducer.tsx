import {
  EmailMarketingState,
  EmailMarketingAction,
  EmailMarketingActionType,
} from './emailMarketingActionTypes';
import {Operand} from '../EmailCampaignBuilder/emailMarketingTypes';
import {getDefaultFilterForSubject} from '../EmailCampaignBuilder/emailMarketingDefaults';
import {
  updateFilterValue,
  updateFilterVerb,
} from '../EmailCampaignBuilder/segmentationUtils';

export const emailMarketingReducer = (
  state: EmailMarketingState,
  action: EmailMarketingAction,
): EmailMarketingState => {
  switch (action.type) {
    case EmailMarketingActionType.SetSegmentation:
      return {...state, segmentation: action.payload};
      break;
    case EmailMarketingActionType.AddFilterGroup:
      return {
        ...state,
        segmentation: {
          ...state.segmentation,
          filterGroups: [...state.segmentation.filterGroups, action.payload],
        },
      };
      break;
    case EmailMarketingActionType.DeleteFilterGroup:
      return {
        ...state,
        segmentation: {
          ...state.segmentation,
          filterGroups: state.segmentation.filterGroups.filter(
            group => group.id !== action.payload,
          ),
        },
      };
      break;
    case EmailMarketingActionType.SetFilterGroupOperand:
      return {
        ...state,
        segmentation: {
          ...state.segmentation,
          filterGroups: state.segmentation.filterGroups.map(group =>
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
        segmentation: {
          ...state.segmentation,
          filterGroups: state.segmentation.filterGroups.map(group =>
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
        segmentation: {
          ...state.segmentation,
          filterGroups: state.segmentation.filterGroups.map(group => ({
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
        segmentation: {
          ...state.segmentation,
          filterGroups: state.segmentation.filterGroups.map(filterGroup => ({
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
        segmentation: {
          ...state.segmentation,
          filterGroups: state.segmentation.filterGroups.map(filterGroup => ({
            ...filterGroup,
            filters: filterGroup.filters.map(filter =>
              filter.id === action.payload.filterId
                ? {
                    ...getDefaultFilterForSubject(action.payload.subject),
                    id: filter.id,
                    operand: filter.operand,
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
        segmentation: {
          ...state.segmentation,
          filterGroups: state.segmentation.filterGroups.map(filterGroup => ({
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
          segmentation: {
            ...state.segmentation,
            filterGroups: state.segmentation.filterGroups.map(filterGroup => ({
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
    case EmailMarketingActionType.SetFilterVerbQualifier:
      return {
        ...state,
        segmentation: {
          ...state.segmentation,
          filterGroups: state.segmentation.filterGroups.map(filterGroup => ({
            ...filterGroup,
            filters: filterGroup.filters.map(filter =>
              filter.id === action.payload.filterId
                ? {...filter, verbQualifier: action.payload.verbQualifier}
                : filter,
            ),
          })),
        },
      };
      break;
    case EmailMarketingActionType.SetFilterValue:
      {
        return {
          ...state,
          segmentation: {
            ...state.segmentation,
            filterGroups: state.segmentation.filterGroups.map(filterGroup => ({
              ...filterGroup,
              filters: filterGroup.filters.map(filter =>
                filter.id === action.payload.filterId
                  ? updateFilterValue(filter, action.payload.value)
                  : filter,
              ),
            })),
          },
        };
      }
      break;

    case EmailMarketingActionType.SelectAudience:
      return {
        ...state,
        selectedAudience: action.payload,
      };
    case EmailMarketingActionType.ToggleShowGenerateWithAIPanel:
      return {
        ...state,
        showGenerateWithAIPanel: !state.showGenerateWithAIPanel,
      };
      break;
    case EmailMarketingActionType.SetPrompt:
      return {
        ...state,
        prompt: action.payload,
      };
    case EmailMarketingActionType.SetIsAILoading:
      return {...state, isAILoading: action.payload};
      break;
    case EmailMarketingActionType.SetShowAIAccuracyWarning:
      return {
        ...state,
        showAIAccuracyWarning: action.payload,
      };
      break;
    case EmailMarketingActionType.SetVotedAIAccuracyUp:
      return {
        ...state,
        votedAIAccuracyUp: action.payload,
        votedAIAccuracyDown: action.payload ? false : state.votedAIAccuracyDown,
      };

    case EmailMarketingActionType.SetVotedAIAccuracyDown:
      return {
        ...state,
        votedAIAccuracyDown: action.payload,
        votedAIAccuracyUp: action.payload ? false : state.votedAIAccuracyUp,
      };

    case EmailMarketingActionType.SetAIErrors:
      return {
        ...state,
        aiErrors: action.payload,
      };
      break;
    case EmailMarketingActionType.SetErrorVisibility:
      return {
        ...state,
        aiErrors: state.aiErrors.map(error =>
          error.id === action.payload.id ? {...error, isVisible: false} : error,
        ),
      };
      break;
    case EmailMarketingActionType.SetLatestAIPrompt:
      return {
        ...state,
        latestAIPrompt: action.payload,
      };
      break;
    case EmailMarketingActionType.SetLatestAIResponse:
      return {
        ...state,
        latestAIResponse: action.payload,
      };
      break;
    case EmailMarketingActionType.SetProducts:
      return {
        ...state,
        products: action.payload,
      };
    case EmailMarketingActionType.SetChannel:
      return {
        ...state,
        channel: action.payload,
      };
    case EmailMarketingActionType.SetAllowComments:
      return {
        ...state,
        allowComments: action.payload,
      };
    default:
      return state;
      break;
  }
};
